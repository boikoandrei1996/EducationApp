'use strict';

const express = require('express');
const router = express.Router();

const { classController } = require('../controllers');

// Get all classes
router.get('/', classController.getAllClasses);

// Get students of class
router.get('/:classId/students', classController.getStudentsOfClass);

// Get all classes of teacher
router.get('/teacher/:teacherId', classController.getClassesOfTeacher);

// Get all classes of student
router.get('/student/:studentId', classController.getClassesOfStudent);

// Create class
router.post('/', classController.createClass);

// Assign student to class
router.put('/:classId/assign/student/:studentId', classController.assignStudentToClass);

// Remove student from class
router.put('/:classId/remove/student/:studentId', classController.removeStudentFromClass);

// Remove class
router.delete('/:classId', classController.removeClass);

module.exports = router;
