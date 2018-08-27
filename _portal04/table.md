---
  layout: portal04
  title: OneNET 4.0 UI standards
---
<div class="table-style">
    <div class="table-style-header">
        <ul class="table-style-header-ul">
            <li class="active" data-key="item1">微信用户端</li>
            <li data-key="item2">商户端APP</li>
            <li data-key="item3">商户管理云平台</li>
            <li data-key="item4">智能云小票机</li>
        </ul>
    </div>
    <div class="table-style-body">
        <div class="table-style-body-item table-item-show" id="item1">111111</div>
        <div class="table-style-body-item" id="item2">2222222</div>
        <div class="table-style-body-item" id="item3">333333</div>
        <div class="table-style-body-item" id="item4">44444444</div>
    </div>
</div>
<pre><code class="lang-js hljs html"><span class="hljs-comment">
    &lt;div class="table-style"&gt;
        &lt;div class="table-style-header"&gt;
            &lt;ul class="table-style-header-ul"&gt;
                &lt;li class="active" data-key="item1"&gt;微信用户端&lt;/li&gt;
                &lt;li data-key="item2"&gt;商户端APP&lt;/li&gt;
                &lt;li data-key="item3"&gt;商户管理云平台&lt;/li&gt;
                &lt;li data-key="item4"&gt;智能云小票机&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;div class="table-style-body"&gt;
            &lt;div class="table-style-body-item table-item-show" id="item1"&gt;111111&lt;/div&gt;
            &lt;div class="table-style-body-item" id="item2"&gt;2222222&lt;/div&gt;
            &lt;div class="table-style-body-item" id="item3"&gt;333333&lt;/div&gt;
            &lt;div class="table-style-body-item" id="item4"&gt;44444444&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</span></code></pre>
- header的个数不固定，多少都行，就是多了可能显示不好看
- li的data-key和下方内容div的id对应。
- 默认选中的内容，li需添加class="active"；内容div需添加class="table-item-show"。