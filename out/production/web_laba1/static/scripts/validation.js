let checkboxes = document.getElementsByClassName("checkbox_x");

// for (let i=0; i<checkboxes.length; i++){
//     checkboxes[i].onclick = function () {
//         for (let j=0; j<checkboxes.length; j++){
//             if (j!=i){
//                 checkboxes[j].checked = false;
//             } else{
//                 checkboxes[j].checked = true;
//             }
//         }
//     }
// }


let yInput = document.getElementById("y-inp");
yInput.oninput = function () {
    if (!(yInput.value==="-5" || yInput.value==="-4" || yInput.value==="-3" || yInput.value==="-2" || yInput.value==="-1" || yInput.value==="0" || yInput.value==="1" || yInput.value==="2" || yInput.value==="3" || yInput.value==="")){
        yInput.classList.add("incorrect");
    } else {
        yInput.classList.remove("incorrect");
    }
}

