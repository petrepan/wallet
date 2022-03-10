const express = require("express");
const transactionController = require("../controllers/transactionController");
const protect = require("../middleware/protect");

const router = express.Router();

// POST /api/v1/transaction/deposit - Deposit Route
router.post("/deposit", protect, transactionController.deposit);

// POST /api/v1/transaction/transfer - Transfer Route
router.post("/transfer", protect, transactionController.transfer);

// GET /api/v1/transaction/all - Get user transactions
router.get("/all", protect, transactionController.getUserTransactions);

module.exports = router;