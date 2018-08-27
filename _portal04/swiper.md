---
  layout: portal04
  title: OneNET 4.0 UI standards
---
<div class="swiper-portal">
    <div class="swiper-left j-swiper" data-key="-1"></div>
    <div class="swiper-body" data-page-size="4">
        <div class="swiper-item" style="width: 25%; background-color: red;"></div>
        <div class="swiper-item" style="width: 25%; background-color: black;"></div>
        <div class="swiper-item" style="width: 25%; background-color: blue;"></div>
        <div class="swiper-item" style="width: 25%; background-color: yellow;"></div>
        <div class="swiper-item" style="width: 25%; background-color: grey;"></div>
    </div>
    <div class="swiper-right j-swiper" data-key="1"></div>
</div>
<pre><code class="lang-js hljs html"><span class="hljs-comment">
    &lt;div class="swiper-portal"&gt;
        &lt;div class="swiper-left j-swiper" data-key="-1"&gt;&lt;/div&gt;
        &lt;div class="swiper-body" data-page-size="4"&gt;
            &lt;div class="swiper-item" style="width: 25%;"&gt;&lt;/div&gt;
            &lt;div class="swiper-item" style="width: 25%;"&gt;&lt;/div&gt;
            &lt;div class="swiper-item" style="width: 25%;"&gt;&lt;/div&gt;
            &lt;div class="swiper-item" style="width: 25%;"&gt;&lt;/div&gt;
            &lt;div class="swiper-item" style="width: 25%;"&gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="swiper-right j-swiper" data-key="1"&gt;&lt;/div&gt;
    &lt;/div&gt;
</span></code></pre>

- 只需要设置每个的width  用百分比，并计算出一页显示多少个，写在上面的data-page-size中就可以了
- 每个块的width用百分比是因为，现在的页面内容宽度是随浏览器变化而变化的，所以固定死的width显示不好看
- 填值的话，一页3个，每个width就是33.3%  一页4个，就25%  以此类推