"use client";

import styles from "../styles/Home.module.css";

export default function CourseCard({ course, handleRegisterClick, handleViewMoreClick }) {
    return (
        <div className={styles.courseCard}>
            <img src={course.icon} alt={`${course.name} icon`} className={styles.courseLogo} />
            <div className={styles.courseInfo}>
                <div id="name">
                    <h3>Name</h3>
                    <p>{course.name}</p>
                </div>
                <div id="code">
                    <h3>Code</h3>
                    <p>{course.code}</p>
                </div>
                <div id="category">
                    <h3>Category</h3>
                    <p>{course.category}</p>
                </div>
                <div id="instructor">
                    <h3>Instructor</h3>
                    <p>{course.instructor}</p>
                </div>
                <div id="section">
                    <h3>Section</h3>
                    <p>{course.section}</p>
                </div>
            </div>
            <button className={`${styles.button} ${styles.registerButton}`} type="button" onClick={() => { handleRegisterClick(course) }}>Register</button>
            <button className={styles.button} type="button" onClick={() => handleViewMoreClick(course)}>View more</button>
        </div>
    );
}