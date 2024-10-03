class CreateCommunityDTO {
    constructor(data) {
        this.community_name = data.community_name;
        this.description = data.description;
        this.image = data.image;
        this.admins = data.admins || [];
        this.users = data.users || [];
        this.pages = data.pages || [];
    }

    validate() {
        if (!this.community_name || this.community_name.length > 100) {
            throw new Error('Community name is required and must be less than 100 characters.');
        }
        if (!this.description) {
            throw new Error('Description is required.');
        }
    }
}

class UpdateCommunityDTO {
    constructor(data) {
        this.community_id = data.community_id;
        this.community_name = data.community_name;
        this.description = data.description;
        this.image = data.image;
        this.admins = data.admins;
        this.users = data.users;
        this.pages = data.pages;
    }

    validate() {
        if (this.community_name && typeof this.community_name !== 'string') throw new Error('Invalid community name');
        if (this.description && typeof this.description !== 'string') throw new Error('Invalid description');
    }
}


module.exports = { CreateCommunityDTO, UpdateCommunityDTO };
