class UpdateFeedbackDTO {
  constructor(feedback) {
    this.id = feedback._id;
    this.rate = feedback.rate || null;
    this.content = feedback.content || null;
    this.userId = feedback.userId || null;
    //this.projectId = feedback.projectId || null;
    this.feedbackerId = feedback.feedbackerId || null;
    this.updatedAt = feedback.updatedAt || null;
  }

  validate() {
    if (!this.id) throw new Error('Feedback ID is required for updates');
  }
}

module.exports = { UpdateFeedbackDTO };
