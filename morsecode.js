const codes = {
    "a" : ".-",
    "b" : "-...",
    "c" : "-.-.",
    "d" : "-..",
    "e" : ".",
    "f" : "..-.",
    "g" : "--.",
    "h" : "....",
    "i" : "..",
    "j" : ".---",
    "k" : "-.-",
    "l" : ".-..",
    "m" : "--",
    "n" : "-.",
    "o" : "---",
    "p" : ".--.",
    "q" : "--.-",
    "r" : ".-.",
    "s" : "...",
    "t" : "-",
    "u" : "..-",
    "v" : "...-",
    "w" : ".--",
    "x" : "-..-",
    "y" : "-.--",
    "z" : "--..",
    "1" : ".----",
    "2" : "..---",
    "3" : "...--",
    "4" : "....-",
    "5" : ".....",
    "6" : "-....",
    "7" : "--...",
    "8" : "---..",
    "9" : "----.",
    "0" : "-----",
    " " : ""
};

function encode(text = "") {
    return text
        .toLowerCase()
        .split("")
        .map(character => {
            const sequence = codes[character];

            if(sequence != undefined)
                return sequence;
        }, "")
        .filter(sequence => sequence != undefined)
        .join("_");
}

function decode(morseCode = "") {
    return morseCode.split("_").map(sequence => Object.keys(codes)[Object.values(codes).indexOf(sequence)]).join("");
}

function toMorseCode(alternating = {letters : [], signals : []}) {
    const letters = alternating.letters;

    let letterCountdown = letters.shift();

    return alternating.signals.map(wordAlternating => {
        let wordSignals = "";

        let signal = false;
        
        for(let signalLength of wordAlternating) {
            while(signalLength--) {
                wordSignals += signal ? "-" : ".";

                if(!--letterCountdown) {
                    wordSignals += "_";
                    letterCountdown = letters.shift();
                }
            }

            signal = !signal;
        }

        return wordSignals;
    }).join("_").slice(0, -1);
}

function toAlternatingCode(morseCode = "") {
    return {
        letters : morseCode
            .split("_")
            .map(sequence => sequence.length)
            .filter(sequenceLength => sequenceLength),

        signals : morseCode
            .split("__")
            .map(morseWord => {
                const wordAlternating = [];

                let currentSignalType = "."; // short signal
                let currentSignalLength = 0;

                for(const signalType of morseWord.replaceAll("_", "")) {
                    if(currentSignalType != signalType) {
                        wordAlternating.push(currentSignalLength);
                        currentSignalType = signalType;
                        currentSignalLength = 0;
                    }

                    currentSignalLength++;
                }

                wordAlternating.push(currentSignalLength);

                return wordAlternating;
            })
    }
}