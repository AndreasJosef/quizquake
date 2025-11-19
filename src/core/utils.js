export function toBool(str) {

    if (str.toLowerCase() === 'true') return true;
    if (str.toLowerCase() === 'false') return false;

    return new Error("String must be true or false");

}