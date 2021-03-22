const Post = require('../models/Post');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

module.exports = {
    getMural: async (req, res) => {
        try {
            let docs = await Post.find();
            const userId = req.user.id;
            const userName = await User.findById(userId)
                    .then(doc => {
                        return doc.name
                    })
                    .catch(err => {
                        res.send('User not found');
                    })
            res.json({ docs, userName });
        } catch(err) {
            res.json({ 
                error: true,
                message: err
            })
        }  
    },

    newPost: (req, res) => {
        let title = req.body.title;
        let description = req.body.description;

        let post = new Post();
        post.title = title;
        post.description = description;
        try {
            post.save()
            res.json({
                message: 'true',
                _id: post._id,
                title: post.title,
                description: post.description
            }) 
        } catch (err) {
            res.send(err)
        }        
    },

    deletePost: (req, res) => {
        const id = req.params.id;
        Post.findByIdAndDelete(id)
            .then(doc => res.json(doc))
            .catch(err => {
                console.log(err)
                res.json(err)
            })  
    },

    getPost: async (req, res) => {
        const id = req.params.id;
        
        Post.findById(id)
                .then(doc => {
                    res.render('edit', { post: doc })
                })
                .catch(err => res.send(err));
    },

    editPost: async (req, res) => {
        const id = req.params.id;
        let post = {};
        post.title = req.body.title;
        post.description = req.body.description;
        try {
            await Post.findByIdAndUpdate(id, post)
            res.redirect("/")
        } catch (err) {
            console.log(err)
        }   
    }
}