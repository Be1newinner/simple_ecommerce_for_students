const request = require("supertest")
const { app } = require("../../src/index");

describe("ECOMMERCE BACKEND SETUP Test", () => {
    it("GET / - should return welcome message", async () => {
        const response = await request(app).get("/")
        // console.log(response);
        expect(response.status).toBe(200);
        expect(response.text).toBe("Welcome to Simple Ecommerce!")
    })
})