import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TasksDAO from '../dao/tasksDAO.js';
import app from '../server.js';
import request from 'supertest';
import randString from '../methods/randString.js'
import User from '../models/user.model.js'
var base_url = "/api/v1/clockwork"
dotenv.config({ path: ".env" });

var username = "UNITTEST";
var password = "UNITTEST";
var id = "644b2a525fdd05ed39e21d31";
var taskData = {};
var responseData = {};
var getTaskRes = {};
var token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
    })
describe("Testing Integration", () => {
    describe("Testing createTask", () => {
        // Here we should test the following
        /*
        Interval
        */
          let randstring = randString();
      
          it("Interval task", async function() {
                  taskData = {
                    "title":"intervaltest",
                    "user": id,
                    "datestart": "2023-09-29T19:47:02.339Z",
                    "dateend": "2023-10-03T19:47:02.339Z",
                    "description": randstring,
                    "interval":{
                      "unit": "days",
                      "value":"1"
                    },
                    "notes":"Use fabric softener",
                    "notifyintensity":"none"
                  };
                  
                  const resa = await request(app)
                      .post(base_url+"/createTask")
                      .send(taskData)
                      .set('token', token)
                      .set('Accept', 'application/json')
                      .expect(200)
                      .expect('Content-Type', /json/);
      
                  responseData = resa.body;
                  let taskid = resa.body._id;
                  console.log("Response body:", resa.body);
      
                  const user = await User.findById(id);
      
                  let taskCount = 0;
      
                   // Iterate through the user's calendar
                  for (const month in user.calendar) {
                      for (let i = 0; i < user.calendar[month].length; i++)
                      {
                          let currTask = user.calendar[month][i];
      
                          if(currTask)
                          {
                              
                              let taskTitle = currTask.title;
                              let taskDescription = currTask.description
                              // Check if the task matches the expected values
                              if (taskTitle === responseData.title && taskDescription === responseData.description) {
                                  // Increment the taskCount
                                  taskCount += 1;
                                  }
                          }
                      };
                  }
      
                    expect(taskCount).toBe(4);
                  
                  
                    const resb = await request(app)
                        .get(base_url+"/getTask/"+taskid)
                        .set('token', token)
                        .set('Accept', 'application/json')
                        .expect(200)
                        .expect('Content-Type', /json/);
                    
                    getTaskRes = {
                        "interval": {
                          "unit": "days",
                          "value": 1
                        },
                        "_id": "644eaba7e6fe503c0e5d3720",
                        "user": "644b2a525fdd05ed39e21d31",
                        "foreignid": "644eaba775731b0defd61271",
                        "datestart": "2023-09-29T19:47:02.339Z",
                        "dateend": "2023-10-03T19:47:02.339Z",
                        "title": "intervaltest",
                        "description": "59101078109",
                        "notes": "Use fabric softener",
                        "notifyintensity": "none",
                        "__v": 0
                      };
                    expect(resb.body[0].user).toBe(getTaskRes.user);
                    expect(resb.body[0].datestart).toBe(getTaskRes.datestart);
                    expect(resb.body[0].dateend).toBe(getTaskRes.dateend);
                    expect(resb.body[0].title).toBe(getTaskRes.title);
                    expect(resb.body[0].interval.unit).toBe(getTaskRes.interval.unit);
                    expect(resb.body[0].interval.value).toBe(getTaskRes.interval.value);

                  let deleteData = {
                    "id": id,
                    "taskId": taskid
                  };
                  console.log(deleteData);
                  const resc = await request(app)
                      .post(base_url+"/deleteTask")
                      .send(deleteData)
                      .set('token', token)
                      .set('Accept', 'application/json')
                      .expect(200)
                      .expect('Content-Type', /json/);
                      
                  });
                  console.log("Create Task Interval Complete");
              }
          );}
    );