class UpdatePageDTO {
  constructor(data) {
    this.title = data.title;
    this.content = data.content;
    this.location = data.location;
    this.images_url = data.images_url;
    this.page_url = data.page_url;
    this.start_time = data.start_time;
    this.end_time = data.end_time;
    this.page_type = data.page_type;
    this.page_state = data.page_state;
    this.user_id = data.user_id;
    this.admin_id = data.admin_id;
  }

  validate() {
    // Validate if provided fields are not of the correct type
    if (this.title && typeof this.title !== 'string') throw new Error('Invalid title');
    if (this.content && typeof this.content !== 'string') throw new Error('Invalid content');
    if (this.page_url && typeof this.page_url !== 'string') throw new Error('Invalid page URL');
    if (this.page_type && !['EVENT', 'INFORMATION', 'POST', 'OTHER'].includes(this.page_type)) throw new Error('Invalid page type');
    if (this.page_state && !['PENDING', 'APPROVED', 'REJECTED'].includes(this.page_state)) throw new Error('Invalid page state');
    if (this.user_id && typeof this.user_id !== 'string') throw new Error('Invalid user ID');
    if (this.admin_id && typeof this.admin_id !== 'string') throw new Error('Invalid admin ID');
  }
}

module.exports = UpdatePageDTO;
