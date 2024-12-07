const ProjectService = require('../services/project.service');
const ProjectDTO = require('../common/dtos/project.dto');
const FileManagement = require('../services/file_management.service');


const ProjectController = {
  /**
   * Create a new project and save it to the database
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns {Promise<void>}
   */
  async addProject(req, res) {
    try {
      const { project_name, description, field, budget, deadline } = req.body;
      const userId = req.user.id;

      if (!project_name || !description || !field || !budget || !deadline) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const uploadedPaths = [];
      for (const file of req.files) {
          const filePath = await FileManagement.save_file(file);
          uploadedPaths.push(filePath);
      }

      const projectData = ProjectDTO.fromRequest({
      project_name,
      description,
      entrepreneur_id: userId,
      field,
      budget,
      deadline,
      status: 'under review',
      visibility: false,
      offer: req.body.offer || null,
      target: req.body.target || null,
      documents: uploadedPaths || [],
    });
      const project = await ProjectService.createProject(projectData);
      return res.status(201).json(ProjectDTO.toResponse(project));
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * Updates a project with the given id.
   * @param {string} project_id - The id of the project to be updated.
   * @param {Object} updateData - The data to update the project with.
   * @returns {Promise<Object>} - The updated project.
   * @throws {Error} If the project couldn't be found.
   */
  async updateProject(req, res) {
    try {
      const { project_id } = req.params;
      const updateData = req.body;
      const project = await ProjectService.updateProject(project_id, updateData);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      return res.status(200).json(ProjectDTO.toResponse(project));
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  /**
   * Deletes a project with the given id.
   * @param {string} project_id - The id of the project to be deleted.
   * @returns {Promise<Object>} - The deleted project.
   * @throws {Error} If the project couldn't be found.
   */
  async deleteProject(req, res) {
    try {
      const { project_id } = req.params;
      console.log('controller', project_id);
      const project = await ProjectService.deleteProject(project_id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  /**
   * Retrieves a project by its ID.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a project document or an error message.
   * @throws {Error} If the project couldn't be found.
   */
  async getProject(req, res) {
    try {
      const { project_id } = req.params;
      const project = await ProjectService.getProjectById(project_id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      return res.status(200).json(ProjectDTO.toResponse(project));
    } catch (error) {
      console.error('Error in getProject:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  /**
   * Retrieves all projects.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Promise<void>} - Responds with a list of projects or an error message.
   * @throws {Error} If the projects couldn't be fetched.
   */
  async getProjects(req, res) {
    try {
      const pagination = JSON.parse(req.query.pagination || '{}');
      const result = await ProjectService.getAllProjects(pagination);
      
      if (result.projects.length === 0) {
        return res.status(404).json({ message: 'No projects found' });
      }
      
      return res.status(200).json({
        ...result,
        projects: result.projects.map(ProjectDTO.toResponse)
      });
    } catch (error) {
      console.error('Error in getProjects:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

/**
 * Retrieves all projects for a specific user by user ID.
 * @param {Object} req - The HTTP request object containing the user ID in the params.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - Responds with a list of projects for the user or an error message.
 * @throws {Error} If there is an issue retrieving the projects.
 */
  async getUserProjects(req, res) {
    try {
      const { user_id } = req.params;
      const projects = await ProjectService.getProjectsForUser(user_id);
      if (!projects) {
        return res.status(404).json({ message: 'No projects found' });
      }
      if (!projects || projects.length === 0) {
        return res.status(404).json({ message: 'No projects found for this user' });
      }
      
      return res.status(200).json(projects.map(ProjectDTO.toResponse));
    } catch (error) {
      console.error('Error in getUserProjects:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = ProjectController;
