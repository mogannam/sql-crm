const fs = require('fs');
const inquirer = require("inquirer");
const QuestionList = require('./lib/QuestionList');
const Manager = require('./lib/Manager');
const Department = require('./lib/Department');
//const departmentPublic = require('./public/department');
const Intern = require('./lib/Intern');
const EngineerQuestions = require('./lib/EngineerQuestions');
const ManagerQuestions = require('./lib/ManagerQuestions');
const InternQuestions = require('./lib/InternQuestions');
const db = require('./db/connection');
const cTable = require('console.table');

//const fetch = require("node-fetch");
//import fetch from 'node-fetch';

const myTeam = [];
let global_id = 0;
const outPath = "dist/index.html";



//helper function, to help call asyn msql2 calls


    
const selectData = async (whichTable) => {

    const sql = `SELECT * from ${whichTable}`;
    
    try {
        db.query(sql, (err, rows) => {
            console.table(rows);
            promptMainMenu()
          });        
    
    } catch ( err ) {
        console.log(`catch error: ${err}`)
    }
}

const insertData =  async (whichTable, columsString, valuesString) => {

    const sql = `SELECT * from ${whichTable}`;
    
    try {
        db.query(sql, (err, rows) => {
            console.table(rows);
            promptMainMenu()
          });        
    
    } catch ( err ) {
        console.log(`catch error: ${err}`)
    }
}


// from answers get, name, email, github/officenumber/school
// from user choice get role
//const employeeInst = new Manager(name='Data', global_id, email='Data@myfirm.com', role='Engineer', github='data');

const pushTeamMember = async (backStoryQuest, userChoice) =>{
    //todo: switch case to fine tune user choice
   
    await inquirer.prompt(backStoryQuest.getInquirerQuestions()).then( async answers =>{
        // To Do call teamMemberConstructor
        //console.log(answers)
        switch (userChoice){
            case "Manager":
                //todo call manager constructor
                await myTeam.push(new Manager(answers.name, id=global_id, answers.email,role=userChoice,answers.officeNumber))
                break;
            case "Engineer":
                //todo engineer constructor
                await myTeam.push(new Engineer(answers.name, id=global_id, answers.email,role=userChoice,answers.github))
                break;
            case "Intern":
                //todo intern constructor
                await myTeam.push(new Intern(answers.name, id=global_id, answers.email,role=userChoice,answers.school))
                break;
            default:
                console.log("somethign went wrong adding the team member!")
                break;
        

        }
        await console.log("done pushing team member")
         
    })
}



const promptMainMenu = async() =>  {
    const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Done']
    const growTeamQuest = new QuestionList("userChoice","What would you like to do? ", 'list', choices)
    //console.log(growTeamQuest.getQuestion())
    inquirer.prompt(growTeamQuest.getQuestion()).then(async answers=>{
        //console.log(answers)
        switch(answers.userChoice){
            case "Done":
                return;
                break;
            case "View All Departments":
                // a set of questions, and a user choice to create a team member
                await selectData('department');
                //await pushTeamMember(new ManagerQuestions(role='Manager'),answers.userChoice )
                
                break;
            case "View All Roles":
                await selectData('role');
                break;
            case "View All Employees":
                await selectData('employee');
                break;
            case "Add a Department":
                break;
            case "Add a Role":
                break
            case "Add an Employee":
                break;
            case "Update an Employee Role":
                break;
            default:
                console.log("\n Sorry, something went wrong choose again. \n")
                await promptMainMenu()
                break;
        }
        
        return;
    })
    
    
}


console.log("Let's Build your team! \n \n")

const init =  () =>{
     promptMainMenu();
}


//console.log('Before')
init()




//console.log(`Local keep gpoing ${keepGoing}`)





