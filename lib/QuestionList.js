// {"varName": "str_gitUserName", "question":"Enter GitHub username? ","type": "input"},
// {"varName":"str_license", "question":"Enter a License ","type": "list", choices: ['Apache', 'BSD', 'GNU', 'MIT']},
const Question = require('./Question');

class QuestionList extends Question {
    constructor(name, message,type, choices) {
        super(name, message,type)
        this.choices = choices;
    }
    getChoices(){
        return this.choices;
    }
    
    
    getQuestion(){
        super.getQuestion()
        return{
            name:this.getName(),
            message:this.getSingleMessage(),
            type:this.getType(),
            choices:this.getChoices()
        }
    }
  
  }
  
  module.exports = QuestionList;
  