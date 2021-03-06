import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// Advertise Schema
let userSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    declaration: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelConfig.User
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelConfig.City
    },
    status: {
        type: Number,
        default: 0
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: ModelConfig.Category

    },
    budget: {
        type: Number,
        required: true
    },
    avaliableSpaces: {
        type: Number,
        required: true
    }
    
});

let AdvertiseModel = module.exports = mongoose.model(ModelConfig.Advertise, userSchema, 'advertise');
