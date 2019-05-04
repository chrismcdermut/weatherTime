"use strict";
exports.__esModule = true;
function validateArguments(args, debug) {
    try {
        var firstArgument = String(args.slice(0, 1)).toLowerCase();
        if (firstArgument !== 'false' && firstArgument !== 'true') {
            throw new Error('First method argument must be \'true\' or \'false\' for \
      debug mode which expands logging and errors, first argument is: ' + firstArgument);
        }
        var locations = args.slice(1);
        return locations;
    }
    catch (error) {
        console.error('Error in validateArguments and the error is ' + error);
        if (debug) {
            console.error(error);
        }
    }
}
exports.validateArguments = validateArguments;
//# sourceMappingURL=validation.js.map