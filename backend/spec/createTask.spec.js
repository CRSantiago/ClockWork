import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TasksDAO from '../dao/tasksDAO.js';
import app from '../server.js';
import request from 'supertest';
import User from '../models/user.model.js'
import randString from '../methods/randString.js'
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


describe("Testing createTask", () => {
  // Here we should test the following
  /*
  Interval
  */

    it("Interval task", async function() {
            taskData = {
              "title":"intervaltest",
              "user": id,
              "datestart": "2023-09-29T19:47:02.339Z",
              "dateend": "2023-10-03T19:47:02.339Z",
              "description": "wash and fold neatly",
              "interval":{
                "unit": "days",
                "value":"1"
              },
              "notes":"Use fabric softener",
              "notifyintensity":"none"
            };
            
            const res = await request(app)
                .post(base_url+"/createTask")
                .send(taskData)
                .set('token', token)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/);

            });
            console.log("Create Task Interval Complete");
        }
    );

    describe("Testing createTask", () => {
        // Here we should test the following
        /*
        non-interval
        */
      
          it("Non-interval task", async function() {
                  taskData = {
                    "title":"homework",
                    "user": id,
                    "datestart": "2023-07-08T12:00:00.339Z",
                    "dateend": "2023-07-08T19:00:00.339Z",
                    "description":"do homework for COP4331",
                    "interval":{
                      "unit": "none",
                      "value":"0"
                    },
                    "notes":"non barista mode activated",
                    "notifyintensity":"none"
                  };
                  responseData = {
                    "user": id,
                    "foreignid": "643eae6fb9f99c8687ab92ac",
                    "datestart": "2023-07-08T12:00:00.339Z",
                    "dateend": "2023-07-08T19:00:00.339Z",
                    "title":"homework",
                    "description":"do homework for COP4331",
                    "interval": {
                      "unit": "none",
                      "value": 0
                    },
                    "notes":"non barista mode activated",
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
                  console.log("Create Task Non-Interval Complete");
              }
    );

    describe("Testing createTask", () => {
        // Here we should test the following
        /*
        Invalid Date
        */
      
          it("500 Internal Server Error for invalid date", async function() 
          {
                  taskData = 
                  {
                    "title":"homework",
                    "user": id,
                    "datestart": "2023-07-008T12:00:00.339Z",
                    "dateend": "2023-07-08T19:00:00.339Z",
                    "description":"do homework for COP4331",
                    "interval":
                    {
                      "unit": "none",
                      "value":"0"
                    },
                    "notes":"non barista mode activated",
                    "notifyintensity":"none"
                  };
                
                  const res = await request(app)
                      .post(base_url+"/createTask")
                      .send(taskData)
                      .set('token', token)
                      .set('Accept', 'application/json')
                      .expect(500)
                      .expect('Content-Type', /json/);

                  console.log(res.body);

                 expect(res.body.error).toBeUndefined();
                
                  console.log("500 Internal Server Error Date Complete");
              })
            }
        );

        describe("Testing createTask", () => {
            // Here we should test the following
            /*
            Invalid Interval
            */
          
              it("500 Internal Server Error for Invalid Interval", async function() 
              {
                      taskData = 
                      {
                        "title":"homework",
                        "user": id,
                        "datestart": "2023-07-08T12:00:00.339Z",
                        "dateend": "2023-09-08T12:00:00.339Z",
                        "description":"do homework for COP4331",
                        "interval":
                        {
                          "unit": "day",
                          "value":"1"
                        },
                        "notes":"non barista mode activated",
                        "notifyintensity":"none"
                      };
                    
                      const res = await request(app)
                          .post(base_url+"/createTask")
                          .send(taskData)
                          .set('token', token)
                          .set('Accept', 'application/json')
                          .expect(500)
                          .expect('Content-Type', /json/);
    
                      console.log(res.body);
    
                     expect(res.body.error).toBeUndefined();
                    
                      console.log("500 Internal Server Error Invalid Interval Complete");
                  })
                }
            );
