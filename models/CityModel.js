import { ModelConfig } from "./ModelConfig";

let mongoose = require('mongoose');

// City Schema
let userSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

let CategoryModel = module.exports = mongoose.model(ModelConfig.City, userSchema, 'cities');
