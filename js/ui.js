

function openTab(evt) {

    var tabSelected = evt.target.textContent;
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("section");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabSelected).style.display = "block";
    evt.currentTarget.className += " active";
}



document.addEventListener('DOMContentLoaded', function () {

    //Add listener for on click to clear chrome local storage
    var clearLocalStorageButton = document.getElementById("clearlivestorage");

    clearLocalStorageButton.addEventListener('click', function(){
        chrome.storage.local.remove(["HISTORY_SELLER"],function(){
            var error = chrome.runtime.lastError;
               if (error) {
                   console.error(error);
               }
               else{
                   window.location.reload() 
               }
           });
    });


    //Add listener to each tab click
    var tags = document.getElementsByTagName('button');
    for(var i = 0; i < tags.length; i++) {
        if(tags[i].className == 'tablinks'){
            //Add event listener to tab
            tags[i].addEventListener('click', openTab);

            //Set live tab to be active or selected
            if(tags[i].textContent == 'Live'){
                tags[i].className+= " active";
            }
        }
    }

    //Set live tab to be opened
    document.getElementById('Live').style.display = "block";
    document.getElementById('History').style.display = "none";
});









