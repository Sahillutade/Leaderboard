const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB

connectDB();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    totalpoints: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema, 'user');

const userHistory = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true,
    },
    points: {
        type: Number,
        require: true,
    },
    claimedAt: {
        type: Date,
        default: Date.now,
    },
});

const History = mongoose.model('History', userHistory, 'claimHistory');

// Create API endpoints

app.get('/user-list', async (req, res) => {
    try{
        const list = await User.find();
        res.json(list);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({ error: 'Error creating user' });
    }
});

app.get('/leaderboard', async (req, res) => {
    try{
        const users = await User.find().sort({totalpoints: -1});
        const rankedUsers = users.map((user, index) => ({
            ...user.toObject(),
            rank: index+1
        }));
        res.json(rankedUsers);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});

app.post('/claim/:userid', async  (req, res) => {
    const userId = req.params.userid;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ error: 'User not found' });
        }

        user.totalpoints += randomPoints;
        await user.save();

        const history = new History({
            userId: user._id,
            points: randomPoints
        });
        await history.save();

        res.json({ message: 'Points Claimed', points: randomPoints, user });
    }
    catch(err) {
        res.status(500).json({ error: 'Error claiming points' });
    }
});

app.get('/history/:id', async (req, res) => {
    const userId = req.params.id;

    try{
        const history = await History.find({userId}).sort({ claimedAt: -1 }).populate('userId', 'name');
        res.json(history);
    }
    catch (err) {
        res.status(500).json({ error: 'Error fetching history' });
    }
});

app.listen(PORT);
console.log(`Server Started http://127.0.0.1:${PORT}`);