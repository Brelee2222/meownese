const translateTextbox = document.getElementsByName("translate")[0];
const meowaccent = document.getElementById("meowaccent");

function clickToMeownese() {
    translateTextbox.value = translateToMeownese(translateTextbox.value);
    console.log(meowaccent.checked);
    if(meowaccent.value) {
        translateTextbox.value = translateTextbox.value
        .replaceAll("ooooo", "ö")
        .replaceAll("oooo", "ô")
        .replaceAll("ooo", "ó")
        .replaceAll("oo", "ò")
        .replaceAll("eeeee", "ë")
        .replaceAll("eeee", "ê")
        .replaceAll("eee", "é")
        .replaceAll("ee", "è");
    }
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