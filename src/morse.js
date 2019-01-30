const MORSE_CODE = {
  "-.-.--": "!",
  ".-..-.": '"',
  "...-..-": "$",
  ".-...": "&",
  ".----.": "'",
  "-.--.": "(",
  "-.--.-": ")",
  ".-.-.": "+",
  "--..--": ",",
  "-....-": "-",
  ".-.-.-": ".",
  "-..-.": "/",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  "..--..": "?",
  ".--.-.": "@",
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "..--.-": "_",
  "...---...": "SOS"
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
function decodeMorse(morseCode) {
  var response;
  // morseCode = ` ${morseCode}`;
  var code = morseCode.split(" "); // remove white spaces
 
  var response = code.map(res => {
    var value = MORSE_CODE[res] ? MORSE_CODE[res] : " ";
    return value;
  });
 
  var format = response.filter((current,index)=> {
    index  = index == 0 ? 1 : index; 

    var past = response[index - 1];
 
    if(past == " "){ // previous function was a space
        if(current != " "){ // if current is not a space return  current
          return current
        }
        ////// idea we can't be having two spaces together
    }else if (past != " "){ // if the past was not empty
      if(current == " "){ // if the current is a space return the space.. it is intension
        return " "
      }else if (current != " "){ // the past was not empty and the current is not empty
        return current
      }
      ///////  idea a space usually comes after a content but never after a space
    }
  });
 
 
  if(format[0] == " "){
    format.shift()
  }
  if (format[format.length -1] == " "){
    format.pop()
  }

  var decoder = format.join("");
  console.log(decoder)
  return decoder;
}

decodeMorse(
  " . "
);
module.exports = decodeMorse;
