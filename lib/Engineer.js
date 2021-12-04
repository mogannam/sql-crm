
const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name,id, email, role='Engineer', github='') {
    //call the parent constructor
    // set the initial values from within parent constructor Employee
    super(name,id, email, role);
    //set the additional values in child constructor
    this.github = github;
    this.role = role;

    
  }

  getRole(){
    // passed test
    super.getRole()
    return 'Engineer'
}

  getGithub(){
      return this.github;
  }
 
  getInfo(){
    return{
      name:this.getName(),
      id:this.getId() ,
      email:this.getEmail(),
      role:this.getRole(),
      github:this.getGithub(),
    }
  }
  

 
}

module.exports = Engineer;
