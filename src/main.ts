let turtle
let currentDirection = 0
let degrees = 0
let steps = 0
let centerX = 200
let centerY = 200
let currentX = centerX
let currentY = centerY
let pencolour = 'black'
let drawing = true

const container = document.querySelector('#container')
const inputElement = document.querySelector('input')
const errorElement = document.getElementById('error')
const form = document.querySelector('form')

init()

function init() {
  const turtleElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'g'
  )
  turtleElement.innerHTML = `
    <path d="M 0 0 l 10 10 l -10 -25 l -10 25 z" fill="red" stroke="black"></path>
  `
  turtleElement.setAttribute('transform', `translate(${centerX}, ${centerY})`)
  container.appendChild(turtleElement)
  turtle = turtleElement
}

// Defines a function to process the command entered by the user
function processCommand() {
  // Trim spaces and convert input to lowercase for uniform processing
  let cmd = inputElement.value.trim().toLowerCase()

  // Clears the input field and focuses it for the next command
  inputElement.value = ''
  inputElement.focus()

  // Counts how many times 'repeat' appears in the command
  const number_of_repeats = cmd.split('repeat').length - 1
  // Checks if 'repeat' is used more than once, which is not allowed
  if (number_of_repeats > 1) {
    displayError('Syntax Error: Only one repeat allowed per command')
  } else if (number_of_repeats === 0) {
    // If 'repeat' is not used, process the command directly
    parseCommand(cmd)
  } else {
    // Handles processing of commands with one 'repeat' keyword
    const startofrepeat = cmd.indexOf('repeat')
    const endofnumber = cmd.indexOf('[')
    // Extracts and converts the repeat count to an integer
    const repeatCount = parseInt(cmd.substring(startofrepeat + 6, endofnumber))

    let temp = cmd
    // Constructs the command by repeating the specified segment
    cmd = temp.substring(0, startofrepeat)
    for (let i = 1; i <= repeatCount; i++) {
      cmd += temp.substring(temp.indexOf('[') + 1, temp.indexOf(']')) + ' '
      // console.log('constructing:', cmd)
    }
    // Appends the remaining part of the command after the repeat block
    cmd += temp.substring(temp.indexOf(']') + 1, temp.length)
    // Sends the constructed command for further parseCommand
    parseCommand(cmd)
  }
}

// Function to break down the command into individual actions
function parseCommand(cmd) {
  console.log(cmd)

  const parts = cmd.split(' ')
  const commandPairs = []

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      const cmd = parts[i]
      const param = parts[i + 1] ? parseInt(parts[i + 1], 10) : null
      commandPairs.push([cmd, param])
    }
  }

  console.log(commandPairs)

  for (const [cmd, param] of commandPairs) {
    executeCommand(cmd, param)
  }
}

// Executes the specific command based on the input
function executeCommand(cmd, param) {
  // If the command string is empty, do nothing
  if (!cmd) return

  console.log(cmd, param)

  // Hides any error message that might be visible
  hideError()

  switch (cmd) {
    case 'rt':
    case 'lt':
      // Converts left turns to negative degrees for standardization
      const degrees = cmd === 'lt' ? -param : param
      rt(degrees)
      break
    case 'fd':
    case 'bk':
      // Converts backward moves to negative steps
      const steps = cmd === 'bk' ? -param : param
      fd(steps)
      break
    case 'pc':
      // Changes the pen color based on the provided color number
      pc(param)
      break
    case 'ct':
      // Clears the turtle (cursor or drawing point)
      ct()
      break
    case 'cs':
      // Clears the screen or drawing area
      cs()
      break
    case 'pu':
      // Lifts the pen to stop drawing
      drawing = false
      break
    case 'pd':
      // Puts the pen down to start drawing
      drawing = true
      break
    default:
      // Shows an error if an unrecognized command is entered
      displayError(`Invalid command: ${cmd}`)
      break
  }
}

function rt(degrees) {
  currentDirection += degrees
  turtle.setAttribute(
    'transform',
    `translate(${currentX}, ${currentY}) rotate(${currentDirection})`
  )
}

function fd(steps) {
  const radians = (currentDirection / 180) * Math.PI
  const x = steps * 10 * Math.sin(radians)
  const y = steps * -10 * Math.cos(radians)
  currentX += x
  currentY += y
  turtle.setAttribute(
    'transform',
    `translate(${currentX}, ${currentY}) rotate(${currentDirection})`
  )
  if (drawing) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', `M ${currentX - x} ${currentY - y} l ${x} ${y}`)
    path.setAttribute('stroke', pencolour)
    path.setAttribute('fill', 'none')
    container.appendChild(path)
  }
}

function ct() {
  const Xmove = centerX - currentX
  const Ymove = centerY - currentY
  turtle.setAttribute(
    'transform',
    `translate(${centerX}, ${centerY}) rotate(0)`
  )
  currentX = centerX
  currentY = centerY
  currentDirection = 0
}

function cs() {
  container.innerHTML = ''
  init()
}

function pc(pencolourNumber) {
  const brightColors = [
    'red',
    'green',
    'yellow',
    'lime',
    'orange',
    'fuchsia',
    'aqua'
  ]
  // Using the modulus operator to cycle through the brightColors array
  pencolour = brightColors[pencolourNumber % brightColors.length]
}

function displayError(message) {
  errorElement.textContent = message
  errorElement.classList.remove('hidden')
}

function hideError() {
  errorElement.classList.add('hidden')
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  processCommand()
})
