"use server";

import prisma from "$/prisma/db";

export async function createUser(
    name: string,
    email: string,
    phone: string,
    resumeUrl: string,
) {
    await prisma.user.create({
        data: {
            name,
            email,
            phone,
            resumeUrl,
        },
    });
}
