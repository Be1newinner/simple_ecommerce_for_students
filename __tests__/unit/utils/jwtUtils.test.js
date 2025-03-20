const jsonwebtoken = require("jsonwebtoken");
const {
    createToken,
    generateAccessToken,
    generateRefreshToken,
    generateLoginTokens,
    decryptToken
} = require("../../../src/utils/jwt");

jest.mock("jsonwebtoken");

const mockUser = {
    uid: "123456",
    email: "user@example.com",
    role: "user"
}

describe("JWT UTILS FUNCTIONS", () => {
    beforeEach(() => {
        process.env.JWT_SECRET = "some-test-key";
        jest.clearAllMocks();
    })

    // Test createToken()
    it("CREATE A NEW TOKEN", async () => {
        jsonwebtoken.sign.mockResolvedValue("mockToken");

        const token = await createToken({ ...mockUser, expiry: "1h" });

        expect(jsonwebtoken.sign).toHaveBeenCalledWith(
            mockUser,
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // console.log({ token })

        expect(token).toBe("mockToken")
    })

})

