class UpdateUserDTO {
  constructor(user) {
    this.id = user.id; 
    this.username = user.username || null;
    this.firstName = user.first_name || null; 
    this.lastName = user.last_name || null; 
    this.email = user.email || null;
    this.password = user.password || null;
    this.phone = user.phone || null;
    this.country = user.country || null;
    this.userBackground = user.userBackground || null;
    this.experience = user.experience || null;
    this.investmentPreferences = user.investment_preferences || [];
    this.idNationality = user.idNationality || null;
    this.profileImage = user.profile_image || null; 
    this.isVerified = user.is_verified !== undefined ? user.is_verified : null; 
    this.isActive = user.is_active !== undefined ? user.is_active : null; 
    this.updatedAt = user.updated_at || null; 
    this.languages = user.languages || [];
    this.interests = user.interests || [];
  }

  validate() {
    if (!this.id) throw new Error('User ID is required for updates');
  }
}

module.exports = { UpdateUserDTO };
