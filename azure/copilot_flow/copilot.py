import os
from dotenv import load_dotenv
import json
load_dotenv()
import sys
from promptflow.core import Prompty, AzureOpenAIModelConfiguration
from promptflow.tracing import trace
from openai import AzureOpenAI
from azure.core.credentials import AzureKeyCredential

# <get_documents>
@trace
def get_documents(search_query: str, num_docs=3):
    from azure.identity import DefaultAzureCredential, get_bearer_token_provider
    from azure.search.documents import SearchClient
    from azure.search.documents.models import VectorizedQuery

    token_provider = get_bearer_token_provider(
        DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default"
    )

    index_name = os.getenv("AZUREAI_SEARCH_INDEX_NAME")
    AZURE_COGNITIVE_SEARCH_CREDENTIAL = AzureKeyCredential(os.getenv("AZURE_AI_SEARCH_API_KEY"))
    #  retrieve documents relevant to the user's question from Cognitive Search
    search_client = SearchClient(
        endpoint=os.getenv("AZURE_SEARCH_ENDPOINT"),
        credential=AZURE_COGNITIVE_SEARCH_CREDENTIAL,
        index_name=index_name,
    )

    aoai_client = AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        azure_ad_token_provider=token_provider,
        api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
    )

    # generate a vector embedding of the user's question
    embedding = aoai_client.embeddings.create(
        input=search_query, model=os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT")
    )
    embedding_to_query = embedding.data[0].embedding

    context = ""
    # use the vector embedding to do a vector search on the index
    vector_query = VectorizedQuery(
        vector=embedding_to_query, k_nearest_neighbors=num_docs, fields="text_vector"
    )
    results = trace(search_client.search)(
        search_text="", vector_queries=[vector_query], select=["site", "chunk"]
    )
    for result in results:
        context += f"\n>>> From: {result['site']}\n{result['chunk']}"
    return context


# <get_documents>

from promptflow.core import Prompty, AzureOpenAIModelConfiguration

from pathlib import Path
from typing import TypedDict


class ChatResponse(TypedDict):
    context: dict
    reply: str


def get_chat_response(chat_input: str, chat_history: list = []) -> ChatResponse:
    model_config = AzureOpenAIModelConfiguration(
        azure_deployment=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    )
    link = ""
    searchQuery = chat_input

    # Only extract intent if there is chat_history
    if len(chat_history) > 0:
        # extract current query intent given chat_history
        path_to_prompty = f"{Path(__file__).parent.absolute().as_posix()}/queryIntent.prompty"  # pass absolute file path to prompty
        intentPrompty = Prompty.load(
            path_to_prompty,
            model={
                "configuration": model_config,
                "parameters": {
                    "max_tokens": 256,
                },
            },
        )
        searchQuery = intentPrompty(query=chat_input, chat_history=chat_history)

    # retrieve relevant documents and context given chat_history and current user query (chat_input)
    documents = get_documents(searchQuery, 3)

    # send query + document context to chat completion for a response
    path_to_prompty = f"{Path(__file__).parent.absolute().as_posix()}/chat.prompty"
    chatPrompty = Prompty.load(
        path_to_prompty,
        model={
            "configuration": model_config,
            "parameters": {"max_tokens": 256, "temperature": 0.2},
        },
    )
    result = chatPrompty(
        chat_history=chat_history, chat_input=chat_input, documents=documents
    )

    return dict(reply=result, context=documents)



if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Error: Not enough arguments.", flush=True)
        sys.exit(1)

    input_string = sys.argv[1]
    chat_history = sys.argv[2]

    # Get the response and print it to stdout
    response = get_chat_response(input_string, chat_history)
    print(json.dumps(response), flush=True)

