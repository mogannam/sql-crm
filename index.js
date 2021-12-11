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

const sqlSelectDept = `select name as 'Department Name', id as 'Department Id' from department`
const sqlSelectRole = `select role.title as 'Job Title', role.id as 'Role Id', department.name as 'Department Name', role.salary as Salary from role left join department on role.departmentId=department.id`
const sqlSelectEmployee = 'select e.id as "Employee Id", e.firstName as "First Name", e.lastName as "Last Name", r.title as "Employee Job Title", d.name as "Department", r.salary as "Employee Salary", m.firstName as "Manager First Name", m.lastName as "Manager Last Name" from employee as e left join employee as m on e.managerId=m.id left join role as r on e.roleId=r.id left join department as d on r.departmentId=d.id'
const sqlSumSalaryByDept = `select d.name "Department Name", d.id "Department Id", SUM(r.salary) "Total Budget" from role r left join department d on r.departmentId=d.id group by d.id`
const sqlEmployeeByDept =  `${sqlSelectEmployee} order by r.departmentId`
const sqlEmployeeByMang = `${sqlSelectEmployee} order by e.managerId`
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



const myTeam = [];
let global_id = 0;
const outPath = "dist/index.html";






const pushData = async (questionObject, userChoice, arrayOfArrayofObj) =>{
    //todo: switch case to fine tune user choice
   
    await inquirer.prompt(questionObject.getInquirerQuestions()).then( async answers =>{
        // To Do call teamMemberConstructor
        //console.log(answers)
        //let selectSql = ''
        const aDatabase = new Database();
        switch (userChoice){
            
            case "Employee":
                const arrRoleObj = arrayOfArrayofObj[0]
                const arrManagerObj = arrayOfArrayofObj[1]
                const roleSelected = arrRoleObj.filter(roleObject => roleObject.title == answers.title )
                let managerSelected = arrManagerObj.filter(managerObject => `${managerObject.firstName},${managerObject.lastName}` == answers.firstNameLastName)
                
                
                if(answers.firstNameLastName === "N/A")
                    managerSelected = null
                else
                    managerSelected = managerSelected[0].id
                console.log(`Manager Selected ${JSON.stringify(managerSelected)}`)

                aDatabase.query(`insert into employee (firstName, lastName, roleId, managerId) values ('${answers.firstName}', '${answers.lastName}', ${roleSelected[0].id}, ${managerSelected})`)
                let employeeReturned = {};
                //const selectSql = `select * from employee`
                aDatabase.query(sqlSelectEmployee).then(
                    rows =>{
                        employeeReturned = rows
                    }
                ).then(()=>{
                    console.table(employeeReturned)
                    promptMainMenu()
                })
                
                break;
            case "Role":
                
                let oneDepartmentObj = arrayOfArrayofObj[0].filter(deptObject => deptObject.name == answers.name )
                //console.log(`oneDepartmentObj ${JSON.stringify(oneDepartmentObj)}`)
                let deptIDSelected = oneDepartmentObj[0].id

                aDatabase.query(`insert into role (title, salary, departmentId) values ('${answers.title}', ${answers.salary}, ${deptIDSelected}) on duplicate key update title='${answers.title}', salary=${answers.salary}, departmentId=${deptIDSelected}`)
                let rowReturned = {};
                //const selectSqlRole = `select * from role`
                aDatabase.query(sqlSelectRole).then(
                    rows =>{
                        rowReturned = rows
                    }
                ).then(()=>{
                    console.table(rowReturned)
                    promptMainMenu()
                })
                break;
            case "Department":
                let departmentReturned;
                
                aDatabase.query(`insert into department (name) values ('${answers.name}') on duplicate key update name='${answers.name}'`)
                let deptReturned = {};
                aDatabase.query(sqlSelectDept).then(
                    rows =>{
                        deptReturned = rows
                    }
                ).then(()=>{
                    console.table(deptReturned)
                    promptMainMenu()
                })
                
                break;
            case "Update Role":
                
                    const arrRoleObj2 = arrayOfArrayofObj[0]
                    const arrEmployeeObj = arrayOfArrayofObj[1]
                    // console.table(`arrRoleObj2`, arrRoleObj2)
                    // console.table(`arrEmployeeObj`,arrEmployeeObj)
                    // console.table(`answers.title `,answers.title )
                    
                    let roleSelected2 = arrRoleObj2.filter(roleObject2 => roleObject2.title == answers.title )
                    let employeeSelected = arrEmployeeObj.filter(employeeObject => `${employeeObject.firstName},${employeeObject.lastName}` == answers.firstNameLastName)
                    // console.table(`roleSelected`, roleSelected2)
                    // console.table(`employeeSelected`,employeeSelected)
                    // console.log(`employeeSelected json stringify`, JSON.stringify(employeeSelected))
                    
                   
                    employeeSelected = employeeSelected[0]
                    roleSelected2 = roleSelected2[0]
                    //console.log(`*****************************`)
                    //console.table(`roleSelected2 after : ${JSON.stringify(roleSelected2)}`)
    
                    aDatabase.query(`update employee set roleId = ${roleSelected2.id} where id = ${employeeSelected.id}`)
                    let employeeReturned2 = {};
                    //const selectEmployeeSql = `select * from employee`
                    const selectEmployeeSql = `select e.firstName as "First Name", e.lastName as "Last Name", r.title as "Employee Role", m.firstName as "Manager First Name", m.lastName as "Manager Last Name" from employee as e left join employee as m on e.managerId=m.id left join role as r on e.roleId=r.id where e.id = ${employeeSelected.id}`
                    aDatabase.query(selectEmployeeSql).then(
                        rows =>{
                            employeeReturned2 = rows
                        }
                    ).then(()=>{
                        console.table(employeeReturned2)
                        promptMainMenu()
                    })
                    
                    break;
                
                break;
            default:
                console.log("somethign went wrong adding the team member!")
                break;
        

        }
        
         
    })
}




