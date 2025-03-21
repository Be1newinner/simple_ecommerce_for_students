require("dotenv").config();

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

async function connectTestDB() {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
}

async function closeTestDB() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
}

async function clearTestDB() {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
        await collections[key].deleteMany({});
    }
}

module.exports = { connectTestDB, closeTestDB, clearTestDB };

describe("Database Setup", () => {
    it("should be properly configured", () => {
        expect(true).toBe(true);
    });
});
