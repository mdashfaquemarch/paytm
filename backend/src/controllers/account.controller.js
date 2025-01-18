import { Account } from "../models/account.model.js";
import mongoose from "mongoose";

const checkBalance = async (req, res) => {
  try {
    const account = await Account.findOne({ user: req.user._id });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      balance: account.balance, // Fixed typo: blance -> balance
      message: "Balance fetched successfully",
    });
  } catch (error) {
    console.error("Check balance error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const transferBalance = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { amount, to } = req.body;

    // Validate request body
    if (!amount || amount <= 0 || !to) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid amount or recipient",
      });
    }

    // Prevent transferring to the same account
    if (req.user._id.toString() === to) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Cannot transfer to the same account",
      });
    }

    // Fetch the sender's account
    const fromAccount = await Account.findOne({ user: req.user._id }).session(
      session
    );
    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    // Fetch the recipient's account
    const toAccount = await Account.findOne({ user: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Recipient account not found",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { user: req.user._id },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { user: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer balance error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

export { checkBalance, transferBalance }; // Fixed typo: transferBalace -> transferBalance
