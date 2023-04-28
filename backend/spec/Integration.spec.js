/*import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TasksDAO from '../dao/tasksDAO.js';
import app from '../server.js';
import request from 'supertest';
var base_url = "/api/v1/clockwork"
dotenv.config({ path: ".env" });

var username = "UNITTEST";
var token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
    })
describe("Testing Integration", () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000000;
    it("checking getCalander", function(done) {
            request(app)
                .get(base_url+"/getCalendar/641a7cde9c56234053c47794/2")
                .set('token', token)
                .expect(200)
                .end((error) => (error) ? done.fail(error) : done());
            });
            console.log("bruh");
        }
    );*/

// Temporarily commented out for readablility in terminal output