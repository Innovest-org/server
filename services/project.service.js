const ProjectDao = require('../common/daos/project.dao');
const bycrypt = require('bcryptjs');




class ProjectService {
  /**
   * Creates a new project with the provided data.
   * @param {Object} projectData - The data for the new project.
   * @returns {Promise<Project>} - The newly created project.
   * @throws {Error} If the project couldn't be created.
   */
  async createProject(projectData) {
    try {
      return await ProjectDao.createProject(projectData);
    } catch (error) {
      throw new Error('Error in Project Service while creating project: ' + error.message);
    }
  }


  /**
   * Updates the project with the given id using the provided data.
   * @param {string} projectId - The id of the project to be updated.
   * @param {Object} updateData - The new data to update the project with.
   * @returns {Promise<Project>} - The updated project.
   * @throws {Error} If the project couldn't be updated.
   */
  async updateProject(projectId, updateData) {
    try {
      return await ProjectDao.updateProject(projectId, updateData);
    } catch (error) {
      throw new Error('Error in Project Service while updating project: ' + error.message);
    }
  }


  /**
   * Deletes the project with the given id.
   * @param {string} projectId - The id of the project to be deleted.
   * @returns {Promise<Project>} - The deleted project.
   * @throws {Error} If the project couldn't be deleted.
   */
  async deleteProject(projectId) {
    try {
      return await ProjectDao.deleteProject(projectId);
    } catch (error) {
      throw new Error('Error in Project Service while deleting project: ' + error.message);
    }
  }


  /**
   * Retrieves the project with the given id.
   * @param {string} projectId - The id of the project to be retrieved.
   * @returns {Promise<Project>} - The project with the given id.
   * @throws {Error} If the project couldn't be fetched.
   */
  async getProjectById(projectId) {
    try {
      return await ProjectDao.getProjectById(projectId);
    } catch (error) {
      throw new Error('Error in Project Service while fetching project: ' + error.message);
    }
  }


  /**
   * Retrieves all projects.
   * @returns {Promise<Project[]>} - A list of all projects.
   * @throws {Error} If the projects couldn't be fetched.
   */
  async getAllProjects() {
    try {
      return await ProjectDao.getAllProjects();
    } catch (error) {
      throw new Error('Error in Project Service while fetching all projects: ' + error.message);
    }
  }
}


module.exports = new ProjectService();
