#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const enviable = require('.')

const cwd = process.cwd()
const envPath = path.join(cwd, '.env')
const env = fs.readFileSync(envPath, 'utf8')
const tokens = enviable.getTokens(env)

const pattern = process.argv[2]
const files = glob.sync(pattern)

let changed = []

files.forEach(filepath => {
  const file = fs.readFileSync(filepath, 'utf8')
  const result = enviable.replace(file, tokens)
  if (file !== result) {
    changed.push(filepath)
    fs.writeFileSync(filepath, result)
  }
})

process.stdout.write(`changed ${changed.length} out of ${files.length} files`)
