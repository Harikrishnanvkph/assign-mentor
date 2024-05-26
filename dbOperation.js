const { AsyncLocalStorage } = require("node:async_hooks");
const client = require("./server.js")
const fs = require("node:fs/promises");
const { error } = require("node:console");
const route = require("express").Router();

// Guidelines
route.get("/",async(req,res,next)=>{
    res.writeHead(200,{"Content-Type" : "text/html"});
    res.write(await readingFile("./guide.html"));
    res.end();
})

//list students
route.get("/students",async(req,res,next)=>{
    const students = await client.db("NodeJS_Day3").collection("Student").find({}).toArray();
    res.json(students);
})

//list mentors
route.get("/mentors",async(req,res,next)=>{
    const mentors = await client.db("NodeJS_Day3").collection("Mentor").find({}).toArray();
    res.json(mentors);
})

// Create a Mentor (Task : 1)
route.post("/create/mentor",async(req,res,next)=>{
    console.log(req.body)
    const bd = {...req.body,students_teaching : []};
    await client.db("NodeJS_Day3").collection("Mentor").insertOne(bd);
    res.json({
        status :  "Success",
        message : "Created Mentor successfully",
        insertedObject : bd
    })
})


// Create a Student (Task : 2)
route.post("/create/student",async(req,res,next)=>{
    const {name, mentor} = req.body;
    if(mentor != null){
        await client.db("NodeJS_Day3").collection("Student").insertOne({...req.body,"previous_mentor" : null});
        await client.db("NodeJS_Day3").collection("Mentor").updateOne({mentor : mentor},{
            $push : {
                students_teaching : name
            }
        })
        res.json({
            status :  "Success",
            message : "Created Student successfully and Added student to Mentor list",
            insertedObject : bd
        })
    }else{
        await client.db("NodeJS_Day3").collection("Student").insertOne({...req.body,"mentor" : null,"previous_mentor" : null});
        res.json({
            status :  "Success",
            message : "Created Student successfully",
            insertedObject : bd
        })
    }
})


// Assign Student to Mentor (Task : 3 and 4)
route.put("/assign/studentMentor",async(req,res,next)=>{
    const {role,name,assignee} = req.body;
    if(role.toLowerCase() == "student"){
        if(typeof assignee == "object" && assignee != null){
            res.json({
                action : "FAILED",
                error : "'assignee' should not be an object or array for role = 'student'"
            })
        }else if(assignee == null){
            await client.db("NodeJS_Day3").collection("Mentor").updateMany(
                {students_teaching : name},{$pull : {students_teaching : name}}
            )
            const student = await client.db("NodeJS_Day3").collection("Student").findOne({ name: name });
            await client.db("NodeJS_Day3").collection("Student").updateOne({name : name},{
                $set : {
                    previous_mentor : student.mentor,
                    mentor : assignee
                }
            })
            res.json({
                action : "Success",
                message : "No Mentor Assigned / Mentor Removed for a Student"
            })
        }else{
            await client.db("NodeJS_Day3").collection("Mentor").updateMany(
                {students_teaching : name},{$pull : {students_teaching : name}}
            )
            const student = await client.db("NodeJS_Day3").collection("Student").findOne({ name: name });
            await client.db("NodeJS_Day3").collection("Student").updateOne({name : name},{
                $set : {
                    previous_mentor : student.mentor,
                    mentor : assignee
                }
            })
            await client.db("NodeJS_Day3").collection("Mentor").updateOne(
                {name : assignee},{
                    $push : {
                        students_teaching : name
                    }
                }
            )
            res.json({
                action : "Success",
                message : "Mentor assigned/reassigned to Student"
            })
        }
    }else if(role.toLowerCase() == "mentor"){
        if(typeof assignee == "object" && assignee != null){
            console.log("Got int")
            await client.db("NodeJS_Day3").collection("Mentor").updateOne(
                {name : name},
                {
                    $push : {
                        students_teaching : {$each : assignee}
                    }
                }
            );
            console.log("got 2")
            await client.db("NodeJS_Day3").collection("Mentor").updateMany(
                {name : {$ne : name}},
                {
                    $pull : {
                        students_teaching : {$in : assignee}
                    }
                }
            );
            console.log("got 3")
            const master = await client.db("NodeJS_Day3").collection("Student")
            .find({name : {$in : assignee}}).toArray();
            // console.log(master)
            await stumentArray(master,name);
            res.json({
                action :  "Success",
                message : "Many Students are assigned to a Mentor"
            })
        }else if(assignee == null){
            await client.db("NodeJS_Day3").collection("Mentor").updateOne({name : name},{
                $set : {
                    students_teaching : assignee
                }
            });
            await client.db("NodeJS_Day3").collection("Student").updateMany(
                {mentor : name}, {$set : {
                    previous_mentor : name,
                    mentor : assignee
                }}
            );
            res.json({
                action :  "Success",
                message : "No Students / All Students removed for the Mentor"
            })
        }else{
            await client.db("NodeJS_Day3").collection("Mentor").updateMany({
                students_teaching : assignee
            },{$pull : {
                students_teaching : assignee
            }})
            await client.db("NodeJS_Day3").collection("Mentor").updateOne({name : name},{
                $push : {
                    students_teaching : assignee
                }
            });
            const ment = await retrieveStudent(assignee);
            if(name != ment){
                await client.db("NodeJS_Day3").collection("Student").updateOne(
                    {name : assignee}, {
                        $set : {
                            previous_mentor : ment,
                            mentor : name
                        }}
                );
            }
            res.json({
                action :  "Success",
                message : "Student assigned/reassigned to Mentor"
            })
        }
    }else{
        res.json({
            action : "FAILED",
            error : "Incorrect ROLE Specified"
        })
    }
})


