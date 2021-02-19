function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}
function generateWaveString(coord, index, x, rtl, width, bumps) {
  let string = ''
  let pointString = `C`

  coord.map((point, i) => {
    let comma = index == 2 && i == 2 ? '' : ','
    let xx = rtl ? (index * 3 + i + 1) * x : width - (index * 3 + i + 1) * x

    pointString += `${xx},${point}${comma}`
  })
  string += pointString

  return string
}
function generateYCoords(bumps, orientation, height, orient) {
  let topCoords = []
  let bottomCoords = []
  let lastPoints = []
  let lastAntiPoints = []

  for (let i = 1; i <= bumps; i++) {
    let howFar = i / bumps
    let group = []
    let antiGroup = []

    for (let x = 1; x <= 3; x++) {
      let point
      let antiPoint
      if (orientation != 'middle-2') {
        point = getRandomInt(height * 0.1, height * 0.75)
        antiPoint = orient
      } else {
        point = getRandomInt(height * 0.55, height * 0.95)
        antiPoint = getRandomInt(0, height * 0.45)
      }
      if (x === 1 && i !== 1) {
        point = lastPoints[1] - lastPoints[0] + lastPoints[1]
        antiPoint = lastAntiPoints[1] - lastAntiPoints[0] + lastAntiPoints[1]
        lastPoints = []
        lastAntiPoints = []
      }
      if (x === 2 || x === 3) {
        lastPoints.push(point)
        lastAntiPoints.push(antiPoint)
      }

      group.push(point)
      antiGroup.push(antiPoint)
    }

    topCoords.push(group)
    bottomCoords.push(antiGroup)
    group = []
    antiGroup = []
  }
  return [topCoords, bottomCoords]
}
export function generateWaves(
  bumps = 3,
  orientation,
  width = 1600,
  height = 800,
  left,
  right
) {
  let orient = 0
  let x = Math.ceil(width / (bumps * 3))

  switch (orientation) {
    case 'top':
      orient = 0
      break
    case 'middle-1' || 'middle-2':
      orient = height / 2
      break
    case 'bottom':
      orient = height
      break
  }

  const [topCoords, bottomCoords] = generateYCoords(
    bumps,
    orientation,
    height,
    orient
  )

  let startInt =
    orientation != 'middle-2'
      ? getRandomInt(0, height * 0.75)
      : getRandomInt(height / 2, height * 0.95)

  let string = `M0,${startInt}`

  topCoords.map((coord, index) => {
    string += generateWaveString(coord, index, x, true, width, bumps)
  })
  for (let f = 0; f < 6 - bumps; f++) {
    string += `C${width}, ${orient},${width}, ${orient},${width}, ${orient}`
  }

  let startInt2 =
    orientation != 'middle-2' ? orient : getRandomInt(height * 0.05, height / 2)

  string += `L${width},${startInt2}`

  bottomCoords.map((coord, index) => {
    string += generateWaveString(coord, index, x, false, width, bumps)
  })

  for (let f = 0; f < 6 - bumps; f++) {
    string += `C${0}, ${orient},${0}, ${orient},${0}, ${orient}`
  }

  string += `L${1440 - (15 - bumps) * 3},${orient}L0,${orient}Z`

  return string
}
