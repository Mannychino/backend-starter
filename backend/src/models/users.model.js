import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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
            match: [  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                 "Please use a valid email address"],
        }
    },

    {
      timestamps: true,  
    }


)

// before you save any password, hash it
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
});


//compare the password entered by the user with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);