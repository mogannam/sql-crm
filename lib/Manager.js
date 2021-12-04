
const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name,id, email, role='Manager', officeNumber=-1 ) {
    // Constructor pass test

    //call the parent constructor
    // set the initial values from within parent constructor Employee
    super(name,id, email, role);
    //set the additional values in child constructor
    this.officeNumber = officeNumber;
    this.role = role;
    
  }
  
  getRole(){
      // passed test
      super.getRole()
      return 'Manager'
  }
  getOfficeNumber(){
    // passed test
    return this.officeNumber
  }

  getInfo(){
    // passed test
    super.getInfo();
    return{
      name:this.getName(),
      id:this.getId() ,
      email:this.getEmail,
      role:this.getRole,
      officeNumber:this.getOfficeNumber()
    }
  }

}

module.exports = Manager;
