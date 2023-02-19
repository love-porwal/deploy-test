const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { noteRouter } = require("./routes/note.route")
const { authenticate } = require("./middlewares/authenticate")


app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send(`<h1>Home page Here</h1>`);
})

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", noteRouter);




app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to mongoAtlas")
    } catch (error) {
        console.log(error)
    }
    console.log(`port is running at ${process.env.port}`)
})