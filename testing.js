const express = require('express');
const router = express.Router();


router.get("/test_model", async (req, res) => {
    const dictionary = JSON.parse(req.query.query);//get expected_output key and user_input
    //Example: {"expected_output":"gdehbwsxjk","user_input":"fbhcjdnks"}


    console.log("Received expected output:", dictionary.expected_output);
    console.log("Received user input", dictionary.user_input)



    res.send({ message: "Queries processed successfully." });
});


module.exports = router
