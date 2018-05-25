
var clickport = chrome.runtime.connect({name: "click"});
var scrollport = chrome.runtime.connect({name: "scroll"});


window.addEventListener("scroll", onscroll);
	
onscroll = function(e) {


   
  var top = this.pageYOffset 
  var left = this.pageXOffset;
  var horizontalScroll = document.querySelector(".horizontalScroll")
  var verticalScroll = document.querySelector(".verticalScroll");
  var address = location.hostname
  var title = document.title;
  var date = new Date().toLocaleString();


  // console.log( "Scroll X: " + left + "px " + "Scroll Y: " + top + "px");
  scrollport.postMessage({click:false, typing:false, scroll: true, x:left, y: top, time :  date , title: title, address: address})
};

document.onclick = function(e){
  var x = e.pageX;
  var y = e.pageY;
  var address = location.hostname
  var title = document.title;
  var date = new Date().toLocaleString();
  clickport.postMessage({click:true, typing:false, scroll: false, x:x, y: y, time : date, title: title, address: address});

  // console.log("User clicked at position (" + x + "," + y + ")")
}
