"use server";

import usersRepo from "@/app/repo/users-repo";

export async function handleLoginAction(formData) {
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    const role = formData.get("role");

    const user = await usersRepo.findUser(username, password, role);

    if (!user) {
        throw new Error("Invalid credentials");
    }

    return user;
}