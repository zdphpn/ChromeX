
var popupShow="";
var popupCount=0;
var childList=new Array(); 
var deep=0;
function checkChildrens(ele)
{
	deep++;

	if(ele.shadowRoot)
	{
	for(var i=0;i<ele.shadowRoot.children.length;i++)
	{
		var elehtml=ele.shadowRoot.children[i].outerHTML.toString();
		//console.log(elehtml.substring(0,16));
		//if(elehtml.substring(0,4)=="<div")
		{
			for(var j=0;regexList!=null&&j<regexList.length;j++)
			{
				if(regexList[j]!=null)
				{
					var reg=new RegExp(regexList[j],"i");
					var temp=elehtml;
					if(reg.test(temp))
					{
						ele.shadowRoot.children[i].style.setProperty('display','none','important');
						if(popupCount<=4)
						{
							childList[popupCount]=ele.shadowRoot.children[i];
							popupShow+="<tr><td><xmp>"+elehtml.substring(0,24)+"...</xmp></td><td><xmp>"+regexList[j].substring(0,24)+"</xmp></td><td>"+"<input type=\"checkbox\" id=\"cb"+popupCount.toString()+"\"/></td></tr>";
						}
						popupCount++;

						break;
					}
				}
			}
		}
		checkChildrens(ele.shadowRoot.children[i]);
	}
	}
	else
	{
	for(var i=0;i<ele.children.length;i++)
	{
		var elehtml=ele.children[i].outerHTML.toString();
		//console.log(elehtml.substring(0,16));
		//if(elehtml.substring(0,4)=="<div")
		{
			for(var j=0;regexList!=null&&j<regexList.length;j++)
			{
				if(regexList[j]!=null)
				{
					var reg=new RegExp(regexList[j],"i");
					var temp=elehtml;
					if(reg.test(temp))
					{
						ele.children[i].style.setProperty('display','none','important');
						if(popupCount<=4)
						{
							childList[popupCount]=ele.children[i];
							popupShow+="<tr><td><xmp>"+elehtml.substring(0,24)+"...</xmp></td><td><xmp>"+regexList[j].substring(0,24)+"</xmp></td><td>"+"<input type=\"checkbox\" id=\"cb"+popupCount.toString()+"\"/></td></tr>";
						}
						popupCount++;

						break;
					}
				}
			}
		}
		checkChildrens(ele.children[i]);
	}
	}
}

var regexList;
var hostName;
var hostList;

var regex_demohost="^https://www.baidu.com/s";
var regex_demoitem1="^<div [\\S\\s]{5,50} style=\"display:block !important;visibility:visible !important";
var regex_demoitem2="^<div class=\"result c-container\".*<span class=\"m ec_tuiguang_pplink\">广告</span>";

function checkhost()
{
	popupShow="";
	popupCount=0;
	childList.length=0;
	deep=0;

	if(hostList==null)
	{
		chrome.storage.local.get('hostlist', function(result1) {
			console.log('hostlist:'+result1.hostlist);
			if(result1.hostlist!=null)
			{
				hostList=result1.hostlist;
			}
			else
			{
				hostList=new Array();
			}
			hostList[hostList.length]=regex_demohost;
			
			var url=document.location.href;
			console.log(url);
			if(url!=null&&url!="")
			{
				var host;
				for(var i=0;i<hostList.length;i++)
				{
					if(hostList[i]!=null)
					{
						var reg=new RegExp(hostList[i],"i");
						if(reg.test(url))
						{
							host=hostList[i];
							i=0;
							break;
						}
					}
				}
				if(i>0)
				{
					chrome.runtime.sendMessage({badge:'null'});
				}
				else
				{
					host=host.toString();
					if(hostName!=host)
					{
						hostName=host;
						chrome.storage.local.get(host, function(result2) {
							console.log(host+":"+result2[host]);
							if(result2[host]!=null)
							{
								regexList=result2[host];
							}
							else
							{
								regexList=new Array();
							}
							if(host==regex_demohost)
							{
								regexList[regexList.length]=regex_demoitem1;
								regexList[regexList.length]=regex_demoitem2;
							}
							checkChildrens(document.body);
							chrome.runtime.sendMessage({badge:popupCount.toString()});
						});
					}
					else
					{
						checkChildrens(document.body);
						chrome.runtime.sendMessage({badge:popupCount.toString()});
					}
				}
			}
		});
	}
	else
	{
		var url=document.location.href;
		console.log(url);
		if(url!=null&&url!="")
		{
			var host;
			for(var i=0;i<hostList.length;i++)
			{
				if(hostList[i]!=null)
				{
					var reg=new RegExp(hostList[i],"i");
					if(reg.test(url))
					{
						host=hostList[i];
						i=0;
						break;
					}
				}
			}
			if(i>0)
			{
				chrome.runtime.sendMessage({badge:'null'});
			}
			else
			{
				host=host.toString();
				if(hostName!=host)
				{
					hostName=host;
					chrome.storage.local.get(host, function(result2) {
						console.log(host+":"+result2[host]);
						if(result2[host]!=null)
						{
							regexList=result2[host];
						}
						else
						{
							regexList=new Array();
						}
						if(host==regex_demohost)
						{
							regexList[regexList.length]=regex_demoitem1;
							regexList[regexList.length]=regex_demoitem2;
						}
						checkChildrens(document.body);
						chrome.runtime.sendMessage({badge:popupCount.toString()});
					});
				}
				else
				{
					checkChildrens(document.body);
					chrome.runtime.sendMessage({badge:popupCount.toString()});
				}
			}
		}
	}
}

window.onload=checkhost();

var observer = new MutationObserver(checkhost);
var article = document.body;
var options = {
  'childList': true,
  'attributes':true
} ;
observer.observe(article, options);



function onMessage(message,sender,sendResponse)
{
	if(message.get!=null)
	{
		sendResponse({count:popupCount.toString(),list:popupShow});
	}
	if(message.set!=null)
	{
		if(childList.length>message.set)
		{
			childList[message.set].style.display="block";
		}
	}
	if(message.reset!=null)
	{
		if(childList.length>message.reset)
		{
			childList[message.reset].style.setProperty('display','none','important');
		}
	}
	if(message.again!=null)
	{
		checkhost();
		sendResponse({count:popupCount.toString(),list:popupShow});
	}
}
chrome.runtime.onMessage.addListener(onMessage);
