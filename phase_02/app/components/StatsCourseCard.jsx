"use client";

import Link from "next/link";

/**
 * Props:
 *  - course: the full course object (with name, icon, etc)
 *  - value: the numeric statistic to show
 *  - label: a short label (e.g. "Students", "Failure Rate")
 */
export default function StatsCourseCard({ course, value, label }) {
    return (
        <div className="course-card">
            <img
                src={course.icon}
                alt={`${course.name} icon`}
                className="course-logo"
            />
            <div className="course-info">
                <div>
                    <h3>Name</h3>
                    <p>{course.name}</p>
                </div>
                <div>
                    <h3>{label}</h3>
                    <p>
                        {typeof value === "number"
                            ? label.toLowerCase().includes("rate")
                                ? `${value.toFixed(2)}%`
                                : value
                            : value}
                    </p>
                </div>
            </div>
        </div>
    );
}
