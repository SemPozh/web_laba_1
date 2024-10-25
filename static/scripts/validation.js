function validateYInput() {
    const yInput = document.getElementById("y-inp");


    const regex = /^-?[0-2](\.\d+)?$/;
    // Matches a number between 0 and 2, which can be negative,
    // and may have an optional decimal part with up to 16 digits after the decimal point.
    // Examples: "0", "1", "2", "-1.5", "0.123", "2.1234567890123456" (valid)
    // Examples: "3", "-3.12345678901234567" (invalid)
    if (yInput.value === ""){
        yInput.classList.remove("incorrect");
        return
    }

    if (regex.test(yInput.value)){
        yInput.classList.remove("incorrect");
    } else {
        yInput.classList.add("incorrect");
    }
}
