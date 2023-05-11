import User from '../models/users.js'
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required"})
        }
        if (!email) {
            return res.json({ error: "Email is taken"})
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least  6 characters"})
        }
        // Check if email is taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: "Email is taken"})
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Register User
        const user = await new User({ name, email, password: hashedPassword }).save();
        // Create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d'} );
        // Send response
        res.json({ 
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token
        });
    } catch(err) {
        console.log(err)
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ error: "Email is taken"})
        }
        if (!password || password.length < 6) {
            return res.json({ error: "Password must be at least  6 characters"})
        }
        // Check if email is taken
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "User not found"})
        }

        // Compare password
        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.json({ error: 'Wrong Password'})
        }

        // Create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d'} );
        // Send response
        res.json({ 
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token
        });
    } catch(err) {
        console.log(err)
    }
};