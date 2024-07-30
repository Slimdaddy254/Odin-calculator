// Calculator class to handle all calculator functionalities
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Clear all data
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Delete the last entered character
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // Append a number or decimal point to the current operand
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Choose an operation (+, -, *, ÷)
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Compute the result based on the chosen operation
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                if (current === 0) {
                    alert("Error: Division by zero is not allowed.")
                    this.clear()
                    return
                }
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // Format the display number with commas
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    // Update the display
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// Query selectors for all the calculator buttons and display elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// Instantiate the Calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Add event listeners for number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Add event listeners for operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Add event listener for equals button
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// Add event listener for all clear button
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// Add event listener for delete button
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
    if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        calculator.chooseOperation(event.key === '/' ? '÷' : event.key)
        calculator.updateDisplay()
    }
    if (event.key === 'Enter') {
        calculator.compute()
        calculator.updateDisplay()
    }
    if (event.key === 'Backspace') {
        calculator.delete()
        calculator.updateDisplay()
    }
    if (event.key === 'Escape') {
        calculator.clear()
        calculator.updateDisplay()
    }
})