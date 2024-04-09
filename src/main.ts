const svg = document.querySelector('#svg')!
const input = document.querySelector('input')!
const button = document.querySelector('button')!
const form = document.querySelector('form')!
const errorElement = document.querySelector('#error')!

function isValidCommand(cmd: string) {
  const validCommands = ['rt']
  if (validCommands.includes(cmd)) return true
  return false
}

function validateRotateArgument(arg: string, deg: number) {
  let message
  if (isNaN(deg)) message = `Invalid argument: ${arg}.`
  if (deg < -360) {
    message = `Invalid argument: Rotation degree should be greater than or equal to -360.`
  }
  if (deg > 360) {
    message =
      'Invalid argument: Rotation degree should be less than or equal to 360.'
  }
  if (message) showError(message)
  else hideError()
}

function showError(message: string) {
  errorElement.classList.remove('hidden')
  errorElement.classList.add('block')
  errorElement.innerHTML = message

  throw new Error(message)
}

function hideError() {
  errorElement.classList.remove('block')
  errorElement.classList.add('hidden')
}

function drawCursor(x: number, y: number) {
  const originPoint = `${x},${y}`
  const leftPoint = `${x - 10},${y + 10}`
  const tipPoint = `${x},${y - 15}`
  const rightPoint = `${x + 10},${y + 10}`

  const cursor = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  cursor.setAttribute(
    'd',
    `M${originPoint} L${leftPoint} L${tipPoint} L${rightPoint} L${originPoint}`
  )
  cursor.setAttribute('stroke', 'black')
  cursor.setAttribute('fill', 'red')
  cursor.setAttribute('transform', `rotate(0)`)
  cursor.id = 'cursor'
  svg.appendChild(cursor)
}

function getCursorMidpoints(): { x: number; y: number } {
  const cursor = document.querySelector('#cursor')!
  const d = cursor.getAttribute('d')!.split(' ')

  const numbers = d
    .join(' ')
    .match(/-?\d+/g)
    ?.map((n) => Number(n))

  if (!numbers) throw new Error('Something went wrong')

  const leftSum = numbers[2] + numbers[3]
  const rightSum = numbers[6] + numbers[7]

  const x = leftSum / 2
  const y = rightSum / 2
  return { x, y }
}

function rt(deg: number) {
  const cursor = document.querySelector('#cursor')!
  const rotation = cursor.getAttribute('transform')?.match(/-?\d+/g)
  if (!rotation) return
  const currentDeg = Number(rotation[0])
  const newDeg = (currentDeg + deg) % 360
  const { x, y } = getCursorMidpoints()
  cursor.setAttribute('transform', `rotate(${newDeg} ${x} ${y})`)
}

function execute(e: SubmitEvent) {
  e.preventDefault()

  const cmd = input.value.split(' ')[0]
  const arg = input.value.split(' ')[1]
  input.value = ''

  if (!isValidCommand(cmd)) showError(`Invalid command: ${cmd}.`)
  if (!arg) showError(`Missing argument.`)

  switch (cmd) {
    case 'rt':
      const deg = Number(arg)
      validateRotateArgument(arg, deg)
      rt(deg)
      break
  }
}

drawCursor(200, 200)
rt(45)

form.addEventListener('submit', execute)
