const express = require('express');
const router = express.Router();


router.get("/test_model", async (req, res) => {
    const queries = req.body.queries; // Expecting { "queries": [...] }

    if (!Array.isArray(queries)) {
        console.log(queries)
        return res.status(400).send({ error: "Expected 'queries' to be an array." });
    }

    console.log("Received queries:", queries);

    queries.forEach(query => {
        console.log("Processing query:", query);
    });

    res.send({ message: "Queries processed successfully." });
});


module.exports = router