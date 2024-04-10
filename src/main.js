let paper
let turtle
let current_direction = 0
let degrees = 0
let steps = 0
let centerX = 200
let centerY = 200
let currentX = centerX
let currentY = centerY
let pencolour = 'black'
let LastCommand = ''
let drawing = true
let NumberofCommands = 1
let CmdHistory = []

init()

function init() {
  const container = document.getElementById('container')
  paper = Raphael(container, 400, 400)
  drawturtle()
}

function drawturtle() {
  turtle = paper.path(
    'M ' + centerX + ' ' + centerY + ' l 10 10 l -10 -25 l -10 25 z'
  )
  turtle.attr({ gradient: '0-#fff-#f00-#fff', stroke: '#3b4449' })
}

function analyse() {
  const inputField = document.querySelector('input')
  let cmd = inputField.value.trim().toLowerCase()
  inputField.value = cmd

  CmdHistory[NumberofCommands] = cmd
  NumberofCommands++
  if (NumberofCommands === 30) {
    showError('Trophy Form is showing')
  }

  const number_of_repeats = cmd.split('repeat').length - 1
  if (number_of_repeats > 1) {
    showError("This version of Logo can only process one 'repeat' per line")
  } else if (number_of_repeats === 0) {
    breakdown(cmd)
  } else {
    const startofrepeat = cmd.indexOf('repeat')
    const endofnumber = cmd.indexOf('[')
    const numberpfrepeats = parseInt(
      cmd.substring(startofrepeat + 6, endofnumber)
    )

    let temp = cmd
    cmd = temp.substring(0, startofrepeat)
    for (let i = 1; i <= numberpfrepeats; i++) {
      cmd += temp.substring(temp.indexOf('[') + 1, temp.indexOf(']')) + ' '
    }
    cmd += temp.substring(temp.indexOf(']') + 1, temp.length)
    breakdown(cmd)
  }
}

function breakdown(cmd) {
  const number_of_spaces = cmd.split(' ').length - 1
  const number_of_commands = number_of_spaces + 1

  for (let i = 1; i <= number_of_commands; i++) {
    if (
      cmd.startsWith('ct') ||
      cmd.startsWith('cs') ||
      cmd.startsWith('pu') ||
      cmd.startsWith('pd')
    ) {
      command(cmd.substring(0, 2))
      cmd = cmd.substring(3).trim()
    } else {
      let firstSpace = cmd.indexOf(' ')
      let temp = cmd.substring(firstSpace + 1)
      let secondSpace = temp.indexOf(' ') + cmd.length - temp.length
      if (secondSpace < 3) {
        secondSpace = cmd.length
      }
      command(cmd.substring(0, secondSpace))
      cmd = cmd.substring(secondSpace).trim()
    }
  }
}

function command(cmd) {
  if ((cmd.startsWith('rt') || cmd.startsWith('lt')) && cmd[2] === ' ') {
    degrees = parseInt(cmd.substring(3))
    if (cmd.startsWith('lt')) {
      degrees *= -1
    }
    rt(degrees)
  } else if ((cmd.startsWith('fd') || cmd.startsWith('bk')) && cmd[2] === ' ') {
    steps = parseInt(cmd.substring(3))
    if (cmd.startsWith('bk')) {
      steps *= -1
    }
    fd(steps)
  } else if (cmd.startsWith('pc') && cmd[2] === ' ') {
    const pencolournumber = parseInt(cmd.substring(3))
    pc(pencolournumber)
  } else if (cmd === 'ct') {
    ct()
  } else if (cmd === 'cs') {
    cs()
  } else if (cmd === 'pu') {
    drawing = false
  } else if (cmd === 'pd') {
    drawing = true
  } else {
    showError(`Invalid command: ${cmd}`)
  }
  document.querySelector('input').value = ''
  document.querySelector('input').focus()
}

function rt(degrees) {
  current_direction += degrees
  turtle.transform(`...R${degrees}`)
}

function fd(steps) {
  const radians = (current_direction / 180) * Math.PI
  turtle.transform(
    `...T${steps * 10 * Math.sin(radians)},${steps * -10 * Math.cos(radians)}`
  )
  if (drawing) {
    const path = paper.path(
      `M ${currentX} ${currentY} l ${steps * 10 * Math.sin(radians)} ${steps * -10 * Math.cos(radians)}`
    )
    path.attr({ stroke: pencolour })
  }
  currentX += steps * 10 * Math.sin(radians)
  currentY -= steps * 10 * Math.cos(radians)
}

function ct() {
  const Xmove = centerX - currentX
  const Ymove = centerY - currentY
  turtle.transform(`...T${Xmove}, ${Ymove}R${360 - current_direction}`)

  currentX = centerX
  currentY = centerY
  current_direction = 0
}

function cs() {
  paper.clear()
  drawturtle()
  currentX = centerX
  currentY = centerY
  current_direction = 0
  drawing = true
  pencolour = 'black'
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

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault()
  analyse()
})
