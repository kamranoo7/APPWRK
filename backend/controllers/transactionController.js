const Transaction = require("../model/Transaction");

/* GET TRANSACTIONS */
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });

    const latest = await Transaction.findOne().sort({ date: -1 });
    const balance = latest ? latest.runningBalance : 0;

    res.json({ transactions, balance });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/* ADD TRANSACTION */
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    if (!type || !["credit", "debit"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!description) {
      return res.status(400).json({ error: "Description required" });
    }

    const lastTransaction = await Transaction.findOne().sort({ date: -1 });
    let currentBalance = lastTransaction
      ? lastTransaction.runningBalance
      : 0;

    let newBalance = currentBalance;

    if (type === "credit") {
      newBalance += amount;
    } else {
      if (amount > currentBalance) {
        return res.status(400).json({ error: "Insufficient balance" });
      }
      newBalance -= amount;
    }

    const transaction = new Transaction({
      type,
      amount,
      description,
      runningBalance: newBalance,
    });

    await transaction.save();

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};