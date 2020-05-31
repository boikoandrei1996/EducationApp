'use strict';

const express = require('express');
const router = express.Router();

const { schoolController } = require('../controllers');

// Get all schools
router.get('/', schoolController.getAllSchools);

// Get teachers of school
router.get('/:schoolId/teachers', schoolController.getTeachersOfSchool);

// Get students of school
router.get('/:schoolId/students', schoolController.getStudentsOfSchool);

// Create school
router.post('/', schoolController.createSchool);

// Assign teacher to school
router.put('/:schoolId/assign/teacher/:teacherId', schoolController.assignTeacherToSchool);

// Remove teacher from school
router.put('/:schoolId/remove/teacher/:teacherId', schoolController.removeTeacherFromSchool);

// Assign student to school
router.put('/:schoolId/assign/student/:studentId', schoolController.assignStudentToSchool);

// Remove student from school
router.put('/:schoolId/remove/student/:studentId', schoolController.removeStudentFromSchool);

// Remove school
router.delete('/:schoolId', schoolController.removeSchool);

module.exports = router;
