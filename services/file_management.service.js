const path = require('path');
const fs = require('fs');
class FileManagement {
    default_upload_path = __dirname + '/../uploads';
    check_if_file_exist (file_name , directory = this.default_upload_path ) {
        return fs.existsSync(path.join(directory , file_name));
    }
    save_file (file , directory = this.default_upload_path)  {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
        // check if the files exists
        fs.writeFile(path.join(directory , file.originalname), file.buffer, (err) => {
            if (err) {
                console.log(err);
            }
        });
        return path.join(directory , file.originalname) ;
    }
    delete_file (file , directory = this.default_upload_path) {
        console.log(file);
        console.log(directory);
        const file_path = path.join(directory , file);
        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
        }
    }
}

module.exports = new FileManagement();