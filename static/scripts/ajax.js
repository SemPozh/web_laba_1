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
                    let now = data["now"];
                    let result = data["result"];
                    let time = data["time"];
                    let resText;
                    if (result){
                        resText = "Попадание";
                    } else {
                        resText = "Промах";
                    }
                    let date = new Date(Date.parse(now));
                    const options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    };

                    date = date.toLocaleString('ru-RU', options);
                    let newRaw = "<tr>" +
                        "<td>"+xVal+"</td>" +
                        "<td>"+yVal+"</td>" +
                        "<td>"+rVal+"</td>" +
                        "<td>"+resText+"</td>" +
                        "<td>"+date+"</td>" +
                        "<td>"+time+"</td>" +
                        "</tr>"
                    $("#results tbody").append(newRaw);
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