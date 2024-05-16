
const accents = {
    "ooooo": "ö",
    "oooo": "ô",
    "ooo": "ó",
    "oo": "ò",
    "eeeee": "ë",
    "eeee": "ê",
    "eee": "é",
    "ee": "è"
}

const translateTextbox = document.getElementsByName("translate")[0];
const meowaccent = document.getElementById("meowaccent");

function clickToMeownese() {
    translateTextbox.value = translateToMeownese(translateTextbox.value);
    // console.log(meowaccent.checked);
    if(meowaccent.checked) {
        let newTextbox = translateTextbox.value;
        Object.entries(accents).forEach(entry => {
            // console.log(entry[0])
            newTextbox = newTextbox.replaceAll(entry[0], entry[1]);
        });

        translateTextbox.value = newTextbox;
    }
}

function clickToEnglish() {
    let newTextbox = translateTextbox.value;

    Object.entries(accents).forEach(entry => {
        newTextbox = newTextbox.replaceAll(entry[1], entry[0]);
    });

    translateTextbox.value = translateToEnglish(newTextbox);
}

function translateToMeownese(text) {
    return detranslate(
        toAlternatingCode(
            encode(
                text
            )
        )
    );
}

function translateToEnglish(text) {
    return decode(
        toMorseCode(
            translate(
                text
            )
        )
    );
}