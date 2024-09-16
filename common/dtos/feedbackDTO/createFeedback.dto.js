class CreateFeedbackDTO {
  constructor(feedback) {
    this.id = feedback._id;
    this.rate = feedback.rate || null;
    this.content = feedback.content;
    this.userId = feedback.userId;
    //this.projectId = feedback.projectId;
    this.feedbackerId = feedback.feedbackerId || null;
    this.createdAt = feedback.createdAt;
    this.updatedAt = feedback.updatedAt;
  }

  validate() {
    if (!this.content) throw new Error('Content is required');
    if (!this.userId) throw new Error('User ID is required');
    //if (!this.projectId) throw new Error('Project ID is required');
  }
}

module.exports = { CreateFeedbackDTO };
