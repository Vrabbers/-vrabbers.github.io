var strings;

$.getJSON("https://vrabbers.github.io/assets/shawstrings.json", (json)=>{
    strings=json;
});


$(document).ready(()=>{
    while(typeof strings == 'undefined'){
    }
    console.log(strings)
});

function startRound(){
    
}