import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// Offer Schema
let userSchema = mongoose.Schema({
    advertiseID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelConfig.Advertise
    },
    offererID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelConfig.User
    },
    status: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    }

});

let OfferModel = module.exports = mongoose.model(ModelConfig.Offer, userSchema, 'offer');
