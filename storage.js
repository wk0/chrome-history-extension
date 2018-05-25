window.addEventListener("scroll", onscroll);

	
onscroll = function(e) {


   
  var top = this.pageYOffset 
  var left = this.pageXOffset;
  var horizontalScroll = document.querySelector(".horizontalScroll")
  var verticalScroll = document.querySelector(".verticalScroll");
  var address = location.hostname
  var title = document.title;
  var date = new Date().toLocaleString();
  var msg = {click:false, typing:false, scroll: true, x:left, y: top, time :  date , title: title, address: address};
  
  var history = [];
  chrome.storage.local.get(['HISTORY_SELLER'], function(result) {
    if(result && !Object.keys(result).length < 1){        
        history = result['HISTORY_SELLER'];
        history.unshift(msg);
        chrome.storage.local.set({'HISTORY_SELLER': history}, function() {});
    }
    else{
        history.unshift(msg);
        chrome.storage.local.set({'HISTORY_SELLER': history}, function() {});
    }
  });
};

document.onclick = function(e){
  var x = e.pageX;
  var y = e.pageY;
  var address = location.hostname
  var title = document.title;
  var date = new Date().toLocaleString();
  var msg = {click:true, typing:false, scroll: false, x:x, y: y, time : date, title: title, address: address};

  var history = [];
  chrome.storage.local.get(['HISTORY_SELLER'], function(result) {
    if(result && !Object.keys(result).length < 1){        
        history = result['HISTORY_SELLER'];
        history.unshift(msg);
        chrome.storage.local.set({'HISTORY_SELLER': history}, function() {});
    }
    else{
        history.unshift(msg);
        chrome.storage.local.set({'HISTORY_SELLER': history}, function() {});
    }
  });
}
