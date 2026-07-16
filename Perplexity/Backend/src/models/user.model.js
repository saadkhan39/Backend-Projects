import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		username: { 
             type: String,
             required: true,
             unique: true,
            trim: true },
		email: { 
            type: String,
             required: true, 
             unique: true, 
             lowercase: true, 
             trim: true },
		password: { 
            type: String, 
            required: true,
            select:false
       },
		verified: { 
            type: Boolean,
             default: false 
            },
	},
	{
		timestamps: true,
	}
);

const userModel = model("User", userSchema);

export default userModel;
