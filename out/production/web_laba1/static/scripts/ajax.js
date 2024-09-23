$(document).ready(function() {
    $('#submitButton').click(function(e) {
        // Stop form from sending request to server
        e.preventDefault();

        var btn = $(this);
        let yVal = $("#y-inp").val();
        let xVal = $('input[name="x-choose"]:checked').val();
        let rVal = $('input[name="r-choose"]:checked').val();
        let yRegExp = /^(-3|-2|-1|0|1|2|3)$/;
        let xRegExp = /^(-5|-4|-3|-2|-1|0|1|2|3)$/
        let rRegExp = /^([12345])$/
        if (yRegExp.test(yVal) && xRegExp.test(xVal) && rRegExp.test(rVal)){
            $(".error_text").css("display", "none");

            $.ajax({
                method: "POST",
                url: "http://localhost:28030/fcgi-bin/web_laba1.jar",
                dataType: "json",
                data: {
                    "x": parseInt(xVal),
                    "y": parseInt(yVal),
                    "r": parseInt(rVal)
                },
                success: function(data) {
                    // let info = JSON.parse(data["responseText"]);
                    // $("#results tbody").append(info);
                    console.log(data);
                },
                error: function(er) {
                    console.log(er);
                }
            });
        } else {
            $(".error_text").css("display", "block");
        }
    })
});