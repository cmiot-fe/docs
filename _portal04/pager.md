---
  layout: portal04
  title: OneNET 4.0 UI standards
---
<div class="show-pager" style="background-color: #fff;" data_page="1" data_show_size="false" data_total="800" data_page_url="/textpage?page=#page#" data_page_size="6"></div>
<p>参数： page 当前第几页 从1开始</p>
<p>参数： page_size 每页几条记录，默认10</p>
<p>参数： total 总共记录数</p>
<p>参数： page_url 翻页url，其中#page#是页数部分</p>
<p>参数： [align] 分页内容显示位置，可选：left、right、center，默认为center</p>
<p>参数： [show_total] 是否显示总条数，默认为'true'，注意需是字符串，js设置时，为bool类型</p>
<p>参数： [show_size] 是否显示每页条数，默认为'true'，注意需是字符串，js设置时，为bool类型</p>
<p>参数： [show_elevator] 显示电梯，可以快速切换到某一页，默认为'true'，注意需是字符串，js设置时，为bool类型</p>
<p>参数： [visible_num] 翻页区域能容纳的最多格子数量，包含上一页下一页、省略号，默认为12个，最少7个。</p>
<p>例子：</p>
<p>页面提供一个容器： </p>
<pre><code class="lang-js hljs html"><span class="hljs-comment">&lt;div class="show-pager" data_page="1" data_show_size="false" data_total="800" data_page_url="/textpage?page=#page#" data_page_size="6"&gt;&lt;/div&gt;</span></code></pre>
<p>详解： 容器中可以加入配置，配置名称为以上配置名称前加data_，比如data_show_size、data_total</p>
<p> 引入js： </p>
<pre><code class="lang-js hljs html"><span class="hljs-comment">&lt;script type="text/javascript" src="../common/js/module/pager.js"&gt;&lt;/script&gt;</span>
</code></pre>
<p> 初始化： </p>
<pre><code class="lang-js hljs html"><span class="hljs-comment">
var page = new Pager('.show-pager', {
    align:'left',
    page_url: '/aaaaa?page=#page#',
    total: 200,
    page_size: 5
}, function(page){
    console.log(page);
    this.aja
    return {total: 300};
});
</span></code></pre>
<p> 详解：</p>
<p> 参数1：容器className或者id，需要跟.或者#</p>
<p> 参数2：配置对象，如果为null，则读取页面容器标签上的配置，如为Object则读取传入的配置</p>
<p> 参数3：function，如过为null或不传，则翻页为页面跳转，如为function，翻页则会回调如这个函数，并传入新的page值，如果查询数据成功，则需返回一个{total: 300};</p>
<p> 其中的total为新的总数据个数,如返回false,则分页不会更新。</p>

<p>如果需手动更新配置，则调用page.setOptions({})，传入新的配置。</p>
<p>注意：因为有样式，所以需要引入global.less文件。</p>
<script>
    window.IOT = {tr: function(msg){return msg;}};
</script>
<script type="text/javascript" src="resource/js/pager.js"></script>
<script>
    (function(){
        var page = new Pager('.show-pager', {
            align:'left',
            page_url: '/aaaaa?page=#page#',
            total: 200,
            page_size: 5
        }, function(page){
            console.log(page);
            this.aja
            return {total: 300};
        });
    })();
</script>