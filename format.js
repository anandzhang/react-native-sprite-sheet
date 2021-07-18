#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const params = process.argv.slice(2)
const filePath = params[0]

if (typeof filePath === 'undefined') {
    console.log('Missing file')
    process.exit()
}

const fileExtname = path.extname(filePath)
if (fileExtname !== '.json') {
    console.log('The file format is not json.')
    process.exit()
}

const removeFileExtname = (filename) => {
    const extname = path.extname(filename)
    return filename.replace(extname, '')
}

const simplifyFrames = (frames) => frames.reduce((pre, cur) => {
    const { filename, frame } = cur
    const name = removeFileExtname(filename)
    pre[name] = {
        x: frame.x,
        y: frame.y,
        width: frame.w,
        height: frame.h,
    }
    return pre
}, {})

const absolutePath = path.resolve(process.cwd(), filePath)
try {
    const fileString = fs.readFileSync(absolutePath).toString()
    const { meta: { size }, frames } = JSON.parse(fileString)
    const simplifiedFrames = simplifyFrames(frames)
    const formatted = JSON.stringify({
        size: { width: size.w, height: size.h },
        frames: simplifiedFrames
    })
    fs.writeFileSync(absolutePath, formatted)
} catch (error) {
    if (error.code === 'ENOENT') {
        console.log(`${filePath} may not exist.`)
        return
    }
    console.log(error.message)
}
