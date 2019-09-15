'use strict';
/*
* Ui jimi én commands:
* TERMINE ESSE PROGRAMA *
* OBTENHA ENTRADA E GUARDE NA VARIÁVEL ABERTA COMO UM CARÁTER *
* OBTENHA ENTRADA E GUARDE NA VARIÁVEL ABERTA COMO UM NÚMERO *
* IMPRIMA O CARÁTER DA VARIÁVEL ABERTA *
* IMPRIMA O VALOR DA VARIÁVEL ABERTA *
* IMPRIMA O CARÁTER COM O VALOR ASCII [n] *
* DECLARE A NOVA VARIÁVEL [v] *
* ABRA A VARIÁVEL [v] *
* ATRIBUA [n] À VARIÁVEL ABERTA *
* ADICIONE "" *
* MULTIPLIQUE "" *
* PULE A [l] SE [v] É (IGUAL A/MAIOR QUE/MENOR QUE) [v]
* DEFINA O RÓTULO [l]
* this beautiful regex
* /(TERMINE ESSE PROGRAMA)|(OBTENHA ENTRADA E GUARDE NA VARIÁVEL ABERTA COMO UM (CARÁTER|NÚMERO))|(IMPRIMA O (CARÁTER|VALOR) DA VARIÁVEL ABERTA)|(IMPRIMA O CARÁTER COM O VALOR ASCII \d+)|(DECLARE A NOVA VARIÁVEL [A-Z]+)|(ABRA A VARIÁVEL [A-Z]+)|((ATRIBUA|ADICIONE|MULTIPLIQUE|) \d+ À VARIÁVEL ABERTA)|(PULE A [A-Z]+ SE [A-Z]+ É (IGUAL A|MAIOR QUE|MENOR QUE) [A-Z]+)|(DEFINA O RÓTULO [A-Z]+)/
* should match every line that is fed into the code
 */

const INPUT_MODES = {NO: 0, NUMBER: 1, CHAR: 2};
const beautifulRegex = /(TERMINE ESSE PROGRAMA)|(OBTENHA ENTRADA E GUARDE NA VARIÁVEL ABERTA COMO UM (CARÁTER|NÚMERO))|(IMPRIMA O (CARÁTER|VALOR) DA VARIÁVEL ABERTA)|(IMPRIMA O CARÁTER COM O VALOR ASCII \d+)|(DECLARE A NOVA VARIÁVEL [A-Z]+)|(ABRA A VARIÁVEL [A-Z]+)|((ATRIBUA|ADICIONE|MULTIPLIQUE|) \d+ À VARIÁVEL ABERTA)|(PULE A [A-Z]+ SE [A-Z]+ É (IGUAL A|MAIOR QUE|MENOR QUE) [A-Z]+)|(DEFINA O RÓTULO [A-Z]+)/;

let input;
let timerElement;
let codeArea;
let programOutput;
let userInputBox;
let sendButton;
let countingDown = false;
let timeToReset = 10;
let timer = 10;

let inputting = INPUT_MODES.NO;



$(document).ready(()=>{
    input = $("#input");
    timerElement = $("#timer");
    codeArea = $("#code");
    programOutput = $("#prgOutput");
    userInputBox = $("#prgSendBox");
    sendButton = $("#buttonSend");
    hideProgram();
});

function hideProgram(){
    programOutput.hide();
    userInputBox.hide();
    sendButton.hide();
    $("#accentButtons").show();
    input.show();
    timerElement.show();
    codeArea.show();

}

function hideCode(){
    programOutput.show();
    userInputBox.show();
    sendButton.show();
    $("#accentButtons").hide();
    input.hide();
    timerElement.hide();
    codeArea.hide();
}

function timerDec(){
    timer -= 1/100;
    if(timer <= 0){
        timer = timeToReset;
        addToCodeArea();
    }
    timerElement.text(timer.toString(timer+2).substr(0,6));
    if(countingDown) setTimeout(timerDec,10);
}


function pasted() {
    alert("SEM TRAPAÇAS!");
    input.val('');
    setTimeout(() => {
        $("#input").val("")
    });
}

