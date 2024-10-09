const Project = require('../../db/models/projectModel'); // Adjust the path as necessary
const Document = require('../../db/models/documentModel'); // Adjust the path as necessary
const ProjectDTO = require('../dtos/project.dto'); // Import the ProjectDTO
const UpdateProjectDTO = require('../dtos/project.dto'); // Import the UpdateProjectDTO


class ProjectDao {
  /**
   * Creates a new project with the given data.
   * @param {Object} projectData - The project data to be stored in the database.
   * @returns {Promise<Project>} - The newly created project.
   * @throws {Error} If the project couldn't be created.
   */
  async createProject(projectData) {
    try {
      const projectDTO = new ProjectDTO(projectData); // Create a DTO instance for validation
      projectDTO.validate(); // Validate the project data


      const project = new Project(projectDTO);
      await project.save();


      // Handle documents if provided
      if (projectDTO.documents && projectDTO.documents.length > 0) {
        await this._linkDocumentsToProject(projectDTO.documents, project._id);
      }


      return project; // Return the created project
    } catch (error) {
      throw new Error('Error creating project: ' + error.message);
    }
  }


  /**
   * Updates the project with the given id with the provided data.
   * @param {string} projectId - The id of the project to be updated.
   * @param {Object} updateData - The new data to update the project with.
   * @returns {Promise<Project>} - The updated project.
   * @throws {Error} If the project couldn't be updated.
   */
  async updateProject(projectId, updateData) {
    try {
      const existingProject = await Project.findOne({ project_id: projectId });
      if (!existingProject) {
        throw new Error('Project not found');
      }


      const updateDTO = new UpdateProjectDTO(existingProject, updateData);
      updateDTO.validate(); // Validate the updated data


      // Update the project
      Object.assign(existingProject, updateDTO);
      await existingProject.save();


      return existingProject; // Return the updated project
    } catch (error) {
      throw new Error('Error updating project: ' + error.message);
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
      const deletedProject = await Project.findOneAndDelete({ project_id: projectId });
      if (!deletedProject) {
        throw new Error('Project not found');
      }
      return deletedProject; // Return the deleted project
    } catch (error) {
      throw new Error('Error deleting project: ' + error.message);
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
      const project = await Project.findOne({ project_id: projectId });
      if (!project) {
        throw new Error('Project not found');
      }
      return project; // Return the project
    } catch (error) {
      throw new Error('Error getting project: ' + error.message);
    }
  }


  /**
   * Retrieves all projects.
   * @returns {Promise<Project[]>} - A list of all projects.
   * @throws {Error} If the projects couldn't be fetched.
   */
  async getAllProjects() {
    try {
      return await Project.find({});
    } catch (error) {
      throw new Error('Error getting projects: ' + error.message);
    }
  }


  /**
   * Private method to link documents to a project.
   * @param {Array<string>} documents - The document IDs to link.
   * @param {string} projectId - The id of the project to link documents to.
   * @throws {Error} If the linking fails.
   */
  async _linkDocumentsToProject(documents, projectId) {
    try {
      for (const docId of documents) {
        await Document.findByIdAndUpdate(docId, { $push: { projects: projectId } });
      }
    } catch (error) {
      throw new Error('Error linking documents to project: ' + error.message);
    }
  }
}


module.exports = new ProjectDao();
