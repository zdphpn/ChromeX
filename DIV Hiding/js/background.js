

var hostList_bg;

function onMessage(message,sender,sendResponse)
{
	if(message.badge!=null)
	{
		chrome.browserAction.setBadgeBackgroundColor({color:'#F00'});
		chrome.browserAction.setBadgeText({text:message.badge});
	}
}
chrome.runtime.onMessage.addListener(onMessage);
