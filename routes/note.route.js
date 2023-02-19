const express = require("express");
const { NoteModel } = require("../models/note.schema");

const noteRouter = express.Router();


noteRouter.get("/", async (req, res) => {
    const notes = await NoteModel.find();
    res.send(notes);
})



noteRouter.post("/create", async (req, res) => {
    const payload = req.body;
    const note = new NoteModel(payload);
    await note.save();
    res.send({ "msg": "Note Created" });
})


noteRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id;
    const note = await NoteModel.findOne({ "_id": noteID })
    const userID_note = note.userID;
    const userID_req = req.body.userID
    try {
        if (userID_req !== userID_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await NoteModel.findByIdAndDelete({ _id: noteID });
            res.send({ "msg": `Note with id ${noteID} has been Deleted` });
        }

    } catch (error) {

        res.send({ "msg": "unable to delete note", "error": error.message });
    }
})


noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const noteID = req.params.id;
    const note = await NoteModel.findOne({ "_id": noteID })
    const userID_note = note.userID;
    const userID_req = req.body.userID
    try {
        if (userID_req !== userID_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
            res.send({ "msg": `Note with id ${noteID} has been updated` });
        }

    } catch (error) {

        res.send({ "msg": "unable to update note", "error": error.message });
    }

})


module.exports = { noteRouter }