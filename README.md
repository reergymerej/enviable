# enviable

Reads values from .env.
Find source files.
replaces in source.

Get a map of values.

## Usage


### Step 1

Add comments at the end of lines where you want to replace values.

```js
const foo = {
  number: 99, // #NUMBER
  color: 'red', // #COLOR
}

const boo = {
  x: 1,  // I wonder if it works without trailing commas?
  y: 2 // #GUESS_SO
}

const name = "Dangerous Johnny" // #NAME
const stats = { age: 15, male: true }; // #STATS
```

### Step 2

Set the values in your `.env` file.

```bash
NUMBER=66
COLOR='green'
GUESS_SO=42
NAME  = "Serious Lady"
# NAME  = "Great Potato"
STATS = { age: 33, male: false }
```

*Note: We don't care about spacing and you can comment out values.*


### Step 3

Do the magic.
Your source will now be.

```js
const foo = {
  number: 66, // #NUMBER
  color: 'green', // #COLOR
}

const boo = {
  x: 1,  // I wonder if it works without trailing commas?
  y: 42 // #GUESS_SO
}

const name = "Serious Lady" // #NAME
const stats = { age: 33, male: false }; // #STATS
```

---
kickstarted by [npm-boom][npm-boom]

[npm-boom]: https://github.com/reergymerej/npm-boom
