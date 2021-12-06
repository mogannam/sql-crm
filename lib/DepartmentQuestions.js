const Question = require('./Question');

class DepartmentQuestions extends Question {
    constructor(name, message, type, questions=[]) {
        super(name, message,type)
        this.questions = [
            new Question(name=`name`, message='Enter a name for the new Department'),
           
        ];
    }
    
    getQuestions(){
       return this.questions
    }

    getInquirerQuestions(){
        const arrQuestions = []
        //aQuestion => arrQuestions.push(aQuestion.getQuestion())
        console.log(`this.questions: ${JSON.stringify(this.questions)}`)
        this.questions.forEach(async function(aQuestion){
            await arrQuestions.push(aQuestion.getQuestion())
        })
        return arrQuestions
    }

  
  }
  
  module.exports = DepartmentQuestions;