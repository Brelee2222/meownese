const translateTextbox = document.getElementsByName("translate")[0];

function clickToMeownese() {
    translateTextbox.value = translateToMeownese(translateTextbox.value);
}

function clickToEnglish() {
    translateTextbox.value = translateToEnglish(translateTextbox.value);
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