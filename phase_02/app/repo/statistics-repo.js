import fs from "fs-extra";
import path from "path";

class StatisticsRepo {
    constructor() {
        this.usersPath = path.join(process.cwd(), "app/data/users.json");
        this.coursesPath = path.join(process.cwd(), "app/data/courses.json");
    }

    async getUsers() {
        return await fs.readJson(this.usersPath);
    }

    async getCourses() {
        return await fs.readJson(this.coursesPath);
    }

    async getNumberOfStudentsPerCourse() {
        const users = await this.getUsers();
        const students = users.filter(u => u.type === "student");

        const courseCount = {};
        for (const student of students) {
            const courses = Object.keys(student["courses and grades"]);
            for (const course of courses) {
                if (!courseCount[course]) {
                    courseCount[course] = 0;
                }
                courseCount[course]++;
            }
        }
        return courseCount;
    }

    async getNumberOfStudentsPerYear() {
        const users = await this.getUsers();
        const students = users.filter(u => u.type === "student");

        const yearCount = {};
        for (const student of students) {
            const year = student.id.toString().slice(0, 4);
            if (!yearCount[year]) {
                yearCount[year] = 0;
            }
            yearCount[year]++;
        }
        return yearCount;
    }

    async getNumberOfStudentsPerCategory() {
        const users = await this.getUsers();
        const courses = await this.getCourses();
        const students = users.filter(u => u.type === "student");

        const courseMap = {};
        for (const course of courses) {
            courseMap[course.id] = course.category;
        }

        const categoryCount = {};
        for (const student of students) {
            const studentCourses = Object.keys(student["courses and grades"]);
            for (const course of studentCourses) {
                const category = courseMap[course];
                if (!category) {
                    continue;
                }
                if (!categoryCount[category]) {
                    categoryCount[category] = 0;
                }
                categoryCount[category]++;
            }
        }
        return categoryCount;
    }

    async getTopThreeCourses() {
        const coursesCount = await this.getNumberOfStudentsPerCourse();
        const sortedCoursesCount = Object.entries(coursesCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
        return Object.fromEntries(sortedCoursesCount);
    }

    async getFailureRatePerCourse() {
        const users = await this.getUsers();
        const students = users.filter(u => u.type === "student");

        const failCount = {};
        const totalCount = {};

        for (const student of students) {
            const studentGrades = student["courses and grades"];
            for (const [course, grade] of Object.entries(studentGrades)) {
                if (grade === null) {
                    continue;
                }
                if (!totalCount[course]) {
                    totalCount[course] = 0;
                }
                if (!failCount[course]) {
                    failCount[course] = 0;
                }
                totalCount[course]++;
                if (grade < 60) {
                    failCount[course]++;
                }
            }
        }

        const failRate = {};
        for (const course in totalCount) {
            failRate[course] = ((failCount[course] || 0) / totalCount[course]) * 100;
        }

        return failRate;
    }

    async getFailureRatePerCategory() {
        const users = await this.getUsers();
        const courses = await this.getCourses();
        const students = users.filter(u => u.type === "student");

        const courseMap = {};
        for (const course of courses) {
            courseMap[course.id] = course.category;
        }

        const failCount = {};
        const totalCount = {};

        for (const student of students) {
            const grades = student["courses and grades"];
            for (const [course, grade] of Object.entries(grades)) {
                const category = courseMap[course];
                if (!category || grade === null) {
                    continue;
                }
                if (!totalCount[category]) {
                    totalCount[category] = 0;
                }
                if (!failCount[category]) {
                    failCount[category] = 0;
                }
                totalCount[category]++;
                if (grade < 60) {
                    failCount[category]++;
                }
            }
        }

        const failureRate = {};
        for (const category in totalCount) {
            failureRate[category] = ((failCount[category] || 0) / totalCount[category]) * 100;
        }

        return failureRate;
    }

    async getAverageGradePerCourse() {
        const users = await this.getUsers();
        const students = users.filter(u => u.type === "student");

        const sum = {}, count = {};
        for (const student of students) {
            const grades = student["courses and grades"];
            for (const [course, grade] of Object.entries(grades)) {
                if (grade === null) {
                    continue;
                }
                sum[course] = (sum[course] || 0) + grade;
                count[course] = (count[course] || 0) + 1;
            }
        }

        const avg = {};
        for (const course in sum) {
            avg[course] = sum[course] / count[course];
        }
        return avg;
    }

    async getPassRatePerCourse() {
        const users = await this.getUsers();
        const students = users.filter(u => u.type === "student");

        const passCount = {}, totalCount = {};
        for (const student of students) {
            const grades = student["courses and grades"];
            for (const [course, grade] of Object.entries(grades)) {
                if (grade === null) {
                    continue;
                }
                totalCount[course] = (totalCount[course] || 0) + 1;
                if (grade >= 60) {
                    passCount[course] = (passCount[course] || 0) + 1;
                }
            }
        }

        const passRate = {};
        for (const course in totalCount) {
            passRate[course] = (passCount[course] || 0) / totalCount[course] * 100;
        }

        return passRate;
    }

    async getAverageCoursesPerStudent() {
        const users = await this.getUsers();
        const students = users.filter(u => u.type === "student");
        const coursesPerStudent = students.map(student => Object.keys(student["courses and grades"]).length);
        const sum = coursesPerStudent.reduce((a, b) => a + b, 0);
        return sum / students.length;
    }

    async getTopThreeCategories() {
        const categoriesCount = await this.getNumberOfStudentsPerCategory();
        const sortedCategoriesCount = Object.entries(categoriesCount).sort((a, b) => b[1] - a[1]).slice(0, 3);
        return Object.fromEntries(sortedCategoriesCount);
    }

}

export default new StatisticsRepo();