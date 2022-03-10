const Wallet = require("../models/walletModel");
const paystack = require("../helpers/paystack");
const Transaction = require("../models/transactionModel");


exports.deposit = async (req, res) => {
    try {
    const wallet = await Wallet.findOne({ user: req.user.id });

    if (!wallet) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid Transaction",
        });
    } 

    const initialize = await paystack.initializePayment(req.body)

    const reference = initialize.data.reference

    const verify = await paystack.verifyPayment(reference)

    //add the money to their wallet
    wallet.balance = verify.data.data.amount

    const createTransaction = {
        type: "deposit",
        user: req.user.id,
        destination: wallet.user,
        amount: verify.data.data.amount,
        reference: verify.data.data.reference
    }
    //create a new transaction
    const transaction = new Transaction(createTransaction)

    await wallet.save()
    await transaction.save()
        
    res.status(201).json({
        status: "success",
        data: { id: transaction._id, ...createTransaction },
    });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        err,
      });
    } 
};

exports.transfer = async (req, res) => {
    try {
    const { userId, amount } = req.body;

    const wallet = await Wallet.findOne({ user: req.user.id });

    const destinationWallet = await Wallet.findOne({ user: userId });

    if (!wallet) {
        return res.status(400).json({
            status: "failed",
            message: "Invalid Transaction",
        });
    } 

    if(Number(amount) > Number(wallet.balance)) {
        return res.status(400).json({
            status: "failed",
            message: "You don't have enough in your wallet",
        });
    }

    wallet.balance = wallet.balance - amount

    destinationWallet.balance = destinationWallet.balance + amount

    const createTransaction = {
        type: "transfer",
        user: req.user.id,
        destination: destinationWallet.user,
        amount: amount,
        reference: req.user.id + new Date().getMilliseconds()
    }
    // create a new transaction
    const transaction = new Transaction(createTransaction)

    await wallet.save()
    await destinationWallet.save()
    await transaction.save()
        
    res.status(201).json({
        status: "success",
        data: { id: transaction._id, ...createTransaction, newBalance: wallet.balance },
    });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        err,
      });
    } 
};

exports.getUserTransactions = async (req, res) => {
    try {
      const transaction = await Transaction.find({user: req.user.id});
  
      res.status(200).json({
        status: "success",
        data: transaction,
      });
    } catch (err) {
        res.status(500).json({
            status: "failed",
            err,
        });
    }
};
