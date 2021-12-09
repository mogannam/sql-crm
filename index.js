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
const EmployeeQuestions = require('./lib/EmployeeQuestions');


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
                //insertData('department', 'name', answers.name)
                let departmentReturned;
                
                aDatabase.query(`insert into department (name) values ('${answers.name}')`)
                let deptReturned = {};
                aDatabase.query('select * from department').then(
                    rows =>{
                        deptReturned = rows
                    }
                ).then(()=>{
                    console.table(deptReturned)
                    promptMainMenu()
                })
                //selectDataAndDisplay('Department')
                break;
            case "Role":
                //insertRole('role', 'title, salary, departmentid', `${answers.title}, ${answers.salary}`)
                //selectDataAndDisplay('Role')
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
        const aDatabase = new Database();
        switch (userChoice){
            
            case "Role":
                console.log(`answers: ${JSON.stringify(answers) }`)
                console.log(`first object: ${JSON.stringify(arrayOfDepartments)}`)
                let oneDepartmentObj = arrayOfDepartments.filter(deptObject => deptObject.name == answers.name )
                console.log(`oneDepartmentObj ${JSON.stringify(oneDepartmentObj)}`)
                let deptIDSelected = oneDepartmentObj[0].id

                aDatabase.query(`insert into role (title, salary, departmentId) values ('${answers.title}', ${answers.salary}, ${deptIDSelected})`)
                let deptReturned = {};
                const selectSql = `select * from role`
                aDatabase.query(selectSql).then(
                    rows =>{
                        deptReturned = rows
                    }
                ).then(()=>{
                    console.table(deptReturned)
                    promptMainMenu()
                })
                
                break;
            default:
                console.log("somethign went wrong adding the team member!")
                break;
        

        }
        
         
    })
}

const pushEmployee = async (questionObject, userChoice, arrayOfArrayofObj) =>{
    //todo: switch case to fine tune user choice
   
    await inquirer.prompt(questionObject.getInquirerQuestions()).then( async answers =>{
        // To Do call teamMemberConstructor
        //console.log(answers)
        const aDatabase = new Database();
        switch (userChoice){
            
            case "Employee":
                const arrRoleObj = arrayOfArrayofObj[0]
                const arrManagerObj = arrayOfArrayofObj[1]
                const roleSelected = arrRoleObj.filter(roleObject => roleObject.title == answers.title )
                let managerSelected = arrManagerObj.filter(managerObject => `${managerObject.firstName},${managerObject.lastName}` == answers.firstNameLastName)
                console.table(`roleSelected`, roleSelected)
                console.table(`managerSelected`,managerSelected)
                console.log(`managerSelected ${managerSelected}`)
                
                if(answers.firstNameLastName === "N/A")
                    managerSelected = null
                else
                    managerSelected = managerSelected[0].managerId
                

                aDatabase.query(`insert into employee (firstName, lastName, roleId, managerId) values ('${answers.firstName}', '${answers.lastName}', ${roleSelected[0].id}, ${managerSelected})`)
                let deptReturned = {};
                const selectSql = `select * from employee`
                aDatabase.query(selectSql).then(
                    rows =>{
                        employeeReturned = rows
                    }
                ).then(()=>{
                    console.table(employeeReturned)
                    promptMainMenu()
                })
                
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
                let deptReturned;
                aDatabase.query('select * from department').then(
                    rows =>{
                        deptReturned = rows
                    }
                ).then(()=>{
                    const choices = deptReturned.map(object=>object.name)
                    const deptListQuestion = new QuestionList(name='name', message="which Department is the role fore",type='list', choices)
                    aRoleQuestion.questions.push(deptListQuestion)
                    pushRole(aRoleQuestion,"Role", deptReturned)
                }

                )

                //pushData(aDeptQuestion,"Role")
                break
            case "Add an Employee":
                let allEmployeesReturned = {}
                let allRolesReturned = {}
                let aEmployeeQuest = new EmployeeQuestions(role="Employee")
                aDatabase.query('select * from employee').then(
                    employeeRows =>{
                        allEmployeesReturned = employeeRows
                    }
                ).then(()=>{
                    //get roles
                    aDatabase.query('select * from role').then( roleRows =>{
                        allRolesReturned = roleRows
                        const choices = allEmployeesReturned.map(object=> `${object.firstName},${object.lastName}`)
                        choices.unshift("N/A")
                        const ManagerQuestionLst = new QuestionList(name='firstNameLastName', message="Select the employee's Manager",type='list', choices)
                        //console.table(`allRolesReturned`,allRolesReturned)
                        const choicesRole = allRolesReturned.map(object=> object.title)
                        const roleQuestionLst = new QuestionList(name='title', message="Select the employee's role",type='list', choicesRole)
                        aEmployeeQuest.questions.push(ManagerQuestionLst)
                        //console.table(`choicesRole`, choicesRole)
                        aEmployeeQuest.questions.push(roleQuestionLst)

                        pushEmployee(aEmployeeQuest,"Employee", [allRolesReturned,allEmployeesReturned])

                    })
                })

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



