const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');

const openParenButton = document.getElementById('open--paren');
const closeParenButton = document.getElementById('close--paren');

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');

const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');
const squareButton = document.getElementById('square');
const sqrtButton = document.getElementById('sqrt');

let currentExpression = '';
let resultDisplayed = false;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplayed) {
            currentExpression = '';
            resultDisplayed = false;
        }
        currentExpression += button.textContent;
        updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplayed) {
            resultDisplayed = false;
        }
        currentExpression += button.textContent;
        updateDisplay();
    });
});

clearButton.addEventListener('click', () => {
    currentExpression = '';
    resultDisplayed = false;
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
});

equalButton.addEventListener('click', () => {
    evaluateExpression();
});

dotButton.addEventListener('click', () => {
    if (!currentExpression.includes('.')) {
        currentExpression += '.';
        updateDisplay();
    }
});

squareButton.addEventListener('click', () => {
    if (resultDisplayed || currentExpression === '') {
        resultDisplayed = false;
    } else {
        currentExpression += '**2';
    }
    updateDisplay();
});

sqrtButton.addEventListener('click', () => {
    if (!resultDisplayed) {
        currentExpression += '**0.5';
        updateDisplay();
    }
});


openParenButton.addEventListener('click', () => {
    if (resultDisplayed || currentExpression === '') {
        resultDisplayed = false;
    } else {
        const lastChar = currentExpression.slice(-1);
        // If the last character is a number or dot, add a multiplication operator before the open parenthesis
        if (!isNaN(lastChar) || lastChar === '.') {
            currentExpression += '*(';
        } else if (lastChar !== '(') {
            currentExpression += '(';
        }
    }
    updateDisplay();
});

closeParenButton.addEventListener('click', () => {
    console.log("Close parenthesis button clicked");
    if (resultDisplayed) {
        resultDisplayed = false;
    } else {
        const lastChar = currentExpression.slice(-1);
        // Check if the last character is a number or open parenthesis
        if (!isNaN(lastChar) || lastChar === '(') {
            currentExpression += ')'; // Add a close parenthesis
        }
    }
    updateDisplay();
});



function evaluateExpression() {
    try {
        // Handle implicit multiplication for parentheses
        currentExpression = currentExpression.replace(/\(/g, '*( ').replace(/\)/g, ' )');
        
        // Evaluate the expression if it's not empty
        if (currentExpression !== '') {
            const result = eval(currentExpression);
            const displayResult = result !== undefined ? `${result}` : '';
            currentExpression = displayResult;
            resultDisplayed = true;
            updateDisplay();
        }
    } catch (error) {
        currentExpression = '';
        resultDisplayed = false;
        updateDisplay();
        console.error('Invalid expression:', error);
    }
}


function updateDisplay() {
    console.log("Updating display with expression:", currentExpression);
    
    let expressionToDisplay = currentExpression;
    expressionToDisplay = expressionToDisplay.replace(/\*\*2/g, '<sup>2</sup>'); // Replace **2 with superscript 2
    expressionToDisplay = expressionToDisplay.replace(/√/g, '**0.5'); // Replace √ with **0.5
    displayCurrent.innerHTML = expressionToDisplay;
}