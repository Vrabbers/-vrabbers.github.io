let strings;
let currentString;
let ready = false;

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
    $("#input").keyup((event)=>{
        if(event.keyCode === 13){
            translateButton(); 
        }
    });
});

let checkTrue = setInterval(()=>{
    if(ready && typeof strings !== 'undefined'){
        clearInterval(checkTrue);
        startRound();
    }
}, 20);

//shavian box:shwbox
//textbox:answerbox
//bigindicator, youtyped,rightanswer


function goButton(){
    let inputstring = $('#answerbox').val();
    $('#answerbox').val('');
    if(inputstring.toLowerCase() === currentString.trsled){
        $('#bigindicator').text("Correct :)");
        $('#alertbox').removeClass("alert-danger");
        $('#alertbox').addClass("alert-success");
        $('#youtyped').text('');
        $('#rightanswer').text('');
    }else{
        $('#bigindicator').text("Wrong :(");
        $('#alertbox').removeClass("alert-success");
        $('#alertbox').addClass("alert-danger");
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

let translateTable = [
    ["𐑐", "p"],
    ["𐑚", "b"],
    ["𐑑", "t"],
    ["𐑛", "d"],
    ["𐑒", "k"],
    ["𐑜", "ɡ"],
    ["𐑓", "f"],
    ["𐑝", "v"],
    ["𐑔", "θ"],
    ["𐑞", "ð"],
    ["𐑕", "s"],
    ["𐑟", "z"],
    ["𐑖", "ʃ"],
    ["𐑠", "ʒ"],
    ["𐑗", "t͡ʃ"],
    ["𐑡", "d͡ʒ"],
    ["𐑘", "j"],
    ["𐑢", "w"],
    ["𐑙", "ŋ"],
    ["𐑣", "h"],
    ["𐑤", "l"],
    ["𐑮", "r"],
    ["𐑥", "m"],
    ["𐑯", "n"],
    ["𐑦", "ɪ"],
    ["𐑰", "i"],
    ["𐑧", "ɛ"],
    ["𐑱", "eɪ̯"],
    ["𐑨", "æ"],
    ["𐑲", "aɪ̯"],
    ["𐑩", "ə"],
    ["𐑳", "ʌ"],
    ["𐑪", "ɒ"],
    ["𐑴", "oʊ̯"],
    ["𐑫", "ʊ"],
    ["𐑵", "u"],
    ["𐑬", "aʊ̯"],
    ["𐑶", "ɔɪ̯"],
    ["𐑭", "ɑ"],
    ["𐑷", "ɔ"],
    ["𐑸", "ɑr"],
    ["𐑹", "ɔr"],
    ["𐑺", "ɛɚ"],
    ["𐑻", "ɜr"],
    ["𐑼", "ɚ"],
    ["𐑽", "ɪɚ"],
    ["𐑾", "i.ə"],
    ["𐑿", "ju"],
]

function translate(input){
    let out = input;
    translateTable.forEach(element => {
        out = out.replaceAll(element[0], element[1]);
    });
    return out;
}


function translateButton(){
    let inp = $("#inputbox").val();
    let out = translate(inp);
    $("#outbox").text(out);
}


