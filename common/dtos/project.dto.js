  class ProjectDTO {
  constructor(project) {
      this.project_id = project.project_id || null; // Assuming this can be auto-generated
      this.project_name = project.project_name;
      this.description = project.description;
      this.entrepreneur_id = project.entrepreneur_id;
      this.status = project.status;
      this.visibility = project.visibility !== undefined ? project.visibility : true; // Default to true
      this.field = project.field;
      this.budget = project.budget;
      this.offer = project.offer || null; // Default to null if not provided
      this.target = project.target || null; // Default to null if not provided
      this.deadline = project.deadline;
      this.documents = project.documents || []; // Default to an empty array if not provided
      this.created_at = project.createdAt || new Date(); // Use current date if not provided
      this.updated_at = project.updatedAt || new Date(); // Use current date if not provided
  }

  validate() {
      const missingFields = [];
      // Check for required fields
      if (!this.project_name) missingFields.push('Project name is required');
      if (!this.description) missingFields.push('Description is required');
      if (!this.entrepreneur_id) missingFields.push('Entrepreneur ID is required');
      if (!this.status) missingFields.push('Status is required');
      if (!this.field) missingFields.push('Field is required');
      if (this.budget === undefined) missingFields.push('Budget is required');
      if (!this.deadline) missingFields.push('Deadline is required');

      if (missingFields.length > 0) {
          throw new Error(missingFields.join(', ')); // Join errors in a single string
      }
  }
}


  class UpdateProjectDTO {
    constructor(project, updatedData) {
        this.project_id = project.project_id || null; // Assuming this can be auto-generated
        this.project_name = updatedData.project_name || project.project_name; // Use updated data or keep existing
        this.description = updatedData.description || project.description; // Use updated data or keep existing
        this.entrepreneur_id = project.entrepreneur_id; // Entrepreneur ID remains unchanged
        this.status = updatedData.status || project.status; // Use updated data or keep existing
        this.visibility = updatedData.visibility !== undefined ? updatedData.visibility : project.visibility; // Keep existing if not provided
        this.field = updatedData.field || project.field; // Use updated data or keep existing
        this.budget = updatedData.budget !== undefined ? updatedData.budget : project.budget; // Keep existing if not provided
        this.offer = updatedData.offer !== undefined ? updatedData.offer : project.offer; // Keep existing if not provided
        this.target = updatedData.target !== undefined ? updatedData.target : project.target; // Keep existing if not provided
        this.deadline = updatedData.deadline || project.deadline; // Use updated data or keep existing
        this.documents = updatedData.documents || project.documents || []; // Default to existing documents if not provided
        this.created_at = project.createdAt; // Retain original created date
        this.updated_at = new Date(); // Set current date for update
    }

    validate() {
        const missingFields = [];
        // Check for required fields
        if (!this.project_name) missingFields.push('Project name is required');
        if (!this.description) missingFields.push('Description is required');
        if (!this.status) missingFields.push('Status is required');
        if (!this.field) missingFields.push('Field is required');
        if (this.budget === undefined) missingFields.push('Budget is required');
        if (!this.deadline) missingFields.push('Deadline is required');

        if (missingFields.length > 0) {
            throw new Error(missingFields.join(', ')); // Join errors in a single string
        }
    }

    delete() {
        // Perform any necessary cleanup before deletion
        return `Project with ID ${this.project_id} is set for deletion.`;
    }
}

module.exports = UpdateProjectDTO;
module.exports = ProjectDTO;
