'use strict';

const { User, School } = require('../models');
const validator = require('../utils/validator');

exports.getAllSchools = async function (req, res)
{
    try
    {
        const schools = await School.find({});
        return res.send(schools);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    /*School.find({})
        .then(docs =>
        {
            res.send(docs);
        })
        .catch(err =>
        {
            console.log(err)
            res.sendStatus(500);
        });*/

    /*School.find({}, function (err, docs)
    {
        if (err)
        {
            console.log(err)
            res.sendStatus(500);
        }
        else
        {
            res.send(docs);
        }
    });*/
};

exports.getTeachersOfSchool = async function (req, res)
{
    const schoolId = req.params.schoolId;

    try
    {
        const school = await School.findById(schoolId);

        if (school)
        {
            return res.send(school.teacherIds || []);
        }
        else
        {
            return res.status(400).send('School is not exist');
        }
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.getStudentsOfSchool = async function (req, res)
{
    const schoolId = req.params.schoolId;

    try
    {
        const school = await School.findById(schoolId);

        if (school)
        {
            return res.send(school.studentIds || []);
        }
        else
        {
            return res.status(400).send('School is not exist');
        }
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.createSchool = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const { name, userId } = req.body;

    // validate on principal role
    try
    {
        const user = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('principal', user);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // create new school
    const school = new School({
        name: name,
        principalId: userId,
        teacherIds: [],
        studentIds: []
    });

    try
    {
        await school.save();
        return res.send(school);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.assignTeacherToSchool = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const schoolId = req.params.schoolId;
    const teacherId = req.params.teacherId;

    // validate on principal role
    try
    {
        const user = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('principal', user);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

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

    // validate on teacher already assigned
    try
    {
        const school = await School.findById(schoolId);

        const errorMessage = validator.validateTeacherAlreadyAssignedToSchool(teacherId, school);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // assign teacher
    try
    {
        await School.findByIdAndUpdate(schoolId, { $push: { teacherIds: teacherId } });
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.removeTeacherFromSchool = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const schoolId = req.params.schoolId;
    const teacherId = req.params.teacherId;

    // validate on principal role
    try
    {
        const user = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('principal', user);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // remove teacher
    try
    {
        await School.findByIdAndUpdate(schoolId, { $pull: { teacherIds: teacherId } });
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.assignStudentToSchool = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const schoolId = req.params.schoolId;
    const studentId = req.params.studentId;

    // validate on principal role
    try
    {
        const user = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('principal', user);
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

    // validate on teacher already assigned
    try
    {
        const school = await School.findById(schoolId);

        const errorMessage = validator.validateStudentAlreadyAssignedToSchool(studentId, school);
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
        await School.findByIdAndUpdate(schoolId, { $push: { studentIds: studentId } });
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.removeStudentFromSchool = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const userId = req.body.userId;
    const schoolId = req.params.schoolId;
    const studentId = req.params.studentId;

    // validate on principal role
    try
    {
        const user = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('principal', user);
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
        await School.findByIdAndUpdate(schoolId, { $pull: { studentIds: studentId } });
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};

exports.removeSchool = async function (req, res)
{
    if (!req.body) return res.sendStatus(400);

    const schoolId = req.params.schoolId;
    const userId = req.body.userId;

    // validate on principal role
    try
    {
        const user = await User.findById(userId);

        const errorMessage = validator.validateUserOnRole('principal', user);
        if (errorMessage) return res.status(400).send(errorMessage);
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }

    // remove school
    try
    {
        await School.findByIdAndDelete(schoolId);
        return res.send('success');
    }
    catch (err)
    {
        console.log(err)
        return res.sendStatus(500);
    }
};