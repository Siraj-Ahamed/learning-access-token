const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

app.use(express.json());
dotenv.config();

const posts = [
    {
        name: "Siraj",
        title: "Software Developer",
    },
    {
        name: "Ahamed",
        title: "Millionaire",
    },
];

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //Bearer token
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        console.log("token", token);
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

app.get("/posts", (req, res) => {
    res.json(posts);
});

// app.get("/posts", authenticateToken, (req, res) => {
//     console.log(req.user.name);
//     res.json({});
// });

app.post("/login", (req, res) => {
    //authenticate user
    const { username, password } = req.body;
    const user = { name: username };
    // console.log(req.body);
    // res.status(200).json({success: true, message: req.body});

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
