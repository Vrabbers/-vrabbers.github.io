const input = $("#input");
const timerElement = $("#timer");
const codeArea = $("#code");
let timeToReset = 10;
let time = 10;

setInterval(()=>{
    time -= 1/100;
    if(time <= 0){
        time = timeToReset;
        addToCodeArea();
    }
    timerElement.val(time); //WHY DOESNT THIS WORKKKKKKKK
},100);


function pasted() {
    alert("SEM TRAPAÇAS!");
    input.val('');
    setTimeout(() => {
        $("#input").val("")
    });
}


function addToCodeArea(){} //TODO: Actually do this

