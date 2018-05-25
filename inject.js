// this is the code which will be injected into a given page...

(function() {

	// just place a div at top right
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
	div.textContent = 'Injected Tracker!';
	document.body.appendChild(div);

	window.addEventListener("mousemove", onmousemove);

	window.addEventListener("onclick", onclick);

	window.addEventListener("scroll", onscroll);
	
	onscroll = function(event) {
  
		// var top = this.scrollY,
		// 	left = this.scrollX;
	  
		 
		var top = this.pageYOffset ,
			left = this.pageXOffset;
		var horizontalScroll = document.querySelector(".horizontalScroll"),
			verticalScroll = document.querySelector(".verticalScroll");

	  
		// console.log( "Scroll X: " + left + "px " + "Scroll Y: " + top + "px");
	};
	
	onclick = function(e){
		var x = e.pageX;
		var y = e.pageY;
		// console.log("User clicked at position (" + x + "," + y + ")")
	}
	// onmousemove = function(e) {console.log("mouse location:", e.clientX, e.clientY)}
})();