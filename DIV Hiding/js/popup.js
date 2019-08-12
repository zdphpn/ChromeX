
function sendMessage(msg)
{
	chrome.tabs.query({active:true,currentWindow:true},
	function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,msg,
			function(response){
				if(response!=null)
				{
					console.log(response);
					document.getElementById('list').innerHTML="<tr><td><a id=\"again\">隐藏条目</a></td><td><a target=\"_blank\" href=\"options.html\">匹配规则</a></td><td></td></tr>"+response.list;
					for(var i=0;i<response.count;i++)
					{
						document.getElementById("cb"+i.toString()).addEventListener('change',function(){
							
							var id=this.id.toString();
							console.log(id);
							id=id.substring(2);
							id=parseInt(id);
							console.log(id);
							if(this.checked)
							{
								sendMessage({set:id});
							}
							else
							{
								sendMessage({reset:id});
							}
						});
					}
					document.getElementById('again').addEventListener('click',function(){
						sendMessage({again:0});
					});
				}
			});
	});
}

sendMessage({get:0});


