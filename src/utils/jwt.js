import jsonwebtoken from "jsonwebtoken";

export async function createToken({
    uid,
    email,
    role,
    expiry
}) {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET NOT FOUND");

    if (!uid || !email || !role) throw new Error("uid, email, role are required for token generation!");

    const token = await jsonwebtoken.sign({ uid, email, role }, process.env.JWT_SECRET, {
        expiresIn: expiry
    })

    return token;
}


export async function generateAccessToken({ uid,
    email,
    role }) {
    return createToken({
        uid,
        email,
        role,
        expiry: "1h"
    })
}

export async function generateRefreshToken({ uid,
    email,
    role }) {
    return createToken({
        uid,
        email,
        role,
        expiry: 604800 * 2 // 2 Week
    })
}

export async function generateLoginTokens({ uid,
    email,
    role }) {
    return {
        accessToken: await generateAccessToken({
            uid,
            email,
            role
        }),
        refreshToken: await generateRefreshToken({
            uid,
            email,
            role
        })
    }
}