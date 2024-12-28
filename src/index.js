const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
// const kafka = require('./kafkaConfig');

const app = express();
// const producer = kafka.producer();

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Routes for login and signup
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found");
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        } else {
            res.render("home"); // Render home.ejs after successful login
        }
    } catch {
        res.send("wrong Details");
    }
});

// Define the API routes for services
app.post("/en2ar", (req, res) => {
    // Add logic to handle English to Arabic translation
    res.json({ translation: "Translated text (EN to AR)" });
});

app.post("/ar2en", (req, res) => {
    // Add logic to handle Arabic to English translation
    res.json({ translation: "Translated text (AR to EN)" });
});

app.post("/text-summarizer", (req, res) => {
    // Add logic to handle text summarization
    res.json({ summary: "Summarized text" });
});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});



// const startProducer = async () => {
//     try {
//         await producer.connect();
//         console.log('Kafka Producer connected');
//     } catch (err) {
//         console.error('Error connecting Kafka Producer:', err);
//     }
// };

// // Start the producer when the application starts
// startProducer();