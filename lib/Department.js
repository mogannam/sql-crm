
class Department {
    constructor(name = '',id = -1) {
      //passed test
      this.name = name;
      this.id = id;
    }
    getName(){
      //passed test
      return this.name
    }
    getId(){
      //passed test
      return this.id
    }
    
    getInfo(){
      //passed test
      return{
        name:this.getName(),
        id:this.getId()
      }
    
    }
    
  }

  // function queryDepartments(){
  //   const allDepartments = [];
  //   let aDepartment = new Department('null', -1)
  //   allDepartments.push(aDepartment)

  //   const getNotes = () => {

  //   fetch('/api/department', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }).then(response => {
  //       if (!response.ok) {
  //         return alert('Error: ' + response.statusText);
  //       }
  //       return response.json();
  //     })
  //   }

  // }
  
  module.exports = Department;
  