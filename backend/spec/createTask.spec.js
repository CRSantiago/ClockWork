import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import TasksDAO from '../dao/tasksDAO.js';
dotenv.config({ path: ".env" });

var username = "UNITTEST";
var token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400,
    })


describe("Testing createTask", function() {
    it("creating non-regular task", (done) => {
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
              }
            expect( TasksDAO.createTask(id, taskData, token)).toBe(res)  });
            done();
        }
    );