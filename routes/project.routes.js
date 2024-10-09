const express = require('express');
const ProjectController = require('../controllers/project.controller');
const Project = require('../db/models/projectModel');
const AuthMiddleware = require('../middlewares/auth.middleware');




const router = express.Router();


// Create a new project
router.post('/', AuthMiddleware(), ProjectController.createProject);


// Update an existing project
router.put('/:id', ProjectController.updateProject);


// Delete a project
router.delete('/:id', ProjectController.deleteProject);


// Get a project by ID
router.get('/:id', ProjectController.getProjectById);


// Get all projects
router.get('/', ProjectController.getAllProjects);


module.exports = router;
