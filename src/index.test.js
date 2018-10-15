import * as app from '.'

describe('finding tokens in source', () => {
  it('should replace these', () => {
    const input = 'const bongo = "yeah" // #BONGO'
    const output = 'const bongo = "nah" // #BONGO'
    const tokens = {
      BONGO: '"nah"',
    }
    const result = app.replace(input, tokens)
    expect(result).toBe(output)
  })

  it('should work for assignment in objects', () => {
    const input = 'const cat = {\n  bongo: "yeah", // #BONGO\n  dango: 33, // #DANGO\n}'
    const output = 'const cat = {\n  bongo: "maybe", // #BONGO\n  dango: 44, // #DANGO\n}'
    const tokens = {
      BONGO: '"maybe"',
      DANGO: 44,
    }
    const result = app.replace(input, tokens)
    expect(result).toBe(output)
  })

  it('should replace multiple instances', () => {
    const input = 'const bongo = "hard" // #BONGO\nconst superBongo = "hard" // #BONGO'
    const output = 'const bongo = "soft" // #BONGO\nconst superBongo = "soft" // #BONGO'
    const tokens = {
      BONGO: '"soft"',
    }
    const result = app.replace(input, tokens)
    expect(result).toBe(output)
  })

  it('should replace non-strings', () => {
    const input = 'const badassLevel = 99 // #BAD_ASS'
    const output = 'const badassLevel = 100 // #BAD_ASS'
    const tokens = {
      BAD_ASS: 100,
    }
    const result = app.replace(input, tokens)
    expect(result).toBe(output)
  })

  it('should not worry about trailing ;', () => {
    const input = 'const corn = true; // #CORN'
    const output = 'const corn = false; // #CORN'
    const tokens = {
      CORN: false,
    }
    const result = app.replace(input, tokens)
    expect(result).toBe(output)
  })
})

describe('building token map', () => {
  it('should find this', () => {
    const input = 'FOO=banana'
    const result = app.getTokens(input)
    expect(result).toEqual({
      FOO: 'banana',
    })
  })

  it('should ignore commented', () => {
    const input = 'FOO=banana\n# FOO=notme'
    const result = app.getTokens(input)
    expect(result).toEqual({
      FOO: 'banana',
    })
  })

  it('should handle multiple', () => {
    const input = 'FOO=banana\nBAR = apple'
    const result = app.getTokens(input)
    expect(result).toEqual({
      FOO: 'banana',
      BAR: 'apple',
    })
  })
})

describe('the README', () => {
  it('should not lie', () => {
    const source = `const foo = {
  number: 99, // #NUMBER
  color: 'red', // #COLOR
}

const boo = {
  x: 1,  // I wonder if it works without trailing commas?
  y: 2 // #GUESS_SO
}

const name = "Dangerous Johnny" // #NAME
const stats = { age: 15, male: true }; // #STATS
`
    const env = `
NUMBER=66
COLOR='green'
GUESS_SO=42
NAME  = "Serious Lady"
# NAME  = "Great Potato"
STATS = { age: 33, male: false }
`

    const tokens = app.getTokens(env)
    const result = app.replace(source, tokens)
    const expected = `const foo = {
  number: 66, // #NUMBER
  color: 'green', // #COLOR
}

const boo = {
  x: 1,  // I wonder if it works without trailing commas?
  y: 42 // #GUESS_SO
}

const name = "Serious Lady" // #NAME
const stats = { age: 33, male: false }; // #STATS
`

    expect(result).toBe(expected)
  })
})
