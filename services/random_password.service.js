

class RandomPasswordService {
  constructor(passwordLength = 8) {
    this.passwordLength = passwordLength;
  }

  async generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < this.passwordLength; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  }
}

module.exports = RandomPasswordService;