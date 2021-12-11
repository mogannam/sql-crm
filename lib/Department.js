
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

  

  
  module.exports = Department;
  