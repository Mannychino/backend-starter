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

           //check with username as well
           const existingUsername = await User.findOne({username});

           if (existingUsername) {
            return res.status(400).json({ message: "Username already exists"})
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

   const loginUser = async (req, res) => {
      try {
         //check if user already exists
         const { email, password } = req.body;

         const user = await User.findOne({ email: email.toLowerCase() });

         if(!user) return res.status(400).json({ message: "User not found"});


         //compare password
         const isMatch = await user.comparePassword(password);
          if(!isMatch) return res.status(400).json({ message: "Invalid credentials"}); 

          res.status(200).json({ 
            message: "Login successful",
             user: { id: user._id,
                 email: user.email,
                 username: user.username } 
               })

         } catch (error) {
            res.status(500).json({ message: "Internal Server error", error: error.message })
          };



      }; 





   /**export {
      getUsers
   }; */

   export const getUser = getUsers;  // Export the getUsers function as getUser