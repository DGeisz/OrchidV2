/**
 * Returns whether the input starts with '/',
 * and returns the resulting sequence if so
 */
export function stripSlash(rawInput: string): [boolean, string] {
    if (rawInput && rawInput[0] === '/') {
        return [true, rawInput.substring(1)];
    }
    return [false, rawInput];
}

/**
 * Basically parseInt for boolean*/
export function parseBoolean(input: string): boolean {
    return input === 'true';
}