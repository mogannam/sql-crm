const Question = require('./Question');
const QuestionList = require('./QuestionList');

class RoleQuestions extends Question {
    constructor(name, message, type, questions=[]) {
        super(name, message,type)
        
        this.questions = [
            new Question(name=`title`, message='Enter the new role name'),
            new Question(name=`salary`, message='Enter a salary'),
            
           
        ];
    }
    
    getQuestions(){
       return this.questions
    }

    getInquirerQuestions(){
        const arrQuestions = []
        //aQuestion => arrQuestions.push(aQuestion.getQuestion())
        //console.log(`this.questions: ${JSON.stringify(this.questions)}`)
        this.questions.forEach(async function(aQuestion){
            await arrQuestions.push(aQuestion.getQuestion())
        })
        return arrQuestions
    }

  
  }
  
  module.exports = RoleQuestions;