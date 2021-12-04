const Choice = require('inquirer/lib/objects/choice');

class Employee {
    constructor(name = '',id = -1, email='',role='Employee', questions=[]) {
      //passed test
      this.name = name;
      this.id = id;
      this.email = email;
      this.role = 'Employee';
      
    }
    getName(){
      //passed test
      return this.name
    }
    getId(){
      //passed test
      return this.id
    }
    getEmail(){
      //passed test
      return this.email
    }
    getRole(){
      //passed test
      return 'Employee'
    }
    

    getInfo(){
      //passed test
      return{
        name:this.getName(),
        id:this.getId() ,
        email:this.getEmail(),
        role:this.getRole(),
        
      }
    }
  
    
  }
  
  module.exports = Employee;
  