const promptMainMenu = async() =>  {
    
    const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'View Department Budget', 'View Employees by Department', 'View Employees by Manager', 'Done']
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
                
                
                
                let departmentReturned;
                
                aDatabase.query(sqlSelectDept).then(
                    rows =>{
                        departmentReturned = rows
                    }
                ).then(()=>{
                    console.table(departmentReturned)
                    promptMainMenu()
                })

                
                
                break;
            case "View All Roles":
                
                let rolesReturned;
                aDatabase.query(sqlSelectRole).then(
                    rows =>{
                        rolesReturned = rows
                    }
                ).then(()=>{
                    console.table(rolesReturned)
                    promptMainMenu()
                })
                break;
            case "View All Employees":
                
                let employeesReturned;
                aDatabase.query(sqlSelectEmployee).then(
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
                    //console.log(JSON.stringify(deptReturned))
                    pushData(aRoleQuestion,"Role", [deptReturned])
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

                        pushData(aEmployeeQuest,"Employee", [allRolesReturned,allEmployeesReturned])

                    })
                })

                break;
            case "Update an Employee Role":
                let allEmployeesReturned2 = {}
                let allRolesReturned2 = {}
                let aEmployeeQuest2 = new EmployeeQuestions(role="Employee")
                aDatabase.query('select * from employee').then(
                    employeeRows =>{
                        allEmployeesReturned2 = employeeRows
                    }
                ).then(()=>{
                    //get roles
                    aDatabase.query('select * from role').then( roleRows =>{
                        allRolesReturned2 = roleRows
                        const choices = allEmployeesReturned2.map(object=> `${object.firstName},${object.lastName}`)
                        //choices.unshift("N/A")
                        //const ManagerQuestionLst = new QuestionList(name='firstNameLastName', message="Select the employee's Manager",type='list', choices)
                        const choicesRole = allRolesReturned2.map(object=> object.title)
                        const roleQuestionLst = new QuestionList(name='title', message="Select the employee's role",type='list', choicesRole)
                        const employeeQuestionLst = new QuestionList(name='firstNameLastName', message="Select the employee's to update",type='list', choices)
                        aEmployeeQuest2.questions = []
                        aEmployeeQuest2.questions.push(employeeQuestionLst)
                        aEmployeeQuest2.questions.push(roleQuestionLst)
                        //console.table("allRolesReturned2", allRolesReturned2)
                        //console.table("allEmployeesReturned2", allEmployeesReturned2)
                        pushData(aEmployeeQuest2,"Update Role", [allRolesReturned2,allEmployeesReturned2])

                    })
                })

                break;
            case"View Department Budget":
                let departmentTotals;
                aDatabase.query(sqlSumSalaryByDept).then(
                    rows =>{
                        departmentTotals = rows
                    }
                ).then(()=>{
                    console.table(departmentTotals)
                    promptMainMenu()
                })
                break;
            case"View Employees by Department":
                let employeeByDept;
                aDatabase.query(sqlEmployeeByDept).then(
                    rows =>{
                        employeeByDept = rows
                    }
                ).then(()=>{
                    console.table(employeeByDept)
                    promptMainMenu()
                })
                break;
            case"View Employees by Manager":
                let employeeByMang;
                aDatabase.query(sqlEmployeeByMang).then(
                    rows =>{
                        employeeByMang = rows
                    }
                ).then(()=>{
                    console.table(employeeByMang)
                    promptMainMenu()
                })
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




