
function sendMessage(msg)
{
	chrome.tabs.query({active:true,currentWindow:true},
	function(tabs){
		chrome.tabs.sendMessage(tabs[0].id,msg,
			function(response){
				if(response!=null)
				{
					console.log(response);
					document.getElementById('list').innerHTML="<tr><td><a id=\"again\" title=\"点击再次尝试\">隐藏条目</a></td><td><a target=\"_blank\" href=\"options.html\" title=\"点击配置匹配规则\">匹配规则</a></td><td></td></tr>"+response.list;
					for(var i=0;i<(response.count>4?4:response.count);i++)
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



