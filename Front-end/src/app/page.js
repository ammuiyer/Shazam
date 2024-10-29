import PromptInput from "./components/PromptInput";

export default function Home() {
  return (
    <div className="relative h-screen">

      <div className="absolute bottom-0 w-full">
        <PromptInput />
      </div>
    </div>
  );
}