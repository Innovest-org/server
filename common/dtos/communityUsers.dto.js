class CommunityUsersDTO {
    constructor(communityUser) {
        this.visibility = communityUser.visibility;
        this.createdAt = communityUser.created_at;
        this.updatedAt = communityUser.updated_at;
        this.userId = communityUser.user_id; // Assuming you want to expose the user IDs
        this.communityName = communityUser.community_name; // Assuming you want to expose the community IDs
    }
    validate() {
        if (!this.userId) throw new Error('Interest userId is required ');
      }
}

class UpdateCommunityUsersDTO {
    constructor(data) {
        this.visibility = data.visibility !== undefined ? data.visibility : undefined;
        this.userId = data.user_id !== undefined ? data.user_id : undefined;
        this.communityName = data.community_name !== undefined ? data.community_name : undefined;
    }
    validate() {
        if (!this.userId) throw new Error('Interest userId is required for updates');
      }
    }


module.exports ={ CommunityUsersDTO , UpdateCommunityUsersDTO};
