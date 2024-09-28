class CommunityPagesDTO {
    constructor(community_name, created_at, updated_at, visibility, page_id) {
        this.community_name = community_name; // Unique identifier for the community page
        this.created_at = created_at;         // Timestamp when the page was created
        this.updated_at = updated_at;         // Timestamp when the page was last updated
        this.visibility = visibility;         // Determines if the page is visible
        this.page_id = page_id;               // Reference to the Page object
    }

    validate() {
        if (!this.community_name) throw new Error('Interest name is required');
      }
}


class UpdateCommunityPagesDTO {
    constructor(community_name, visibility, page_id) {
        this.community_name = community_name; // Optional: Unique identifier for the community page (can be updated)
        this.visibility = visibility;         // Optional: Determines if the page is visible
        this.page_id = page_id;               // Optional: Reference to the Page object (can be updated)
    }
    validate() {
        if (!this.community_name) throw new Error('Interest name is required for update'); 
      }
}

module.exports = { CommunityPagesDTO, UpdateCommunityPagesDTO };