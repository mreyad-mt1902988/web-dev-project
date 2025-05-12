"use server";

import coursesRepo from "@/app/repo/courses-repo";

export async function getAllCourses() {
    return await coursesRepo.getAllCourses();
}
