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

const inputElement = document.querySelector('input')
const container = document.querySelector('#container')

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
function analyse() {
  // Trim spaces and convert input to lowercase for uniform processing
  let cmd = inputElement.value.trim().toLowerCase()

  // Clears the input field and focuses it for the next command
  inputElement.value = ''
  inputElement.focus()

  // Counts how many times 'repeat' appears in the command
  const number_of_repeats = cmd.split('repeat').length - 1
  // Checks if 'repeat' is used more than once, which is not allowed
  if (number_of_repeats > 1) {
    showError('Syntax Error: Only one repeat allowed per command')
  } else if (number_of_repeats === 0) {
    // If 'repeat' is not used, process the command directly
    breakdown(cmd)
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
    }
    // Appends the remaining part of the command after the repeat block
    cmd += temp.substring(temp.indexOf(']') + 1, temp.length)
    // Sends the constructed command for further breakdown
    breakdown(cmd)
  }
}

// Function to break down the command into individual actions
function breakdown(cmd) {
  // Determines the number of commands based on spaces
  const number_of_spaces = cmd.split(' ').length - 1
  const number_of_commands = number_of_spaces + 1

  // Iterates over each command to process it
  for (let i = 1; i <= number_of_commands; i++) {
    // Checks for commands that are exactly two characters long
    if (
      cmd.startsWith('ct') ||
      cmd.startsWith('cs') ||
      cmd.startsWith('pu') ||
      cmd.startsWith('pd')
    ) {
      // Processes two-character long commands
      command(cmd.substring(0, 2))
      // Trims the processed command from the input
      cmd = cmd.substring(3).trim()
    } else {
      // Handles longer commands with parameters
      let firstSpace = cmd.indexOf(' ')
      let temp = cmd.substring(firstSpace + 1)
      let secondSpace = temp.indexOf(' ') + cmd.length - temp.length
      // Adjusts for commands without a second parameter
      if (secondSpace < 3) {
        secondSpace = cmd.length
      }
      // Processes the command found
      command(cmd.substring(0, secondSpace))
      // Trims the processed command from the input
      cmd = cmd.substring(secondSpace).trim()
    }
  }
}

// Executes the specific command based on the input
function command(cmd) {
  // If the command string is empty, do nothing
  if (!cmd) return

  // Hides any error message that might be visible
  hideError()

  // Processes rotation or direction change commands
  if ((cmd.startsWith('rt') || cmd.startsWith('lt')) && cmd[2] === ' ') {
    degrees = parseInt(cmd.substring(3))
    // Converts left turns to negative degrees for standardization
    if (cmd.startsWith('lt')) {
      degrees *= -1
    }
    // Rotates the drawing cursor
    rt(degrees)
  } else if ((cmd.startsWith('fd') || cmd.startsWith('bk')) && cmd[2] === ' ') {
    steps = parseInt(cmd.substring(3))
    // Converts backward moves to negative steps
    if (cmd.startsWith('bk')) {
      steps *= -1
    }
    // Moves the drawing cursor forward or backward
    fd(steps)
  } else if (cmd.startsWith('pc') && cmd[2] === ' ') {
    // Changes the pen color based on the provided color number
    const pencolournumber = parseInt(cmd.substring(3))
    pc(pencolournumber)
  } else if (cmd === 'ct') {
    // Clears the turtle (cursor or drawing point)
    ct()
  } else if (cmd === 'cs') {
    // Clears the screen or drawing area
    cs()
  } else if (cmd === 'pu') {
    // Lifts the pen to stop drawing
    drawing = false
  } else if (cmd === 'pd') {
    // Puts the pen down to start drawing
    drawing = true
  } else {
    // Shows an error if an unrecognized command is entered
    showError(`Invalid command: ${cmd}`)
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
    document.getElementById('container').appendChild(path)
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

function pc(pencolournumber) {
  pencolour = getColourFromNumber(pencolournumber)
}

function getColourFromNumber(pencolournumber) {
  const colours = [
    'black',
    'blue',
    'red',
    'green',
    'yellow',
    'purple',
    'lime',
    'silver',
    'orange',
    'brown',
    'navy',
    'maroon',
    'aqua',
    'fuchsia',
    'teal',
    'white'
  ]
  return colours[pencolournumber % 16]
}

function showError(message) {
  const errorElement = document.getElementById('error')
  errorElement.textContent = message
  errorElement.classList.remove('hidden')
}

function hideError(message) {
  const errorElement = document.getElementById('error')
  errorElement.classList.add('hidden')
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  analyse()
})
