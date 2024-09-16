class CreateUserDTO {
  constructor(user) {
    this.id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.country = user.country;
    this.languages = user.languages || [];
    this.profileImage = user.profileImage;
    this.socialLinks = user.socialLinks || [];
    this.role = user.role;
    this.isVerified = user.isVerified;
    this.isActive = user.isActive;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }


  validate() {
    // Provide specific feedback on missing required fields
    if (!this.firstName) throw new Error('First name is required');
    if (!this.lastName) throw new Error('Last name is required');
    if (!this.email) throw new Error('Email is required');
    if (!this.password) throw new Error('Password is required');
    if (!this.country) throw new Error('Country is required');
  }
}

module.exports = { CreateUserDTO };
