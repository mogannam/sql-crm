// {"varName": "str_gitUserName", "question":"Enter GitHub username? ","type": "input"},
// {"varName":"str_license", "question":"Enter a License ","type": "list", choices: ['Apache', 'BSD', 'GNU', 'MIT']},
const inquirer = require("inquirer");



class Question {
    constructor(name = '', message='',type='') {
      this.name = name;
      this.message = message;
      this.type = type;
    }
    getName(){
      
      return this.name
    }
    getSingleMessage(){
      
      return this.message
    }
    getType(){
      
      return this.type
    }
    
    getQuestion(){
      return{
        name:this.getName(),
        message:this.getSingleMessage(),
        type:this.getType()
      }
    }

    stringIfyQuestion(){
        return JSON.stringify(this.getQuestion())
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

  //    promptQuestions (functionDoSomething) {
  //     //todo: switch case to fine tune user choice
     
  //     inquirer.prompt(this.getInquirerQuestions()).then( answers =>{
  //         console.table(answers)
  //         return functionDoSomething(answers); 
  //     })
  // }
  
  
    
  }
  
  module.exports = Question;
  