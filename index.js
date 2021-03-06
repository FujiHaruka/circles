/*
cood: {
  x: 0,
  y: 0
}

circle: {
  radius: 10,
  center: cood
}

*/

window.onload = function () {
  drawCircles(10)
}

function onClickRender () {
  let select = document.getElementById('select')
  let value = select.value
  drawCircles(Number(value))
}

function onClickDownload () {
  let canvas = document.getElementById('canvas')
  let dataUrl = canvas.toDataURL('image/jpeg')
  if (!dataUrl.startsWith('data:image/jpeg')) {
    console.error('not jpeg!')
  }

  let link = document.createElement('a')
  link.href = dataUrl
  link.download = 'hoge.jpg'
  link.click()
}

function drawCircles (number) {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  let width = 400
  let height = 300
  let maxRadius = 50
  let minRadius = 10
  let circles = makeCircles(number, width, height, maxRadius, minRadius)

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)

  for (let i = 0; i < circles.length; i++) {
    draw(ctx, circles[i])
  }
}

function draw (ctx, circle) {
  ctx.beginPath()
  ctx.arc(circle.cood.x, circle.cood.y, circle.radius, 0, Math.PI * 2, false)
  ctx.fillStyle = circle.color
  ctx.fill()
}

function distance (cood1, cood2) {
  let dx = cood1.x - cood2.x
  let dy = cood1.y - cood2.y
  return Math.sqrt(dx * dx + dy * dy)
}

function hasIntersect (circle1, circle2) {
  let centerDistance = distance(circle1.cood, circle2.cood)
  return circle1.radius + circle2.radius > centerDistance
}

function random (lower, upper) {
  return Math.random() * (upper - lower) + lower
}

function randomCircle (width, height, maxRadius, minRadius) {
  let x = random(maxRadius, width - maxRadius)
  let y = random(maxRadius, height - maxRadius)
  let radius = random(minRadius, maxRadius)
  let color = 'hsl(' + random(0, 360) + ', ' + random(40, 60) + '%, ' + random(30, 70) + '%)'
  return {
    radius,
    color,
    cood: {
      x, y
    },
  }
}

function makeCircles (number, width, height, maxRadius, minRadius) {
  let circles = []
  while (circles.length < number) {
    let circle = randomCircle(width, height, maxRadius, minRadius)
    let ok = true
    for (let j = 0; j < circles.length; j++) {
      if (hasIntersect(circles[j], circle)) {
        ok = false
        break
      }
    }
    if (ok) {
      circles.push(circle)
    }
  }
  return circles
}
