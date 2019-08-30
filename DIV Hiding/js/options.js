
var regex_demohost="^https://www.baidu.com/s";
var regex_demoitem1="^<div [\\S\\s]{5,50} style=\"display:block !important;visibility:visible !important";
var regex_demoitem2="^<div class=\"result c-container\".*<span class=\"m ec_tuiguang_pplink\">广告</span>";

var rggroup_s="<div class=\"rggroup\">"
var rghost_s="<div class=\"rghost\">"
var rghost_text_s="<div class=\"text\">";
var rghost_icon="<div class=\"icon rghost_delete\"><img src=\"images/delete.png\" width=\"20px\"></div><div class=\"icon rghost_addrgitem\"><img src=\"images/add.png\" width=\"22px\"></div>";

var rglist_s="<div class=\"rglist\">";
var rglist_item_s="<div class=\"rgitem\">";
var rglist_item_text_s="<div class=\"text\">";
var rglist_item_icon="<div class=\"icon rgitem_delete\"><img src=\"images/cancel.png\" width=\"20px\"></div>";
var rglist_itemadd="<div class=\"rgitem rgitemadd\"><div class=\"text\"><input type=\"text\"/></div><div class=\"icon rgitemadd_cancel\"><img src=\"images/cancel.png\" width=\"20px\"></div><div class=\"icon rgitemadd_ok\"><img src=\"images/ok.png\" width=\"22px\"></div></div>";

var rgxxx_e="</div>";


function updataregex()
{
	var ele_body=document.getElementById('body');
	
	chrome.storage.local.get('html', function(result) {
		var html=result.html;
		console.log('Value is get to '+result.html);
		if(html!=null)
		{
			ele_body.innerHTML=html;
			
			var rghost_delete=document.getElementsByClassName('rghost_delete');
			if(rghost_delete!=null&&rghost_delete.length>0)
			{
				for(var n=0;n<rghost_delete.length;n++)
				{
					rghost_delete[n].addEventListener('click',function(){
						console.log(this);
						var host=this.parentNode.firstChild.innerHTML;
						chrome.storage.local.remove(host, function() {
							console.log('remove '+host);
						});
						document.getElementById('body').removeChild(this.parentNode.parentNode);
						chrome.storage.local.get('hostlist', function(result) {
														
							if(result.hostlist!=null&&result.hostlist.length>0)
							{
								for(var i=0;i<result.hostlist.length;i++)
								{
									if(result.hostlist[i]==host)
									{
										result.hostlist[i]=null;
									}
								}
							}
							chrome.storage.local.set({'hostlist':result.hostlist}, function() {
								console.log('save hostlist:'+result.hostlist);
								
								var html=document.getElementById('body').innerHTML;
								chrome.storage.local.set({"html":html}, function() {
									console.log('save html:'+html);
								});
							});
						});
					});
				}
			}
			
			var rghost_addrgitem=document.getElementsByClassName('rghost_addrgitem');
			if(rghost_addrgitem!=null&&rghost_addrgitem.length>0)
			{
				for(var n=0;n<rghost_addrgitem.length;n++)
				{
					rghost_addrgitem[n].addEventListener('click',function(){
						console.log(this);
						this.parentNode.nextSibling.firstChild.firstChild.value="^";
						this.parentNode.nextSibling.style.display="block";
					});
				}
			}
			
			var rgitemadd_cancel=document.getElementsByClassName('rgitemadd_cancel');
			if(rgitemadd_cancel!=null&&rgitemadd_cancel.length>0)
			{
				for(var n=0;n<rgitemadd_cancel.length;n++)
				{
					rgitemadd_cancel[n].addEventListener('click',function(){
						console.log(this);
						this.parentNode.style.display="none";
					});
				}
			}
			
			var rgitemadd_ok=document.getElementsByClassName('rgitemadd_ok');
			if(rgitemadd_ok!=null&&rgitemadd_ok.length>0)
			{
				for(var n=0;n<rgitemadd_ok.length;n++)
				{
					rgitemadd_ok[n].addEventListener('click',function(){
						console.log(this);
						var regex=this.previousSibling.previousSibling.lastChild.value;
						
						if(regex!=null&&regex!="")
						{
							var rglist=this.parentNode.nextSibling;
							rglist.innerHTML=(rglist_item_s+rglist_item_text_s+"<xmp>"+regex+"</xmp>"+rgxxx_e+rglist_item_icon+rgxxx_e)+rglist.innerHTML;
							
							this.parentNode.style.display="none";
							
							var host=this.parentNode.previousSibling.firstChild.innerHTML;
							console.log(host);
							
							host=host.toString();
							chrome.storage.local.get(host, function(result) {
								var rglist=new Array();
								console.log(host+':'+result[host]);
								if(result[host]!=null&&result[host].length>0)
								{
									for(var i=0;i<result[host].length;i++)
									{
										if(result[host][i]!=null)
										{
											rglist[rglist.length]=result[host][i];
										}
									}
								}
							
								rglist[rglist.length]=regex;
								
								var setvalue={};
								setvalue[host]=rglist;
								chrome.storage.local.set(setvalue, function() {
									console.log('save '+host+':'+rglist);
									
									var html=document.getElementById('body').innerHTML;
									chrome.storage.local.set({"html":html}, function() {
										
										console.log('save html:'+html);
									});
								});
								
							});
							
						}
					});
				}
			}
		}
		else
		{
			ele_body.innerHTML=(rggroup_s+rghost_s+rghost_text_s+regex_demohost+rgxxx_e+rgxxx_e+rglist_itemadd+rglist_s+rglist_item_s+rglist_item_text_s+"<xmp>"+regex_demoitem1+"</xmp>"+rgxxx_e+rgxxx_e+rglist_item_s+rglist_item_text_s+"<xmp>"+regex_demoitem2+"</xmp>"+rgxxx_e+rgxxx_e+rgxxx_e+rgxxx_e);
		}
	});
}

