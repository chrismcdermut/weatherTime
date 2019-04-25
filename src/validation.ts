// @deprecated!! but can keep if we want debug flag
export function validateArguments(args: Array<string | number>) {
  try {
    const firstArgument: string = String(args.slice(0, 1)).toLowerCase()
    if (firstArgument !== 'false' && firstArgument !== 'true') {
      throw new Error('First method argument must be \'true\' or \'false\' for \
      debug mode which expands logging and errors, first argument is: ' + firstArgument)
    }
    debug = firstArgument.toLowerCase() === 'true' ? true : false
    const locations = args.slice(1)
    return locations
  } catch (error) {
    console.error('Error in validateArguments and the error is ' + error)
    if (debug) { console.error(error) }
  }
}
