class ProjectDTO {
    constructor(projectData) {
        this.project_id = projectData.project_id;
        this.entrepreneur_id = projectData.entrepreneur_id;
        this.created_at = projectData.created_at || new Date();  
        this.updated_at = projectData.updated_at || new Date();  
        this.project_name = projectData.project_name;
        this.description = projectData.description;
        this.document = projectData.document || null; 
        this.status = projectData.status;
        this.visibility = projectData.visibility !== undefined ? projectData.visibility : true; 
        this.field = projectData.field;
        this.budget = projectData.budget;
        this.offer = projectData.offer;
        this.target = projectData.target;
        this.deadline = projectData.deadline;
    }
    validate() {
        // Provide specific project on missing required fields
        if (!this.project_id) throw new Error('ID is required');
      }
}


module.exports = ProjectDTO;