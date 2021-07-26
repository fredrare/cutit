#!/usr/bin/env node
const Calipers = require('calipers')('gif', 'jpeg', 'png')
const canvas = require('canvas')
const imageToSlices = require('image-to-slices')

// Command-line args parser
const yargs = require('yargs')
  .version('1.0.0')
  .command({
    command: 'homocut',
    describe: "Split image into equally sized chunks. If the image is not divisible by your specs, it will do it's best",
    builder: {
      i: {
        aliases: ['in', 'input'],
        describe: 'Input image',
        demandOption: true,
        type: 'string'
      },
      o: {
        aliases: ['out', 'outputdir'],
        describe: 'Directory inside of which the result images will be saved (it must exist)',
        default: '.',
        type: 'string'
      },
      x: {
        describe: 'Ammount of vertical cuts to be made',
        default: 0,
        type: 'number'
      },
      y: {
        describe: 'Ammount of horizontal cuts to be made',
        default: 0,
        type: 'number'
      }
    },
    handler(argv) {
      // cut(argv.i, argv.x, argv.y, argv.d)
      cut(argv.i, argv.x, argv.y, argv.o)
    }
  })
  .argv

// Configuration for imageToSlices
imageToSlices.configure({
  clipperOptions: {
    canvas: canvas
  }
})

async function cut(origin, chunksX, chunksY, destination) {
  const { pages : [ { width, height } ] } = await Calipers.measure(origin)
  const w = parseInt(width / (chunksX + 1))
  const h = parseInt(height / (chunksY + 1))
  const lineXArray = [...Array(Number(chunksX) + 2)].map((_, x) => x * w)
  const lineYArray = [...Array(Number(chunksY) + 2)].map((_, y) => y * h)
  lineXArray.shift()
  lineXArray.pop()
  lineYArray.shift()
  lineYArray.pop()
  imageToSlices(origin, lineYArray, lineXArray, {
    saveToDir: destination
  }, () => console.log(`Image sliced into ${(chunksX + 1) * (chunksY + 1)} sections.`))
}

// cut(yargs.i, yargs.x, yargs.y, yargs.o)

