

// export 



const questionUI = document.getElementById('card');

const questions = [ {
    id:

}];

question[i]

function checkAnswer(id)){
const currentQuestion = questions.find(question => question.id === id)

}


async function getData() {
    const url = 'https://quizapi.io/api/v1/questions/'
    const triviaUrl = 'https://opentdb.com/api.php?amount=10&type=boolean';

    try {
        // const response = await fetch(triviaUrl, {
        //     method: 'GET',
        //     // headers: {
        //     //     'Content-Type': 'application/json',
        //     //     'X-Api-Key': 'HD7W5VfeylXdC7VYmFYPvVRJxj9IIPoI8yXAYlMm'
        //     // }
        // });
        const response = await fetch(triviaUrl);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }


        const result = await response.json();


        result.results.forEach(item => {
            questions.push(item);
            card.appendChild(createQuestionEl(item.question));
        })
        

    } catch (error) {
        console.error(error.message);
    }
}


function createQuestionEl(content){
    const p = document.createElement('p');
    p.textContent = content;
    p.style.marginBlockEnd = '.5rem';

    return p;
}


fetch(() => 1 + 2);


document.addEventListener('click', (e) => {
    e.preventDefault

    const question = e.target.getAttribute(question.id)

    question.checkAnswer(id)

    if j

})
const render = function(){

}

