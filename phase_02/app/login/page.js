"use client";
import styles from "../styles/Login.module.css";
import { useState } from "react";
import { handleLoginAction } from "@/app/actions/loginActions";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogin(event, formData) {
        event.preventDefault();
        try {
            const user = await handleLoginAction(formData);
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            router.push("/");
        }
        catch {
            setError("Invalid username, password, or role. Please try again.");
        }
    };

    return (
        <div className={styles.loginPage}>
            <h1>
                Login <i className="fa-regular fa-user"></i>
            </h1>
            <form id="login-form" className={styles.loginForm} onSubmit={e => handleLogin(e, new FormData(e.target))}>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select className={styles.role} id="role" name="role" defaultValue="student" required>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="administrator">Administrator</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="username">username</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">password</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
            {error ? <p className={styles.errorMessage} id="error-message">{error}</p> : <></>}
            <p>Not registered yet? <Link href="#">Create account</Link></p>
        </div>
    );
}