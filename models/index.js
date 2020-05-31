'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    role: {
        type: String,
        required: true,
        enum: ["principal", "teacher", "student"]
    }
}, { versionKey: false });

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    principalId: {
        type: ObjectId,
        required: true
    },
    teacherIds: [ObjectId],
    studentIds: [ObjectId]
}, { versionKey: false });

const classSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    schoolId: ObjectId,
    studentIds: [ObjectId],
    teacherIds: [ObjectId]
}, { versionKey: false });

module.exports = {
    User: mongoose.model("User", userSchema),
    School: mongoose.model("School", schoolSchema),
    Class: mongoose.model("Class", classSchema)
};