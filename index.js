/**
 * The are mainly used to make meownese more compact.
 * It's holds strings that can be substituted for each other.
 */
const accents = {
    "ooooo": "ö",
    "oooo": "ô",
    "ooo": "ó",
    "oo": "ò",
    "eeeee": "ë",
    "eeee": "ê",
    "eee": "é",
    "ee": "è"
};

const translateTextbox = document.getElementById("translate"); // The reference for the big text box :3
const meowaccent = document.getElementById("meowaccent"); // The reference for the small meow accent checkbox :3

/**
 * Translates whatever is in the textbox into meownese
 */
function clickToMeownese() {
    translateTextbox.value = translateToMeownese(translateTextbox.value); // get the text in the textbox and translate to meownese.
    
    if(meowaccent.checked) {
        let newTextbox = translateTextbox.value;

        Object.entries(accents).forEach(entry => {
            newTextbox = newTextbox.replaceAll(entry[0], entry[1]);
        });

        translateTextbox.value = newTextbox;
    }
}

/**
 * Translates whatever is in the textbox back to english (or normal text)
 */
function clickToEnglish() {
    let newTextbox = translateTextbox.value;

    // converts accents back to normal. meow accents does not need to be on for this to happen.
    Object.entries(accents).forEach(entry => {
        newTextbox = newTextbox.replaceAll(entry[1], entry[0]);
    });

    const translation = translateToEnglish(newTextbox);

    // if you're reading part of the code, know that this code is only here because I wanted to rick roll my friends :3
    if(translation.startsWith("openlink ")) {
        let capitalize = false;
        window.open(translation.replace("openlink ", "").split("").reduce((prev, curr) => {
            if(curr == " ") {
                capitalize = true;
                return prev;
            }

            if(capitalize) {
                capitalize = false;
                return prev + curr.toUpperCase();
            }

            return prev + curr;
        }),
        "__blank")
    } else 
        translateTextbox.value = translation;
}

/**
 * 
 * @param {*} text normal text to translate to meownese
 * @returns 
 */
function translateToMeownese(text) {
    return detranslate(
        toAlternatingCode(
            encode(
                text
            )
        )
    );
}

/**
 * 
 * @param {*} text meownese text to translate
 * @returns 
 */
function translateToEnglish(text) {
    return decode(
        toMorseCode(
            translate(
                text
            )
        )
    );
}