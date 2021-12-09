const Question = require('./Question');

class EmployeeQuestions {
    constructor(role='Employee',questions=[]) {
        this.role = role
        this.questions = [
            new Question(`firstName`, `What is the employee's first name `,'input'),
            new Question(`lastName`, `What is the employee's last name`,'input'),
           
        ];
    }
    
    getQuestions(){
       return this.questions
    }

    getInquirerQuestions(){
        const arrQuestions = []
        //aQuestion => arrQuestions.push(aQuestion.getQuestion())
        this.questions.forEach(async function(aQuestion){
            await arrQuestions.push(aQuestion.getQuestion())
        })
        return arrQuestions
    }

  
  }
  
  module.exports = EmployeeQuestions;

//   getInquirerQuestions(){
//     return this.questions[0].getQuestion()
// }

//   getQuestions(){
//     return this.questions
//  }

//   getQuestions(){
//     const arrQuestions = []
//     this.questions.forEach(async function(aQuestion){
//         await arrQuestions.push(aQuestion)
//     })
//     return arrQuestions;
    
// }