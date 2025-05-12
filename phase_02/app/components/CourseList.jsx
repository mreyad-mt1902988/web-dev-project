"use client";

import { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";
import styles from "../styles/Home.module.css";

export default function CourseList({ initialCourses, searchInput, searchOption }) {
    const [courses, setCourses] = useState(initialCourses);
    const [modalCourse, setModalCourse] = useState(null);

    useEffect(() => {
        const searchTerms = searchInput.toLowerCase().trim().split(" ");

        if (!searchInput.trim()) {
            setCourses(initialCourses);
            return;
        }

        const matchedCourses = [];

        initialCourses.forEach(c => {
            // A score variable to rank courses according to how much they match the search input:
            let score = 0;
            searchTerms.forEach(t => {
                if (c[searchOption].toLowerCase().includes(t)) {
                    score += 1;
                }
            })
            if (score > 0) {
                matchedCourses.push({ c, score });
            }
        });

        if (matchedCourses.length > 0) {
            matchedCourses.sort((a, b) => b.score - a.score);
            setCourses(matchedCourses.map(e => e.c));
        }
        else {
            setCourses([]);
        }

    }, [searchInput, searchOption, initialCourses]);

    const handleRegisterClick = (course) => {
        alert("asdasd");
    };

    const handleViewMoreClick = (course) => {
        setModalCourse(course);
    };

    const handleCloseButtonClick = () => {
        setModalCourse(null);
    };

    return (
        <>
            <div className={styles.coursesContainer}>
                {courses.length > 0 ? (
                    courses.map(course => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            handleRegisterClick={handleRegisterClick}
                            handleViewMoreClick={handleViewMoreClick}
                        />
                    ))
                ) : (
                    <p>No matches</p>
                )}
            </div>
            {modalCourse ? <CourseModal course={modalCourse} handleCloseButtonClick={handleCloseButtonClick} /> : <></>}
        </>
    );
}
