function sendAjax() {
    const yVal = truncateNumber($("#y-inp").val(), 10);
    const rVal = $('input[name="r-choose"]:checked').val();

    // Regular expression for validating y
    const yRegExp = /^-?[0-2](\.\d+)?$/;
    // Matches a number between 0 and 2, optionally negative, with an optional decimal part.
    // Examples: "1", "2.5", "-0.1234567890123456", "1.234567890123456" (valid)
    // Examples: "3", "-3.123" (invalid)

    // Regular expression for validating x
    const xRegExp = /^(-5|-4|-3|-2|-1|0|1|2|3)$/;
    // Matches an integer from -5 to 3.
    // Examples: "-5", "0", "3" (valid)
    // Examples: "-6", "4" (invalid)

    // Regular expression for validating r
    const rRegExp = /^([12345])$/;
    // Matches a single digit from 1 to 5.
    // Examples: "1", "4" (valid)
    // Examples: "0", "6" (invalid)
    const selectedOptions = $('input[name="x-choose"]:checked');
    if (selectedOptions.length === 0){
        $(".error_text").css("display", "block");
    }
    selectedOptions.each(function () {
        let xVal = $(this).val();

        if (yRegExp.test(yVal) && xRegExp.test(xVal) && rRegExp.test(rVal)) {
            $(".error_text").css("display", "none");

            $.ajax({
                method: "POST",
                url: "http://localhost:8080/calculate",
                contentType: 'application/json',
                data: JSON.stringify({
                    "x": parseInt(xVal),
                    "y": parseFloat(yVal),
                    "r": parseInt(rVal)
                }),
                success: function (data) {
                    let result = data["result"];
                    let time = data["time"];
                    let resText;
                    if (result) {
                        resText = "Попадание";
                    } else {
                        resText = "Промах";
                    }
                    let newRaw = "<tr>" +
                        "<td>" + xVal + "</td>" +
                        "<td>" + parseFloat(yVal) + "</td>" +
                        "<td>" + rVal + "</td>" +
                        "<td>" + resText + "</td>" +
                        "<td>" + getCurrentDatetime() + "</td>" +
                        "<td>" + time + "</td>" +
                        "</tr>"
                    $("#results tbody").append(newRaw);
                },
                error: function (er) {
                    console.log(er);
                }
            });
        } else {
            $(".error_text").css("display", "block");
        }
    });
}


function getCurrentDatetime() {
    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    let day = String(currentDate.getDate()).padStart(2, '0');
    let hours = String(currentDate.getHours()).padStart(2, '0');
    let minutes = String(currentDate.getMinutes()).padStart(2, '0');
    let seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}


function truncateNumber(num, decimalPlaces) {
    const numStr = num.toString();
    const dotIndex = numStr.indexOf('.');

    if (dotIndex === -1) {
        // Check if there are no decimal part
        return numStr;
    }

    const actualDecimalPlaces = numStr.length - dotIndex - 1;

    if (decimalPlaces >= actualDecimalPlaces) {
        return numStr;
    }

    // Slice extra digits after dot
    return numStr.slice(0, dotIndex + decimalPlaces + 1);
}