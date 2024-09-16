class CreateInterestDTO {
  constructor(interest) {
    this.id = interest._id;
    this.name = interest.name;
    this.users = interest.users || []; // Array of user IDs
    this.createdAt = interest.createdAt;
    this.updatedAt = interest.updatedAt;
  }

  validate() {
    // Provide specific feedback on missing required fields
    if (!this.name) throw new Error('Name is required');
  }
}
class UpdateInterestDTO {
  constructor(interest) {
    this.id = interest._id;
    this.name = interest.name || null;
    this.users = interest.users || [];
    this.updatedAt = interest.updatedAt || null;
  }

  validate() {
    if (!this.id) throw new Error('Interest ID is required for updates');
  }
}



module.exports = { CreateInterestDTO, UpdateInterestDTO };
