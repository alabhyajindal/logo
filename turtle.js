const container = document.querySelector('svg')

class Turtle {
  constructor(x, y, direction) {
    this.center = { x, y }
    this.x = x
    this.y = y
    this.direction = direction
    this.pen = true
    this.color = '#000000'
    this.element = null
  }

  init() {
    container.innerHTML = ''
    const turtleElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    )
    turtleElement.innerHTML = `
      <path d="M 0 0 l 10 10 l -10 -25 l -10 25 z" fill="red" stroke="black"></path>
    `
    turtleElement.setAttribute(
      'transform',
      `translate(${this.x}, ${this.y}) rotate(${this.direction})`
    )
    container.appendChild(turtleElement)
    this.element = turtleElement
  }

  fd(steps) {
    if (!steps) return

    const radians = (this.direction / 180) * Math.PI
    const x = steps * 1 * Math.sin(radians)
    const y = steps * -1 * Math.cos(radians)
    this.x += x
    this.y += y
    this.element.setAttribute(
      'transform',
      `translate(${this.x}, ${this.y}) rotate(${this.direction})`
    )
    if (this.pen) {
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      path.setAttribute('d', `M ${this.x - x} ${this.y - y} l ${x} ${y}`)
      path.setAttribute('stroke', this.color)
      path.setAttribute('fill', 'none')
      container.appendChild(path)
    }
  }

  rt(degrees) {
    if (!degrees) return

    this.direction += degrees
    this.element.setAttribute(
      'transform',
      `translate(${this.x}, ${this.y}) rotate(${this.direction})`
    )
  }

  ct() {
    this.x = this.center.x
    this.y = this.center.y
    this.element.setAttribute(
      'transform',
      `translate(${this.x}, ${this.y}) rotate(${this.direction})`
    )
  }

  ht() {
    this.element.style.visibility = 'hidden'
  }

  st() {
    this.element.style.visibility = 'visible'
  }
}
