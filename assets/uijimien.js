let input;
let timerElement;
let codeArea;
let timeToReset = 10;
let time = 10;


$(document).ready(()=>{
    input = $("#input");
    timerElement = $("#timer");
    codeArea = $("#code");
});


setTimeout(function timerDec(){
    time -= 1/100;
    if(time <= 0){
        time = timeToReset;
        addToCodeArea();
    }
    timerElement.text(time.toString(7));
    setTimeout(timerDec,10)
},10);


function pasted() {
    alert("SEM TRAPAÇAS!");
    input.val('');
    setTimeout(() => {
        $("#input").val("")
    });
}


function addToCodeArea(){} //TODO: Actually do this

