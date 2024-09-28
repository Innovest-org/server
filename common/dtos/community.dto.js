class CommunityDTO {
    constructor({ name, created_at, updated_at, description, image, admin_id, users, pages }) {
        this.name = name;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.description = description;
        this.image = image;
        this.admin_id = admin_id;
        this.users = users;
        this.pages = pages;
    }
    validate() {
        // Provide specific community on missing required fields
        if (!this.name) throw new Error('Name is required');
      }
}

module.exports = CommunityDTO;
