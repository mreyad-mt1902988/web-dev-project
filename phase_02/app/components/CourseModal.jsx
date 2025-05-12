"use client";

import styles from "../styles/Home.module.css";

export default function CourseModal({ course, handleCloseButtonClick }) {
    const {
        id,
        semester,
        "credit hours": creditHours,
        prerequisites,
        "enrollment limit": enrollmentLimit,
        "actual enrollment": actualEnrollment,
        status,
        validation,
    } = course;

    const prereqText = (prerequisites.length > 0) ? prerequisites.join(", ") : "No prerequisites";

    return (
        <div className={styles.modal} style={{ display: "flex" }}>
            <div className={styles.extraCourseInfo}>
                <span id="close-button" className={styles.closeButton} onClick={handleCloseButtonClick}>&times;</span>
                <div>
                    <h3>ID</h3>
                    <p>{id}</p>
                </div>
                <div>
                    <h3>Semester</h3>
                    <p>{semester}</p>
                </div>
                <div>
                    <h3>Credit hours</h3>
                    <p>{creditHours}</p>
                </div>
                <div>
                    <h3>Prerequisites</h3>
                    <p>{prereqText}</p>
                </div>
                <div>
                    <h3>Enrollment limit</h3>
                    <p>{enrollmentLimit}</p>
                </div>
                <div>
                    <h3>Actual enrollment</h3>
                    <p>{actualEnrollment}</p>
                </div>
                <div>
                    <h3>Status</h3>
                    <p>{status}</p>
                </div>
                <div>
                    <h3>Validated?</h3>
                    <p>{validation}</p>
                </div>
            </div>
        </div>
    );
}