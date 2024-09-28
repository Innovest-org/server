

class PageDTO {
    constructor({
        id,
        title,
        content,
        location,
        images_url,
        page_url,
        start_time,
        end_time,
        created_at,
        updated_at,
        page_type,
        admin_state,
        page_state,
        user_id,
        admin_id,
        community,
    }) {
        this.id = id; // String
        this.title = title; // String
        this.content = content; // String
        this.location = location; // String (optional)
        this.images_url = images_url; // Array of Strings
        this.page_url = page_url; // String
        this.start_time = start_time; // Date (optional)
        this.end_time = end_time; // Date (optional)
        this.created_at = created_at; // Date
        this.updated_at = updated_at; // Date
        this.page_type = page_type; // String (enum)
        this.admin_state = admin_state; // String (enum)
        this.page_state = page_state; // String (enum)
        this.user_id = user_id; // ObjectId (reference)
        this.admin_id = admin_id; // ObjectId (reference)
        this.community = community; // Array of ObjectId references
    }

    validate() {
        // Provide specific page on missing required fields
        if (!this.name) throw new Error('Name is required');
      }
}

module.exports = PageDTO;
