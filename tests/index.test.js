const request = require('supertest');
const app = require('../sources/index.js');

describe("GET /", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});

afterAll(() => {
    app.close();
});