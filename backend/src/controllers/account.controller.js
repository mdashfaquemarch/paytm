import { Account } from '../models/account.model.js'
import mongoose from 'mongoose';


const checkBalance = async (req, res) => {
    try {
       
        const account = await Account.findOne({
            user: req.user._id
        })

        if(!account) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            blance: account.balance,
            message: "balance fetched successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


const transferBalace = async (req, res) => {
    const session = await mongoose.startSession();
    try {

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ user: req.user._id }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ user: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ user: req.user._id }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ user: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.status(200).json({
        success: true,
        message: "Transfer successful"
    });
        
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export {
    checkBalance,
    transferBalace
}