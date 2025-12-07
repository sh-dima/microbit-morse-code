// A - short
// B - long

radio.setGroup(1);

const morseCode = {
    "a": "AB",
    "b": "BAAA",
    "c": "BABA",
    "d": "BAA",
    "e": "A",
    "f": "AABA",
    "g": "BBA",
    "h": "AAAA",
    "i": "AA",
    "j": "ABBB",
    "k": "BAB",
    "l": "ABAA",
    "m": "BB",
    "n": "BA",
    "o": "BBB",
    "p": "ABBA",
    "q": "BBAB",
    "r": "ABA",
    "s": "AAA",
    "t": "B",
    "u": "AAB",
    "v": "AAAB",
    "w": "ABB",
    "x": "BAAB",
    "y": "BABB",
    "z": "BBAA",
    "0": "BBBBB",
    "1": "ABBBB",
    "2": "AABBB",
    "3": "AAABB",
    "4": "AAAAB",
    "5": "AAAAA",
    "6": "BAAAA",
    "7": "BBAAA",
    "8": "BBBAA",
    "9": "BBBBA",
    "end": "ABAB"
};

let stringToSend = "";
let currentlyTypingString = "";
let previousLetter = "";

const invertedMorseCode = invertObject(morseCode);

const getMatch = () => {
    console.log("-------------------");
    console.log("Detected termination sequence.")
    console.log("The currently typed string is: " + currentlyTypingString);
    
    let letter = invertedMorseCode[currentlyTypingString];
    if (letter == null) {
        letter = previousLetter;
    }

    console.log("The letter is: " + letter);
    console.log("-------------------");

    basic.showString(letter);

    previousLetter = letter;
    return letter;
}

const checkMatch = () => {
    const match = getMatch();

    if (!match) return;

    currentlyTypingString = "";

    if (match === "end") {
        console.log("-------------------");
        console.log("Sending string: " + stringToSend);
        console.log("-------------------");

        radio.sendString(stringToSend);
        stringToSend = "";
    } else {
        stringToSend += match;
    }
}

const onButtonAPressed = () => {
    console.log("Button A pressed.")

    currentlyTypingString += "A";
};

const onButtonBPressed = () => {
    console.log("Button B pressed.")

    currentlyTypingString += "B";
}

const onButtonABPressed = () => {
    console.log("Buttons A and B pressed")

    checkMatch();
}

input.onButtonPressed(Button.A, onButtonAPressed);
input.onButtonPressed(Button.B, onButtonBPressed);
input.onButtonPressed(Button.AB, onButtonABPressed);

radio.onReceivedString((receivedString) => basic.showString(receivedString));
