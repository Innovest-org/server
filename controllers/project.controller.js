const ProjectService = require('../services/project.service'); 


class ProjectController {
  /**
   * Creates a new project.
   * @param {Object} req - The request object containing project data.
   * @param {Object} res - The response object for sending the response.
   */
  async createProject(req, res) {
    try {
      const projectData = req.body; // Assuming the project data is sent in the request body
      const newProject = await ProjectService.createProject(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  /**
   * Updates an existing project.
   * @param {Object} req - The request object containing project ID and update data.
   * @param {Object} res - The response object for sending the response.
   */
  async updateProject(req, res) {
    try {
      const projectId = req.params.id; // Assuming the project ID is sent as a URL parameter
      const updateData = req.body; // Assuming the updated project data is sent in the request body
      const updatedProject = await ProjectService.updateProject(projectId, updateData);
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  /**
   * Deletes a project.
   * @param {Object} req - The request object containing project ID.
   * @param {Object} res - The response object for sending the response.
   */
  async deleteProject(req, res) {
    try {
      const projectId = req.params.id; // Assuming the project ID is sent as a URL parameter
      const deletedProject = await ProjectService.deleteProject(projectId);
      res.status(200).json(deletedProject);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  /**
   * Retrieves a project by ID.
   * @param {Object} req - The request object containing project ID.
   * @param {Object} res - The response object for sending the response.
   */
  async getProjectById(req, res) {
    try {
      const projectId = req.params.id; // Assuming the project ID is sent as a URL parameter
      const project = await ProjectService.getProjectById(projectId);
      res.status(200).json(project);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }


  /**
   * Retrieves all projects.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object for sending the response.
   */
  async getAllProjects(req, res) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}


module.exports = new ProjectController();
