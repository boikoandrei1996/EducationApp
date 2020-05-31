'use strict';

const { User, Class, School } = require('../models');
const validator = require('../utils/validator');

exports.getAllClasses = async function (req, res)
{
    try
    {
        const classes = await Class.find({});
        return res.send(classes);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.getStudentsOfClass = async function (req, res)
{
    const classId = req.params.classId;

    try
    {
        const _class = await Class.findById(classId);

        if (_class)
        {
            return res.send(_class.studentIds || []);
        }
        else
        {
            return res.status(400).send('Class is not found');
        }
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.getClassesOfTeacher = async function (req, res)
{
    const teacherId = req.params.teacherId;

    // validate on teacher role
    try
    {
        const teacher = await User.findById(teacherId);

        const errorMessage = validator.validateUserOnRole('teacher', teacher);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    try
    {
        const classes = await Class.find({ teacherIds: teacherId });
        return res.send(classes || []);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.getClassesOfStudent = async function (req, res)
{
    const studentId = req.params.studentId;

    // validate on student role
    try
    {
        const student = await User.findById(studentId);

        const errorMessage = validator.validateUserOnRole('student', student);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    try
    {
        const classes = await Class.find({ studentIds: studentId });
        return res.send(classes || []);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.createClass = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const { title, schoolId, userId } = req.body;

    // validate on teacher role
    try
    {
        const teacher = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('teacher', teacher);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // validate on school exist
    if (schoolId)
    {
        try
        {
            const school = await School.findById(schoolId);
            if (!school) return res.status(400).send('School is not found');
        }
        catch (err)
        {
            console.log(err)
            return res.sendStatus(500);
        }
    }

    // create new class
    const _class = new Class({
        title: title,
        schoolId: schoolId,
        teacherIds: [userId],
        studentIds: []
    });

    try
    {
        await _class.save();
        return res.send(_class);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.assignStudentToClass = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const classId = req.params.classId;
    const studentId = req.params.studentId;

    // validate on teacher role
    try
    {
        const teacher = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('teacher', teacher);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // validate on student role
    try
    {
        const student = await User.findById(studentId);

        const errorMessage = validator.validateUserOnRole('student', student);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // validate on student already assigned
    try
    {
        const _class = await Class.findById(classId);

        const errorMessage = validator.validateStudentAlreadyAssignedToClass(studentId, _class);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // assign student
    try
    {
        await Class.findByIdAndUpdate(classId, { $push: { studentIds: studentId } });
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.removeStudentFromClass = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const classId = req.params.classId;
    const studentId = req.params.studentId;

    // validate on teacher role
    try
    {
        const teacher = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('teacher', teacher);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // remove student
    try
    {
        await Class.findByIdAndUpdate(classId, { $pull: { studentIds: studentId } });
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.removeClass = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const classId = req.params.classId;
    const userId = req.body.userId;

    // validate on teacher role
    try
    {
        const teacher = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('teacher', teacher);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // remove class
    try
    {
        await Class.findByIdAndDelete(classId);
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};