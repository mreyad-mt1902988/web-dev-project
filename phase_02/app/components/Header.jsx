"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Header({ handleSearchInputChange, handleSearchOptionChange }) {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setLoggedInUser(loggedInUser);
    }, []);

    return (
        <header>
            <ul className={styles.headerMenu}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="#">About us</Link></li>
                <li><Link href="#">Contact us</Link></li>
                <li>
                    <label htmlFor="search-option">Search by:</label>
                    <select className={styles.searchOption} id="search-option" name="search-option" defaultValue="name"
                        onChange={(e) => handleSearchOptionChange(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="category">Category</option>
                    </select>
                </li>
                <li>
                    <div className={styles.searchBox}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input id="search-input" type="search" placeholder="Search courses" onChange={(e) => handleSearchInputChange(e.target.value)} />
                    </div>
                    {loggedInUser ?
                        (
                            <button type="button" id="login-button" className={styles.button} disabled style={{ opacity: 0.7, cursor: "not-allowed" }}>
                                Logged in
                            </button>
                        ) : (
                            <Link href="/login">
                                <button type="button" id="login-button" className={styles.button}>Login</button>
                            </Link>
                        )
                    }
                </li>
            </ul>
        </header>
    );
}