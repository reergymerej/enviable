export const replace = (text, tokens) => {
  const regex = (/([=:]\s+)(.+?)(([,;])?\s*\/\/\s+#)([A-Z_]+)/gm)
  return text.replace(regex, (...args) => {
    const [, assignment,, filling,, tokenName] = args
    const newValue = tokens[tokenName]
    return `${assignment}${newValue}${filling}${tokenName}`
  })
}

export const getTokens = (text) => {
  const regex = (/^([A-Z_]+)(\s*)?=(\s*)?(.+)/gm)
  const tokens = {}
  let match = regex.exec(text)
  while (match) {
    const [, name,,, value] = match
    match = regex.exec(text)
    tokens[name] = value
  }
  return tokens
}
