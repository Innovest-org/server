class CreatePageDTO {
    constructor(data) {
        this.title = data.title;
        this.content = data.content;
        this.location = data.location;
        this.images_url = data.images_url || [];
        this.page_url = data.page_url;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
        this.page_type = data.page_type;
        this.page_state = data.page_state || 'PENDING';
        this.user_id = data.user_id;
        this.admin_id = data.admin_id;
    }

    validate() {
        if (!this.title) throw new Error('Title is required');
        if (!this.content) throw new Error('Content is required');
        if (!this.page_url) throw new Error('Page URL is required');
        if (!this.user_id) throw new Error('User ID is required');
        if (!this.admin_id) throw new Error('Admin ID is required');
    }
}

module.exports = CreatePageDTO;
