
const Employee = require('./Employee');

class Intern extends Employee {
  constructor(name,id, email, role='Intern', school="-1" ) {
    super(name,id, email, role);
    this.school = school;
    this.role = role;

  }

  getRole(){
    // passed test
    super.getRole()
    return 'Intern'
}

getSchool(){
    return this.school;
}

getInfo(){
// passed test
super.getInfo();
  return{
    name:this.getName(),
    id:this.getId() ,
    email:this.getEmail,
    role:this.getRole,
    school:this.getSchool()
  }
}

}

module.exports = Intern;
