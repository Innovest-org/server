class UpdateUserDTO {
  constructor(user) {
    this.id = user._id;
    this.username = user.username || null;
    this.email = user.email || null;
    this.firstName = user.firstName || null;
    this.lastName = user.lastName || null;
    this.phone = user.phone || null;
    this.country = user.country || null;
    this.languages = user.languages || [];
    this.profileImage = user.profileImage || null;
    this.socialLinks = user.socialLinks || [];
    this.role = user.role || null;
    this.isVerified = user.isVerified !== undefined ? user.isVerified : null;
    this.isActive = user.isActive !== undefined ? user.isActive : null;
    this.updatedAt = user.updatedAt || null;
  }

  validate() {
    if (!this.id) throw new Error('User ID is required for updates');
  }
}

module.exports = { UpdateUserDTO };
