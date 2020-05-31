'use strict';

exports.validateUserOnRole = function (role, user)
{
    if (!user)
    {
        return 'User is not found';
    }
    else if (user.role !== role)
    {
        return `User is not ${role}`;
    }
};

exports.validateStudentAlreadyAssignedToClass = function (studentId, _class)
{
    if (!_class)
    {
        return 'Class is not found';
    }
    else if ((_class.studentIds || []).includes(studentId))
    {
        return 'Student is already assigned to class';
    }
};

exports.validateTeacherAlreadyAssignedToSchool = function (teacherId, school)
{
    if (!school)
    {
        return 'School is not found';
    }
    else if ((school.teacherIds || []).includes(teacherId))
    {
        return 'Teacher is already assigned to school';
    }
};

exports.validateStudentAlreadyAssignedToSchool = function (studentId, school)
{
    if (!school)
    {
        return 'School is not found';
    }
    else if ((school.studentIds || []).includes(studentId))
    {
        return 'Student is already assigned to school';
    }
};