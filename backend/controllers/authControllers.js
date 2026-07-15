const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async(req, res) => {

    try {

        const{enail, password} = req.body;

        const Search = await User.findOne({enail});

        if (!Search) {
            return res.status(404).json({"message" : "user not found"})
        }

        const validPassword = bcrypt.compare(password, Search.password)

        if(!validPassword) {
            return res.status(400).json({"message" : "erreur mot de passe, veuillez réessayer"})
        }

        res.status(200).json({"message" : "connexion reussie"})
        
    } catch({error}) {
        res.status(500).json({"message" : "error"})
    }

}

const registerUser = async(req, res) => {
    try {

        const {name, email, password, role} = req.body;

        const verifyEmailExist = User.findOne({email})

        if(verifyEmailExist) {
            return res.status(401)
        } 

        const algocrypt = bcrypt.hash(password, 20);

        const nouvelUtilisateur = User.create({

            name,
            email,
            password: algocrypt,
            role
        })

        res.status(200).json({"message" : "utilisateur enregistre avec succes", "user" : {name, email, role}});

    } catch(error) {
        res.status(500).json({"message" : "error"})
    }
}

export {loginUser, registerUser} 