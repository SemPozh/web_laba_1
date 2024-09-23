const canvas = document.getElementById("figureCanvas");
canvas.width = document.getElementById("frame").offsetWidth;
canvas.height = document.getElementById("frame").offsetHeight;

const ctx = canvas.getContext("2d");






// rectangle
ctx.fillStyle = "#2130ff";
ctx.fillRect(canvas.width/2 - canvas.height/3, canvas.height/6, canvas.height/3, canvas.height/3);


// circle-sector
ctx.moveTo(canvas.width/2, canvas.height/2);
ctx.lineTo(canvas.width/2, canvas.height/2 + canvas.height/3);
ctx.moveTo(canvas.width/2, canvas.height/2);
ctx.lineTo(canvas.width/2-(canvas.height/3), canvas.height/2);

ctx.arc(canvas.width/2, canvas.height/2, canvas.height/3, Math.PI, 0.5*Math.PI, true);

ctx.fill();


// triangle
ctx.beginPath()

ctx.moveTo(canvas.width/2 + canvas.height/3 ,canvas.height/2);
ctx.lineTo(canvas.width/2, canvas.height/2);

ctx.lineTo(canvas.width/2, canvas.height/2-canvas.height/6);

ctx.fill();


// draw coordinates plane
ctx.fillStyle = "#000";

ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2, canvas.height);


ctx.moveTo(0, canvas.height/2);
ctx.lineTo(canvas.width, canvas.height/2);


ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2+10, 15);


ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2-10, 15);


ctx.moveTo(canvas.width, canvas.height/2);
ctx.lineTo(canvas.width-15, canvas.height/2+10);


ctx.moveTo(canvas.width, canvas.height/2);
ctx.lineTo(canvas.width-15, canvas.height/2-10);


for (let i=-2; i<=2; i++){
    if (i == 0){
        continue
    }
    ctx.moveTo(canvas.width/2-7, canvas.height/2 + canvas.height/6*i);
    ctx.lineTo(canvas.width/2+7, canvas.height/2 + canvas.height/6*i);

    ctx.moveTo(canvas.width/2 + canvas.height/6*i, canvas.height/2-7);
    ctx.lineTo(canvas.width/2 + canvas.height/6*i, canvas.height/2+7);
}


// text

ctx.font = "18px Arial";
ctx.fillText("-R", canvas.width/2 - canvas.height/3 - 12, canvas.height/2-10);
ctx.fillText("R",canvas.width/2+10, canvas.height/6+7);
ctx.fillText("R", canvas.width/2 + canvas.height/3 - 7, canvas.height/2-10);
ctx.fillText("-R", canvas.width/2+10, canvas.height/2 + canvas.height/3+5);
//
ctx.fillText("-R/2", canvas.width/2 - canvas.height/6-20, canvas.height/2-10);
ctx.fillText("R/2",canvas.width/2+10, canvas.height/3+7);
ctx.fillText("R/2", canvas.width/2 + canvas.height/6-13, canvas.height/2-10);
ctx.fillText("R/2", canvas.width/2+10, canvas.height/2 + canvas.height/6+7);
ctx.stroke();
