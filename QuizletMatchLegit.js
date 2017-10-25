// ==UserScript==
// @name         [LEGIT BOT] Quizlet micromatch bot
// @namespace    Edited by Not Michael Lee, Original Code by Danielv123
// @version      e3.0 1.0
// @description  Win micromatch with 100% accuracy really fast
// @author       You
// @match        https://quizlet.com/*/micro*
// @grant        none
// ==/UserScript==

// this script died when microscatter turned into micromatch, but it still works albeit badly.
// edit: Version 2.0 fixed everything and its now able to get sub 0.5 second times!
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
alert("Cheat Activated!");
terms = Quizlet.matchModeData.terms;
wordDefinition = {};
definitionWord = {};
for(let i = 0; i < terms.length; i++){
    wordDefinition[terms[i].word] = terms[i].definition;
    definitionWord[terms[i].definition] = terms[i].word;
}
firstClick = true;
document.onclick = ()=>{
    firstClick = false;
    setTimeout(()=>{
    // Magic for loop instead
    // checks if the combination is right before clicking :)
    for(let i=0;i<document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes.length;i++) {
        console.log("i = "+i);
        // click it if its unclicked
        if(document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes[0].childNodes.length === 0 || document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes[1].childNodes[0].className == "MatchModeQuestionGridTile is-selected"){
            console.log("Already clicked " + i);
        } else {
            let word = document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML.replace(/<!--([\s\S]*?)-->/mig, '');
            let translatedWord;
            if(wordDefinition[word]){
                translatedWord = wordDefinition[word];
            } else if(definitionWord[word]){
                translatedWord = definitionWord[word];
            }
            // console.log(translatedWord);
            // find another word in the same dataset ID and click that as well
            for(let o = 0; o < document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes.length; o++) {
                // console.log("o = " + o );
                if(document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes[o].innerHTML.includes(translatedWord)) {
                    let x = i;
                    setTimeout(()=>{
                        console.log("Found word pair: "+translatedWord+":"+word);
                        eventFire(document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes[o].childNodes[0], "pointerdown");
                        setTimeout(()=>{
                            eventFire(document.querySelector(".MatchModeQuestionGridBoard-tiles").childNodes[x].childNodes[0], "pointerdown");
                        },350); //Fastest number for the value for 100% accuracy, put it higher for slower time for more legitamate times
                    },i*650);//Fastest number for the value for 100% accuracy, put it higher for slower time for more legitamate times
                }
            }
        }
    }},1250);//Fastest number for the value for 100% accuracy, put it higher for slower time for more legitamate times
};
//RULE: Top number must be 100 less than middle number
//Middle number must be less than bottom number
