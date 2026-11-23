 import { User } from "../models/users.model.js";

 const getUsers = async (req, res) => { 
    try {
        const { username, password, email } = req.body;
           //basic validation

           if (!username || !password || !email )  {
            return res.status(400).json({ message: "Please provide all required fields"});
           }

           //check if user already exists

           const existingUser = await User.findOne( { email: email.toLowerCase()});

           if (existingUser) {
            return res.status(400).json({ message: "User already exists"})
           }

           // Create new user 

           const newUser = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false,
           });

           res.status(201).json({
            message: "User created successfully",
            user: { user_id: newUser._id, email: newUser.email, username: newUser.username  }
           });
     } catch (error) { 
      res.status(500).json({message: "Internal Server error", error: error.message});

     }
   };

   export {
      getUsers
   }; 