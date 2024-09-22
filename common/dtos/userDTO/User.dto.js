class UserDTO {
  constructor(user) {
    this.id = user.id; 
    this.username = user.username;
    this.firstName = user.first_name; 
    this.lastName = user.last_name; 
    this.email = user.email;
    this.phone = user.phone;
    this.country = user.country;
    this.userBackground = user.userBackground || null;
    this.experience = user.experience || null;
    this.investmentPreferences = user.investment_preferences || [];
    this.idNationality = user.idNationality || null;
    this.profileImage = user.profile_image || 'https://i.ibb.co/6WtQfMm/default.png'; 
    this.isVerified = user.is_verified; 
    this.isActive = user.is_active; 
    this.createdAt = user.created_at; 
    this.updatedAt = user.updated_at; 
    this.languages = user.languages || [];
    this.interests = user.interests || [];
  }
}

module.exports = { UserDTO };