// Show all students for a particular mentor (Task : 5)
route.get("/show/mentorStudents/:id", async (req, res, next) => {
    const { id } = req.params;
    const studs = await client.db("NodeJS_Day3").collection("Mentor").aggregate([
        {$match : { name: id} },
        {$project : {students_teaching: 1, _id: 0 }}
    ]).toArray();
    res.json(studs[0]);
});


// Show the previously assigned mentor for a particular student (Task :6)
route.get("/show/previousMentor/:id", async (req, res, next) => {
    const { id } = req.params;
    const studs = await client.db("NodeJS_Day3").collection("Student")
    .aggregate([{$match : {name : id}},{$project : {_id :0,previous_mentor : 1}}]).toArray();
    res.json(studs[0]);
});

// reset Collection
route.delete("/reset",async(req,res,next)=>{
    await client.db("NodeJS_Day3").collection("Student").deleteMany({});
    await client.db("NodeJS_Day3").collection("Mentor").deleteMany({});
    const students = await readingFile("./Student.json");
    await client.db("NodeJS_Day3").collection("Student").insertMany(JSON.parse(students));
    const mentors = await readingFile("./Mentor.json");
    await client.db("NodeJS_Day3").collection("Mentor").insertMany(JSON.parse(mentors));
    res.json({
        action : "Success",
        message : "RESETTED THE COLLECTION"
    })
})

// gives the mentor of student
async function retrieveStudent(name){
    const studs = await client.db("NodeJS_Day3").collection("Student").findOne({ name: name });
    console.log(studs);
    return studs.mentor;
}

// iterates over each student -> finds mentor and assigns new mentor
async function stumentArray(arr,newMentor){
    console.log("a")
    for(var a of arr){
        const mt = await retrieveStudent(a.name);
        await client.db("NodeJS_Day3").collection("Student").updateOne(
            {name : a.name},
            {$set : {
                previous_mentor : mt,
                mentor : newMentor
            }}
        )
    }
}

// reading a file
async function readingFile(path){
    return await fs.readFile(path,"utf-8",(error,data)=>{
        if(error){
            console.log(error);
        }else{
            return data;
        }
    })
}


module.exports = route;

