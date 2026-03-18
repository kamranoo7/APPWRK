const express = require("express");
const router = express.Router();

let {getTransactions}=require("../controllers/Transactioncontroller");
let {addTransaction}=require("../controllers/Transactioncontroller");
router.get("/", getTransactions);
router.post("/", addTransaction);

module.exports = router;