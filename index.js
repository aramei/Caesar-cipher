/**
 * Used for tests, throws an error if value is not equal to expected value
 */
function assertEq(value, expected) {
    if (value != expected) {
        throw 'Expected ' + value + ' to be ' + expected;
    }
}

/**
 * @param {String} str Source string
 * @param {Number} shift Encription key
 * @param {Boolean} crypt If True, encrypt source string, otherwise decrypt it
 * @param {String} [customAlphabet] Optional, real alphabet is used by default
 * 
 * @return {String} crypted or dectypted string
 */
function rot(str, shift, crypt, customAlphabet) {
	// Custom alphabet is a sort of code book
	// If letters would be placed in non-alphabetical order, receiver should know it to decrypt message
	var alphabet = (customAlphabet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').split(''),
		len = alphabet.length;

	// ABC (split)-> [A, B, C] (map)-> [B, C, D] (join)-> BCD
	return str.split('').map(function(ch) {
		var code = alphabet.indexOf(ch);

		// In case symbol is not present in alphabet - just return it
		if (code == -1) {
			return ch;
		}

		if (crypt) {
			code += shift; // Index of encrypted letter is {code} + {shift}
		} else {
			// Index of decrypted letter is {code} - {shift}
			// We need to add length of the alphabet to this code for case when shift > code
			code = (code - shift) + len;
		}

		// Get new character from alphabet, cycle through alphabet if code exceeds length
		return alphabet[code % len];
	}).join('');
}

/**
 * Encryption shortcut
 *
 * @param {String} str Original message
 * 
 * @return {String} Encrypted message
 */
function rot13(str) {
	return rot(str, 13, true);
}

/**
 * Decryption shortcut
 *
 * @param {String} str Encrypted message
 * 
 * @return {String} Decrypted message
 */
function unrot13(str) {
	return rot(str, 13, false);
}

assertEq(rot13('ABCN'), 'NOPA');
assertEq(rot13('XYZ'), 'KLM');
assertEq(rot('ABC', 1, true), 'BCD');
assertEq(rot('ABC', 1, true, 'QWERTYUIOPASDFGHJKLZXCVBNM'), 'SNV');

assertEq(unrot13('NOPA'), 'ABCN');
assertEq(unrot13('KLM'), 'XYZ');
assertEq(rot('BCD', 1, false), 'ABC');
assertEq(rot('SNV', 1, false, 'QWERTYUIOPASDFGHJKLZXCVBNM'), 'ABC');

console.log(rot13('HELLO, WORLD!'));
console.log(unrot13('URYYB, JBEYQ!'));
