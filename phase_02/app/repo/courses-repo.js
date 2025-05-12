import fs from "fs-extra";
import path from "path";

class CoursesRepo {
    constructor() {
        this.filePath = path.join(process.cwd(), "app/data/courses.json");
    }

    async getAllCourses() {
        return await fs.readJson(this.filePath);
    }

    async getAvailableCourses() {
        const courses = await this.getAllCourses();
        return courses.filter(course => course.status === "Pending");
    }

    async searchCoursesByOption(searchTerms, option) {
        const availableCourses = this.getAvailableCourses();

    }
}

export default new CoursesRepo();