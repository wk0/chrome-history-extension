// chrome.webNavigation.onDOMContentLoaded.addListener(function(details){
// 	chrome.tabs.executeScript(details.tabId, {
// 		file: 'inject.js'
// 	});
// })




chrome.runtime.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(msg) {
		if(port.name == "click"){
		}
		else if(port.name == 'scroll'){
		}
	});
	






});
