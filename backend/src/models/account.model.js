import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
    }
},{timestamps: true});


const Account = mongoose.model("Account", accountSchema);

export {Account}