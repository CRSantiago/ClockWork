import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TasksDAO from '../dao/tasksDAO.js';
import app from '../server.js';
import request from 'supertest';
var base_url = "/api/v1/clockwork"
dotenv.config({ path: ".env" });

var username = "UNITTEST";
var password = "UNITTEST";
var id = "644b2a525fdd05ed39e21d31";
var taskData = {};
var responseData = {};
var token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
    })

/*
let id = " ";
let taskData = {
    "title":"currendate-shenanigans",
    "user":"643de513c91eb27c52d03b19",
    "datestart": "2023-06-02T19:47:02.339Z",
    "dateend": "2023-07-08T19:47:02.339Z",
    "description":"Wash clothes and fold them neatly",
    "interval":{
      "unit": "days",
      "value":"6"
    },
    "notes":"Use fabric softener",
    "notifyintensity":"none"
  }
let res = {
      "user": "643de513c91eb27c52d03b19",
      "foreignid": "643eae6fb9f99c8687ab92ac",
      "datestart": "2023-06-02T19:47:02.339Z",
      "dateend": "2023-07-08T19:47:02.339Z",
      "title": "currendate-shenanigans",
      "description": "Wash clothes and fold them neatly",
      "interval": {
        "unit": "days",
        "value": 6
      },
      "notes": "Use fabric softener",
      "notifyintensity": "none",
      "_id": "643eae6fbf70a0acb864fcdf",
      "__v": 0
    } */
describe("Testing createTask", () => {
  // Here we should test the following
  /*
  non-interval
  interval
  invalid input
  error cases
  */

    it("Non-interval task", async function() {
            taskData = {
              "title":"currendate-shenanigans",
              "user": id,
              "datestart": "2023-06-02T19:47:02.339Z",
              "dateend": "2023-07-08T19:47:02.339Z",
              "description":"Wash clothes and fold them neatly",
              "interval":{
                "unit": "days",
                "value":"6"
              },
              "notes":"Use fabric softener",
              "notifyintensity":"none"
            };
            responseData = {
              "user": id,
              "foreignid": "643eae6fb9f99c8687ab92ac",
              "datestart": "2023-06-02T19:47:02.339Z",
              "dateend": "2023-07-08T19:47:02.339Z",
              "title": "currendate-shenanigans",
              "description": "Wash clothes and fold them neatly",
              "interval": {
                "unit": "days",
                "value": 6
              },
              "notes": "Use fabric softener",
              "notifyintensity": "none",
              "_id": "643eae6fbf70a0acb864fcdf",
              "__v": 0
            }
            const res = await request(app)
                .post(base_url+"/createTask")
                .send(taskData)
                .set('token', token)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);
            expect(res.body.user).toBe(responseData.user);
            expect(res.body.datestart).toBe(responseData.datestart);
            expect(res.body.dateend).toBe(responseData.dateend);
            expect(res.body.title).toBe(responseData.title);
            expect(res.body.description).toBe(responseData.description);
            expect(res.body.interval.unit).toBe(responseData.interval.unit);
            expect(res.body.interval.value).toBe(responseData.interval.value);
            });
            console.log("bruh");
        }
    );