function addToCodeArea(){
    let strings = input.val().split('\n');
    if(input.val() === ""){
        startInterpreting();
    }else if(strings[0].match(beautifulRegex) !== null){
        codeArea.val(codeArea.val() + strings.shift() + "\n");
    }else{
        timeToReset /= 2;
        alert("ESTUPIDO APRENDA A PROGRAMAR!!1!!!!");
        strings.shift();
    }
    input.val(strings.join("\n"))
}

// Interpreter starts here

let waiting;
let variables = [];
let openVar;
let counter = 0;

function interpret(codeString){
    console.log("r")
    programOutput.val("");
    userInputBox.val("");
    hideCode();
    countingDown = false;
    let code = codeString.split("\n");
    counter = 0;


    let splitCurrent;
    function r(){
        try {
            console.log("r");
            sendButton.off("click");

            while (true) {
                splitCurrent = code[counter].split(/(\s+)/);
                if (counter >= code.length) {
                    finish();
                    return;
                }
                if (code[counter] === "TERMINE ESSE PROGRAMA") {
                    finish();
                    return;

                } else if (code[counter] === "OBTENHA ENTRADA E GUARDE NA VARIÁVEL ABERTA COMO UM NÚMERO") {
                    inputting = INPUT_MODES.NUMBER;
                    userInputBox.focus();
                    sendButton.click(() => {
                        variables[openVar] = parseInt(userInputBox.val());
                        console.log("a");
                        counter++;
                        r();
                    });
                    return;

                } else if(code[counter].endsWith(" À VARIÁVEL ABERTA")){
                    let val = parseInt(splitCurrent[1]);
                    switch(splitCurrent[0]){
                        case "ATRIBUA":
                            variables[openVar] = val;
                            break;
                        case "ADICIONE":
                            variables[openVar] += val;
                            break;
                        case "MULTIPLIQUE":
                            variables[openVar] *= val;
                    }
                }else if (code[counter] === "OBTENHA ENTRADA E GUARDE NA VARIÁVEL ABERTA COMO UM CARÁTER") {
                    inputting = INPUT_MODES.CHAR;
                    userInputBox.focus();
                    sendButton.click(() => {
                        variables[openVar] = userInputBox.val().charCodeAt(0);
                        console.log("c");
                        counter++;
                        r();
                    });
                    return;

                } else if (code[counter] === "IMPRIMA O CARÁTER DA VARIÁVEL ABERTA") {
                    programOutput.val(programOutput.val() + String.fromCharCode(variables[openVar]));

                } else if (code[counter] === "IMPRIMA O VALOR DA VARIÁVEL ABERTA") {
                    programOutput.val(programOutput.val() + variables[openVar].toString());

                } else if (code[counter].startsWith("IMPRIMA O CARÁTER COM O VALOR ASCII ")) {
                    programOutput.val(programOutput.val() + String.fromCharCode(parseInt(code[counter].substr(36))));

                } else if (code[counter].startsWith("DECLARE A VARIÁVEL ")) {
                    variables[code[counter].substr(19)] = 0;

                } else if (code[counter].startsWith("ABRA A VARIÁVEL ")) {
                    let name = code[counter].substr(16);
                    if (variables[name] === undefined) {
                        alert(`VARIÁleb ${name} NAO pODE SER ABERTA POIS NAO EXSITe`);
                        finish();
                        return;
                    } else {
                        openVar = name;
                    }
                }
                counter++;
            }
        } catch (e){
            finish();
            return;
        }
        r();
    }
    r();

}
function finish() {
    alert("O PROGRAMA TERMINOU");
    timer = 10;
    timeToReset = 10;
    input.val("");
    codeArea.val("");
    //hideProgram();
}
/*function programSend() {
    if(inputting === INPUT_MODES.NO){
        alert("Não RECEVEnEDO ENTRASDADASDA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
    } else if (inputting === INPUT_MODES.NUMBER){
        inputted
    } else if (inputting === INPUT_MODES.CHAR){
        inputted = userInputBox.val().substr(0,1).charCodeAt(0);
    }
}*/