updataregex();
document.getElementById('footer').addEventListener('click',function(){
	document.getElementById('rghostaddinput').value="^"
	document.getElementById('rghostadd').style.display="block";
});
document.getElementById('rghostaddcancel').addEventListener('click',function(){

	document.getElementById('rghostadd').style.display="none";
});
document.getElementById('rghostaddok').addEventListener('click',function(){

	var host=document.getElementById('rghostaddinput').value;
	if(host!=null&&host!="")
	{
		document.getElementById('body').innerHTML+=(rggroup_s+rghost_s+rghost_text_s+host+rgxxx_e+rghost_icon+rgxxx_e+rglist_itemadd+rglist_s+rgxxx_e+rgxxx_e);
		
		chrome.storage.local.get('hostlist', function(result) {
			var hostlist=new Array();
			console.log('Value is get to '+result.hostlist);
			if(result.hostlist!=null&&result.hostlist.length>0)
			{
				for(var i=0;i<result.hostlist.length;i++)
				{
					if(result.hostlist[i]!=null)
					{
						hostlist[hostlist.length]=result.hostlist[i];
					}
				}
			}
		
			hostlist[hostlist.length]=host;
			chrome.storage.local.set({'hostlist':hostlist}, function() {
				console.log('save hostlist:'+hostlist);
				
				var html=document.getElementById('body').innerHTML;
				chrome.storage.local.set({"html":html}, function() {
					document.getElementById('rghostadd').style.display="none";
					console.log('save html:'+html);
					
					updataregex();
				});
			});
		});
	}
});

document.getElementById('open').addEventListener('click',function(){
	document.getElementById('input_open').click();
	
	
});
document.getElementById('input_open').addEventListener('change',function(){
	var file=document.getElementById('input_open').files[0];
	console.log(file);
	if(file){
		var reader=new FileReader();
	    
	    reader.onloadend=function(e) {
			//console.log(this.result);
			
			var line=this.result;
			line=line.split("\r\n");
			//console.log(line);
			
			var html=(rggroup_s+rghost_s+rghost_text_s+regex_demohost+rgxxx_e+rgxxx_e+rglist_itemadd+rglist_s+rglist_item_s+rglist_item_text_s+"<xmp>"+regex_demoitem1+"</xmp>"+rgxxx_e+rgxxx_e+rglist_item_s+rglist_item_text_s+"<xmp>"+regex_demoitem2+"</xmp>"+rgxxx_e+rgxxx_e);
			
			var hostlist=new Array();
			var rglist=new Array();
			var i=0,j=0,n=0;
			for(i=0;i<line.length;i++){
				//console.log(line[i]);
				if(line[i].substring(0,1)=="^"){
					hostlist[j]=line[i];
					
					if(j>0){
						var setvalue={};
						setvalue[hostlist[j-1]]=rglist;
						chrome.storage.local.set(setvalue, function() {
							console.log('save '+setvalue);
							
						});
					}
					
					html+=(rgxxx_e+rgxxx_e+rggroup_s+rghost_s+rghost_text_s+hostlist[j]+rgxxx_e+rghost_icon+rgxxx_e+rglist_itemadd+rglist_s);
					
					j++;
					rglist=new Array();
					n=0;
					
				}
				else if(line[i].substring(0,1)=="\t"){
					rglist[n]=line[i].substring(1);
					
					html+=(rglist_item_s+rglist_item_text_s+"<xmp>"+rglist[n]+"</xmp>"+rgxxx_e+rglist_item_icon+rgxxx_e);
					
					n++;	
				}
			}
			if(j>0){
				var setvalue={};
				setvalue[hostlist[j-1]]=rglist;
				chrome.storage.local.set(setvalue, function() {
					console.log('save '+setvalue);
					
				});
			}
			html+=(rgxxx_e+rgxxx_e);
			
			//console.log(hostlist);
			chrome.storage.local.set({'hostlist':hostlist}, function() {
				console.log('save hostlist:'+hostlist);
			});
			
			//console.log(html);
			chrome.storage.local.set({"html":html}, function() {
				console.log('save html:'+html);
				
				updataregex();
			});
			
		};

	
		reader.readAsText(file,'gb2312');
		console.log("read");
	}
});
