import mongoose, { Schema } from "mongoose";

const userSchema = new Schema (
    {
         username: { 
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 2,
            maxLength: 20,
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 40,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [ "Please use a valid email address"],
        }
    },

    {
      timestamps: true,  
    }


)

export const User = mongoose.model("User", userSchema);