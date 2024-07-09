

/**
 * @param {string} word - A string containing a single word.
 * @returns {string} The same string with capitalized first character.
 */
/* eslint-enable @typescript-eslint/no-unused-vars */
export const capitalize = (word:string): string =>{
    return word[0].toUpperCase() + word.substring(1);
}

/**
 * @param {string} sentence - A string containing a single or multiple words seperated by whitespace.
 * @returns {string} - The same string trimmed and with capitalized words.
 */
/* eslint-enable @typescript-eslint/no-unused-vars */
export const capitalizeWords = (sentence : string): string => {
    const words = sentence.trim().split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = capitalize(words[i])
    }
    return words.join(" ");
}

/**
 * @template T
 * @param {T} obj - An object that contains alphanumeric key values
 * @returns {T} - A new object of the same type that contains the key values in alphanumeric order
 */
/* eslint-enable @typescript-eslint/no-unused-vars */
export const sortObjectByElements = (obj:object): object => {
    const sortedObj = {}
    const keys = Object.keys(obj);
    const sortedKeys = keys.sort(new Intl.Collator('en',{numeric:true, sensitivity:'accent'}).compare)
    console.log(sortedKeys)
    for (const [k, _] of Object.entries(sortedKeys)) {
        // @ts-ignore
        sortedObj[sortedKeys[k]] = obj[sortedKeys[k]]
    }
    return sortedObj
}