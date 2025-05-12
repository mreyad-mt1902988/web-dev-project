"use server";

import statisticsRepo from "@/app/repo/statistics-repo";

export async function getNumberOfStudentsPerCourse() {
    return await statisticsRepo.getNumberOfStudentsPerCourse();
}

export async function getNumberOfStudentsPerYear() {
    return await statisticsRepo.getNumberOfStudentsPerYear();
}

export async function getNumberOfStudentsPerCategory() {
    return await statisticsRepo.getNumberOfStudentsPerCategory();
}

export async function getTopThreeCourses() {
    return await statisticsRepo.getTopThreeCourses();
}

export async function getFailureRatePerCourse() {
    return await statisticsRepo.getFailureRatePerCourse();
}

export async function getFailureRatePerCategory() {
    return await statisticsRepo.getFailureRatePerCategory();
}

export async function getAverageGradePerCourse() {
    return await statisticsRepo.getAverageGradePerCourse();
}

export async function getPassRatePerCourse() {
    return await statisticsRepo.getPassRatePerCourse();
}

export async function getAverageCoursesPerStudent() {
    return await statisticsRepo.getAverageCoursesPerStudent();
}

export async function getTopThreeCategories() {
    return await statisticsRepo.getTopThreeCategories();
}
