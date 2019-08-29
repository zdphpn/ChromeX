
## DIV 隐藏(Hiding)

### 演示
#### W3School HTML5
![DIV 隐藏(Hiding)演示](http://wx4.sinaimg.cn/large/88b8edc9ly1g64uejt872g20tm06fk7h.gif)

### POPUP页面
#### 隐藏条目
点击可再次触发隐藏规则，显示最多5条隐藏条目，条目最后的复选框可选中暂时显示当前隐藏的条目
#### 匹配规则
点击跳转OPTIONS页面
#### 下角标
点击访问本仓库

### OPTIONS页面
管理匹配规则，使用正则表达匹配当前访问URL及其下的条目规则
#### ^https://www.baidu.com/s
* ^<div [\S\s]{5,50} style="display:block !important;visibility:visible !important
* ^<div class="result c-container".*<span class="m ec_tuiguang_pplink">广告</span>
#### ^https://www.so.com/s
* ^<div id="e_haosou_fw_picture"
* ^<a class="e_haosou_fw_bg_title"
#### ^https://blog.csdn.net
* ^<div id="dmp_ad_58"
* ^<div id="kp_box_57"
* ^<div class="csdn-tracking-statistics
#### ^https://www.w3school.com.cn
* ^<div id="ad"
* ^<div id="ad_head"
#### ^https://segmentfault.com
* ^<ins class="adsbygoogle"

### 说明
前端新手，代码仅供参考
