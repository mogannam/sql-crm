const fs = require('fs');
const inquirer = require("inquirer");
const mysql = require('mysql2');
const QuestionList = require('./lib/QuestionList');
const Manager = require('./lib/Manager');
const Department = require('./lib/Department');
//const departmentPublic = require('./public/department');
const RoleQuestions = require('./lib/RoleQuestions');
const DepartmentQuestions = require('./lib/DepartmentQuestions');

const InternQuestions = require('./lib/InternQuestions');
const db = require('./db/connection');
const cTable = require('console.table');
const { json } = require('express');


class Database {
    constructor(connection){
      this.connection = mysql.createConnection(
        {
          host: 'localhost',
          // Your MySQL username,
          user: 'root',
          // Your MySQL password
          password: '',
          database: 'crm'
        },
        console.log('Connected to the crm database.')
      ); 
  
    }
  
    query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
    }
  
    close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
    }
  
  }

//const fetch = require("node-fetch");
//import fetch from 'node-fetch';

const myTeam = [];
let global_id = 0;
const outPath = "dist/index.html";



//helper function, to help call asyn msql2 calls


    
const selectDataAndDisplay = async (whichTable) => {

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
const selectData = async (whichTable, whichColumns) => {

    const sql = `SELECT ${whichColumns} from ${whichTable}`;
    //console.log(`in selectData data ${sql}`)
    
    try {
        db.query(sql, async (err, rows) => {
            
            return rows
          });    
    
    } catch ( err ) {
        console.log(`catch error: ${err}`)
    }
}

const insertData =  async (whichTable,columsString,valuesString) => {
    console.log('in insertData')
    console.log(` valuesString  ${valuesString}`)
    let sql = ``
    // `SELECT * from ${whichTable}`;
    switch (whichTable){
        case "role":
            sql = `Insert into ${whichTable} (${columsString}) values ('${valuesString}')`
            break;
        default:
            console.log('Sorry an error occured inserting data.')
    }
    console.log(`sql line 53: ${sql}`)
    
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

const pushData = async (questionObject, userChoice) =>{
    //todo: switch case to fine tune user choice
    const aDatabase = new Database();
    await inquirer.prompt(questionObject.getInquirerQuestions()).then( async answers =>{
        // To Do call teamMemberConstructor
        //console.log(answers)
        switch (userChoice){
            case "Department":
                insertData('department', 'name', answers.name)
                let departmentReturned;
                
                aDatabase.query(`insert into department (name) values ('${answers.name}')`)
                //selectDataAndDisplay('Department')
                break;
            case "Role":
                insertRole('role', 'title, salary, departmentid', `${answers.title}, ${answers.salary}`)
                selectDataAndDisplay('Role')
                break;
            case "Employee":
                //todo intern constructor
                //await myTeam.push(new Intern(answers.name, id=global_id, answers.email,role=userChoice,answers.school))
                break;
            default:
                console.log("somethign went wrong adding the team member!")
                break;
        

        }
        
         
    })
}

const pushRole = async (questionObject, userChoice, arrayOfDepartments) =>{
    //todo: switch case to fine tune user choice
   
    await inquirer.prompt(questionObject.getInquirerQuestions()).then( async answers =>{
        // To Do call teamMemberConstructor
        //console.log(answers)
        switch (userChoice){
            
            case "Role":
                console.log(`answers: ${JSON.stringify(answers) }`)
                console.log(`first object: ${JSON.stringify(arrayOfDepartments[0])}`)
                let oneDepartmentObj = arrayOfDepartments.filter(deptObject => deptObject.name == answers.name )
                console.log(`oneDepartmentObj ${JSON.stringify(oneDepartmentObj)}`)
                insertData('role', 'title, salary, departmentid', `${answers.title}, ${answers.salary}, ${oneDepartmentObj.id}`)
                selectDataAndDisplay('Role')
                break;
            default:
                console.log("somethign went wrong adding the team member!")
                break;
        

        }
        
         
    })
}




const promptMainMenu = async() =>  {
    
    const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Done']
    const crmMenuQuestions = new QuestionList("userChoice","What would you like to do? ", 'list', choices)
    //console.log(growTeamQuest.getQuestion())
    const arrQuesst = [];
    let aQuestion = "";

    inquirer.prompt(crmMenuQuestions.getQuestion()).then(async answers=>{
        //console.log(answers)
        const aDatabase = new Database();
        switch(answers.userChoice){
            case "Done":
                return;
                break;
            case "View All Departments":
                
                //await selectDataAndDisplay('department');
                
                let departmentReturned;
                
                aDatabase.query('select * from department').then(
                    rows =>{
                        departmentReturned = rows
                    }
                ).then(()=>{
                    console.table(departmentReturned)
                    promptMainMenu()
                })

                
                
                break;
            case "View All Roles":
                //await selectDataAndDisplay('role');
                let rolesReturned;
                aDatabase.query('select * from role').then(
                    rows =>{
                        rolesReturned = rows
                    }
                ).then(()=>{
                    console.table(rolesReturned)
                    promptMainMenu()
                })
                break;
            case "View All Employees":
                //await selectDataAndDisplay('employee');
                let employeesReturned;
                aDatabase.query('select * from employee').then(
                    rows =>{
                        employeesReturned = rows
                    }
                ).then(()=>{
                    console.table(employeesReturned)
                    promptMainMenu()
                })
                break;
            case "Add a Department":
                const aDeptQuestion = new DepartmentQuestions(name="name",message=aQuestion)
                
                //console.log(aDeptQuestion.getInquirerQuestions())
                pushData(aDeptQuestion,"Department")
                
                break;
            case "Add a Role":
                let aRoleQuestion = new RoleQuestions(name="name",message=aQuestion)
                //new QuestionList(name=`salary`, message='Enter a salary'),
                //constructor(name, message,type, choices)
                
                //selectData('department','name');
                //const aDatabase = new Database();
                let rowsReturned1;
                aDatabase.query('select * from department').then(
                    rows =>{
                        rowsReturned1 = rows
                    }
                ).then(()=>{
                    const choices = rowsReturned1.map(object=>object.name)
                    const deptListQuestion = new QuestionList(name='name', message="which Department is the role fore",type='list', choices)
                    aRoleQuestion.questions.push(deptListQuestion)
                    pushRole(aRoleQuestion,"Role", rowsReturned1)
                }

                )

                //pushData(aDeptQuestion,"Role")
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

// const pushData = async (questionObject, userChoice) =>{
//     //todo: switch case to fine tune user choice
   
//     await inquirer.prompt(questionObject.getInquirerQuestions()).then( async answers =>{
//         // To Do call teamMemberConstructor
//         //console.log(answers)
//         switch (userChoice){
//             case "Department":
//                 insertData('department', 'name', answers.name)
//                 selectDataAndDisplay('Department')
//                 break;
//             case "Role":
//                 insertRole('role', 'title, salary, departmentid', `${answers.title}, ${answers.salary}`)
//                 selectDataAndDisplay('Role')
//                 break;
//             case "Employee":
//                 //todo intern constructor
//                 //await myTeam.push(new Intern(answers.name, id=global_id, answers.email,role=userChoice,answers.school))
//                 break;
//             default:
//                 console.log("somethign went wrong adding the team member!")
//                 break;
        

//         }
        
         
//     })
// }



