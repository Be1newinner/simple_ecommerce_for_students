const jsonwebtoken = require("jsonwebtoken");

async function createToken({
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


async function generateAccessToken({ uid,
    email,
    role }) {
    return createToken({
        uid,
        email,
        role,
        expiry: "1h"
    })
}

async function generateRefreshToken({ uid,
    email,
    role }) {
    return createToken({
        uid,
        email,
        role,
        expiry: 604800 * 2 // 2 Week
    })
}

async function generateLoginTokens({ uid,
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

async function decryptToken(token) {
    try {
        if (!process.env.JWT_SECRET || typeof process.env.JWT_SECRET !== "string") {
            throw new Error("JWT_SECRET NOT FOUND OR INVALID");
        }

        if (!token || typeof token !== "string") {
            throw new Error("TOKEN IS REQUIRED AND MUST BE A STRING");
        }

        // Verify JWT and decode payload
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        // Return required fields
        return {
            uid: data.uid,
            email: data.email,
            role: data.role
        };

    } catch (error) {
        // console.error("JWT Verification Error:", error.message);
        throw new Error("Invalid or expired token")
    }
}


module.exports = {
    createToken,
    generateAccessToken,
    generateRefreshToken,
    generateLoginTokens,
    decryptToken,
}