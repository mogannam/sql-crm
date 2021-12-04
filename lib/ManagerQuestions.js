const Question = require('./Question');
const EmployeeQuestions = require('./EmployeeQuestions');

class ManagerQuestions extends EmployeeQuestions {
    constructor(role,questions) {
        super(role,questions);
        this.questions.push(new Question(`officeNumber`, `What is the ${this.role}'s office Number? `,'input'))  
    }

    
    
  }
  
  module.exports = ManagerQuestions;

  
//   getQuestions(){
//     super.getQuestions()
//     return this.questions.forEach(aQuestion=>console.log(aQuestion))
// }