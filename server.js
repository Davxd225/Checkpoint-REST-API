
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const dns = require('node:dns');
const User = require('./models/User');
dotenv.config();

dns.setServers(['8.8.8.8']);

const app = express();

app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur API !');
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        res.status(200).json({
            message: 'Utilisateur supprimé avec succès',
            user: deletedUser
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Démarrage du serveur
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connecté avec succès !');

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
        });

    } catch (error) {
        console.error('Erreur de connexion MongoDB :', error.message);
    }
}

startServer();
