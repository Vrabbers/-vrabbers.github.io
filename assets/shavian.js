var strings;
var currentString;
var ready = false;

$.getJSON("https://vrabbers.github.io/assets/shawstrings.json", (json)=>{
    strings=json;
});

$(document).ready(()=>{
    ready = true;
    $("#answerbox").keyup((event)=>{
        if(event.keyCode === 13){
            goButton(); 
        }
    });
});

var checktrue = setInterval(()=>{
    if(ready && typeof strings !== 'undefined'){
        clearInterval(checktrue);
        startRound();
    }
}, 20);

//shavian box:shwbox
//textbox:answerbox
//bigindicator, youtyped,rightanswer


function goButton(){
    let inputstring = $('#answerbox').val();
    $('#answerbox').val('');
    if(inputstring.toLowerCase() == currentString.trsled){
        $('#bigindicator').text("Correct :)");
        $('#bigindicator').css('color', 'green');
        $('#youtyped').text('');
        $('#rightanswer').text('');
    }else{
        $('#bigindicator').text("Wrong :(");
        $('#bigindicator').css('color', 'red');
        $('#youtyped').text(`You typed: ${inputstring}`);
        $('#rightanswer').text(`Correct: ${currentString.trsled}`);   
    };
    startRound();
}

function startRound(){
    let rand = Math.round(Math.random()*(strings.length-1));
    currentString = strings[rand];
    console.log(`starting round with string`);
    console.log(currentString);
    $("#shwbox").text(currentString.shaw);
}