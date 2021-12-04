const Question = require('./Question');
const EmployeeQuestions = require('./EmployeeQuestions');

class InternQuestions extends EmployeeQuestions {
    constructor(role,questions) {
        super(role,questions);
        this.questions.push(new Question(`school`, `What is the ${this.role}'s school name? `,'input'))  
    }  
    
  }
  
  module.exports = InternQuestions;

  