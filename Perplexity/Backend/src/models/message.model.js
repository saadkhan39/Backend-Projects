import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const messageSchema = new Schema(
	{
		chat: { 
            type: Types.ObjectId,
             ref: "Chat", 
             required: true 
            },
		content: { 
            type: String, 
            required: true
         },
		role: { 
            type: String,
             enum: ["user", "ai"],
              default: "user" 
            },
	},
	{
		timestamps: true,
	}
);

const messageModel = model("Message", messageSchema);

export default messageModel;
