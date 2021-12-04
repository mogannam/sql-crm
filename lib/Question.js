// {"varName": "str_gitUserName", "question":"Enter GitHub username? ","type": "input"},
// {"varName":"str_license", "question":"Enter a License ","type": "list", choices: ['Apache', 'BSD', 'GNU', 'MIT']},

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
  
    
  }
  
  module.exports = Question;
  