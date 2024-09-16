class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.userName = user.userName;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.country = user.country;
    this.languages = user.languages || [];
    this.profileImage = user.profileImage || 'https://i.ibb.co/6WtQfMm/default.png';
    this.socialLinks = user.socialLinks || [];
    this.role = user.role;
    this.isVerified = user.isVerified;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

module.exports = { UserDTO };
