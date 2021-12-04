const Question = require('./Question');
const EmployeeQuestions = require('./EmployeeQuestions');

class EngineerQuestions extends EmployeeQuestions {
    constructor(role,questions) {
        super(role,questions);
        this.questions.push(new Question(`github`, `What is the ${this.role}'s github account? `,'input'))  
    }  
    
  }
  
  module.exports = EngineerQuestions;

  