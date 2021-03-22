const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config();

module.exports = {
    register: async (req, res) => {
        const { name, email, phone, country, password1, password2 } = req.body;

        if (password1 !== password2)
            return res.json({ message: "Passwords don't match" });

        if (!email.includes("@"))
            return res.json({ message: "Invalid email" });
        
        const doc = await User.findOne({ email })
        if (doc)
            return res.json({ message: "Email already exists" });

        try {
            let salt = bcrypt.genSaltSync(15);
            let newPass = bcrypt.hashSync(password1, salt);
            let user = new User({ name, email, phone, country, password: newPass });
            user.save()
                .then(doc => res.json({ message: "ok" }))
                .catch(err => res.send(err));          
        } catch (err) {
            res.send(err);
        }    
    }, 

    login: async (req, res) => {
        const { email, password } = req.body;  
        let doc = await User.findOne({ email });
        if (doc) {  
            if (bcrypt.compareSync(password, doc.password)) {
                const token = jwt.sign({ id: doc._id }, process.env.TOKEN_SECRET);
                res.json({
                    error: false,
                    token: token
                })
            } else {
                res.json({ 
                    error: true,
                    message: "Wrong password",
                    token: null
                });
            }
        } else {
            res.json({ 
                error: true,
                message: "Wrong email",
                token: null
            })   
        }
    }
}