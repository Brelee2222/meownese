/**
 * "Alternating code" is just a different representation of morse code that I made up
 */


/**
 * @param {*} alternating The alternating code to de-translate
 * @returns The meownese representation of the alternating code
 */
function detranslate(alternating = {letters : [], signals : []}) {
    const letters = alternating.letters.map(letter => letter);

    let currentLetter = letters.shift();

    let meowSounds = "m" + alternating.signals.map(wordSignals => {
        let sound = "";

        let eSignal = true;
        let flicker = false;

        if(wordSignals[0] == 0) {
            eSignal = false;
            wordSignals.shift();
        }

        for(let signalIndex in wordSignals) {
            let signal = wordSignals[signalIndex];

            if(signal == 1) {
                if(!flicker) {
                    flicker = true;
                    sound += "r";
                }
            } else {
                flicker = false;
                sound += "w m";
            }

            while(signal != 0) {
                let stepLength = Math.min(currentLetter, signal);

                currentLetter -= stepLength;
                signal -= stepLength;

                for(; stepLength > 0; stepLength--) {
                    sound += eSignal ? "e" : "o";
                }

                if(currentLetter == 0) {
                    eSignal = !eSignal;

                    currentLetter = letters.shift();
                }
            }
        }
        return sound + "w";
    }).join("");

    return meowSounds.replaceAll("mrow", "mow").replaceAll("mrew", "mew").replaceAll("mw ", "");
}

/**
 * 
 * @param {*} meownese the meownese representation of the alternating code to translate
 * @returns the alternating code
 */
function translate(meownese = "") {
    const sounds = meownese
        .slice(1, -1)
        .replaceAll("w m", ",")
        .split("w")
    ;

    const signals = sounds
        .map(soundWords => {
            const meowSignals = [];

            if(soundWords.indexOf("e") == -1 || soundWords.indexOf("o") != -1 && soundWords.indexOf("o") < soundWords.indexOf("e"))
                meowSignals.push(0);

            for(const signalPattern of soundWords.split(",")) {
                let rIndex = signalPattern.indexOf("r");
                if(rIndex == -1)
                    rIndex = signalPattern.length;

                if(rIndex > 0)
                    meowSignals.push(rIndex);

                for(let flicker = 0, flickerLength = signalPattern.length - rIndex - 1; flicker < flickerLength; flicker++)
                    meowSignals.push(1);
            }
            
            return meowSignals;
        })
    ;
    const letters = [];
    sounds.forEach(letterSounds => {
        letterSounds = letterSounds.replaceAll(",", "").replaceAll("r", "");
        let lastSound = letterSounds[0];
        let soundDuration = 0;
        for(const meowSound of letterSounds.replaceAll(",", "")) {
            if(meowSound != lastSound) {
                letters.push(soundDuration);
                lastSound = meowSound;
                soundDuration = 0;
            }

            soundDuration++;
        }

        letters.push(soundDuration);
    });

    return {
        signals,
        letters
    };
}