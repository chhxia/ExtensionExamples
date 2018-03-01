document.addEventListener("DOMContentLoaded", function(evt){
    var h = document.getElementsByTagName('html')[0];
    var scriptspath = chrome.runtime.getURL("refresh.js");
    console.log(scriptspath);
    var script = document.createElement('script');
    script.src = scriptspath;
    if(h)
        h.appendChild(script);
}, true);

var clearcache = setInterval(function(){
    var errornotes = document.getElementsByClassName('note_error');
    var freshbutton = document.getElementsByClassName('note_error_button_refrash');
    var notetit = document.getElementsByClassName('note_error_tit');
    if(errornotes.length > 0 || freshbutton.length > 0 || notetit.length > 0){
        chrome.extension.sendMessage({prefix: "clearcache"}, function(response) {
            console.log("clearcache.");
            clearInterval(clearcache);
        });
    }
}, 500);