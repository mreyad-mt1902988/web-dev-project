import fs from "fs-extra";
import path from "path";

class UsersRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), "app/data/users.json");
    }

    async getAllUsers() {
        return await fs.readJson(this.filePath);
    }

    async findUser(username, password, role) {
        const users = await this.getAllUsers();
        return users.find(user => user.username === username && user.password === password && user.type === role);
    }
}

export default new UsersRepo();
