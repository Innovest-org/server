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
        if (!this.community_name) throw new Error('Community name is required');
        if (!this.description) throw new Error('Description is required');
    }
}

class UpdateCommunityDTO {
    constructor(data) {
        this.community_name = data.community_name;
        this.description = data.description;
        this.image = data.image;
        this.admins = data.admins;
        this.users = data.users;
        this.pages = data.pages;
    }

    validate() {
        if (this.community_name && typeof this.community_name !== 'string') throw new Error('Invalid community name');
        if (this.description && typeof this.description !== 'string') throw new Error('Invalid description');ed
    }
}


module.exports = {CreateCommunityDTO, UpdateCommunityDTO};
