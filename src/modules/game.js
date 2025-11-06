import loadQuestions from './question';

class Game extends EventTarget {

    constructor(){
        super()

        this.questions =  loadQuestions();
    }


}