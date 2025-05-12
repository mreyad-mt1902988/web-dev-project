"use client";

import { useEffect, useState } from "react";
import styles from "../styles/Statistics.module.css";
import {
    getNumberOfStudentsPerCourse,
    getNumberOfStudentsPerYear,
    getNumberOfStudentsPerCategory,
    getTopThreeCourses,
    getFailureRatePerCourse,
    getFailureRatePerCategory,
    getAverageGradePerCourse,
    getPassRatePerCourse,
    getAverageCoursesPerStudent,
    getTopThreeCategories
} from "@/app/actions/statisticsActions";

export default function StatisticsPage() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function loadStats() {
            const perCourse = await getNumberOfStudentsPerCourse();
            const perYear = await getNumberOfStudentsPerYear();
            const perCategory = await getNumberOfStudentsPerCategory();
            const topThree = await getTopThreeCourses();
            const failPerCourse = await getFailureRatePerCourse();
            const failPerCategory = await getFailureRatePerCategory();
            const avgGradePerCourse = await getAverageGradePerCourse();
            const passRatePerCourse = await getPassRatePerCourse();
            const avgCoursesPerStudent = await getAverageCoursesPerStudent();
            const topThreeCategories = await getTopThreeCategories();

            setStats({
                perCourse,
                perYear,
                perCategory,
                topThree,
                failPerCourse,
                failPerCategory,
                avgGradePerCourse,
                passRatePerCourse,
                avgCoursesPerStudent,
                topThreeCategories
            });
        }
        loadStats();
    }, []);

    if (!stats) {
        return <p className={styles.loading}>Loading statistics...</p>;
    }

    return (
        <div className={styles.statsPage}>
            <h1>Student &amp; Course Statistics</h1>

            <section>
                <h2>Students per course</h2>
                <ul>
                    {Object.entries(stats.perCourse).map(([id, count]) => (
                        <li key={id}>{id}: {count} students</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Students per year</h2>
                <ul>
                    {Object.entries(stats.perYear).map(([year, count]) => (
                        <li key={year}>{year}: {count} students</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Students per category</h2>
                <ul>
                    {Object.entries(stats.perCategory).map(([cat, count]) => (
                        <li key={cat}>{cat}: {count} students</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Top 3 courses</h2>
                <ul>
                    {Object.entries(stats.topThree).map(([id, count]) => (
                        <li key={id}>{id}: {count} enrollments</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Failure rate per course</h2>
                <ul>
                    {Object.entries(stats.failPerCourse).map(([id, rate]) => (
                        <li key={id}>{id}: {rate.toFixed(2)}%</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Failure rate per category</h2>
                <ul>
                    {Object.entries(stats.failPerCategory).map(([cat, rate]) => (
                        <li key={cat}>{cat}: {rate.toFixed(2)}%</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Average grade per course</h2>
                <ul>
                    {Object.entries(stats.avgGradePerCourse).map(([id, avg]) => (
                        <li key={id}>{id}: {avg.toFixed(2)}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Pass rate per course</h2>
                <ul>
                    {Object.entries(stats.passRatePerCourse).map(([id, rate]) => (
                        <li key={id}>{id}: {rate.toFixed(2)}%</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Average courses per student</h2>
                <p>{stats.avgCoursesPerStudent.toFixed(2)}</p>
            </section>

            <section>
                <h2>Top 3 categories by enrollment</h2>
                <ul>
                    {Object.entries(stats.topThreeCategories).map(([cat, count]) => (
                        <li key={cat}>{cat}: {count} enrollments</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
