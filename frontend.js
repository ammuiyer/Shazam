const express = require("express");
const router = express.Router();
router.get("/get_query",(req, res) =>{
    const query = req.query.query;
    console.log("Received query:", query)
    res.send({ message: "Query acquired successfully." });

})
module.exports = router