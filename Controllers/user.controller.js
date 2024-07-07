// user.controller.js

const prisma = require('../DB/db.config'); 

const createUser = async (req, res) => {
    const { name, email } = req.body; 
    try {

        const checkuser=await prisma.user.findUnique({
            where:{
                email:email
            }
        });

        if(checkuser){
            return res.json("user is already registered");
        }
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
            },
        });

        res.status(201).json(newUser); 
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

module.exports = { createUser };
