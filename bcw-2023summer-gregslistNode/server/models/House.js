import { Schema } from "mongoose";

export const HouseSchema = new Schema({
    bedrooms: { type: Number, required: true, min: 1, max: 100 },
    bathrooms: { type: Number, required: true, min: 1, max: 100 },
    levels: { type: Number, required: true, min: 1, max: 25 },
    imgUrl: { type: String, max: 300, default: "https://placehold.co/400" },
    year: { type: Number, min: 1600, max: 2050, required: true },
    price: { type: Number, min: 1000, max: 1000000000, required: true },
    description: { type: String, maxLength: 500 },
    creatorId: { type: Schema.Types.ObjectId, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })