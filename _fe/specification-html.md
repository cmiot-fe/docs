---
  layout: fe
  title: 设备云html书写规范
---

## 设备云html书写规范

### 基本书写规范

代码必须缩进，使用tab(四个空格)缩进代码 `*`

使用&lt;!DOCTYPE html>声明 `*`

class和id命名用小写字母，数字组成，用“_”连接 `*`

元素的标签和属性名必须小写，属性值必须加双引号 `*`

作为JS的钩子的classname命名前面加上“j_”前缀 `*`

img、frame、iframe、embed标签src值不能为空

a标签的href值禁止使用javascript:void(0)，推荐使用&lt;a href="#" onclick="return false;" >...&lt;/a> `*`

注意表现和逻辑分离，标签内部禁止包含event。(特殊的需求，onload和onerror) *

禁止使用font及color等属性去定义文字样式，文字样式应该定义在CSS中 `*`

img标签尽量填写src和width、height属性、alt属性 `*`

表单外按钮推荐使用&lt;button>标签并且声明type属性来实现

尽量使用语义化标签

不要使用table来布局，在该使用table的时候大胆的用

javascript和style标签不需要写type属性和language

### 表单

表单元素对应的文本请用&lt;label>标签包含，并且for属性指向表单元素的id。 `*`

form标签禁止嵌套form。 `*`

表单元素的name禁止设置为action, enctype, method, novalidate, target, submit。会导致表单提交混乱 `*`

### 标签闭合

area, base, basefont, br, col, frame, hr, input, img, link, meta, param，此类标签为自闭合标签，写法&lt;tagname /&gt;

其他都是非自闭合标签，写法&lt;tagname&lt;&lt;/tagname&lt;

### 标签语义

#### 结构性元素

&lt;p>表示段落，只能包含内联元素，不能包含块级元素

&lt;div>用于布局。可包含任意元素

&lt;br/>换行

&lt;hr>水平分隔

h1-h6 h1表示当前页面标题，具有唯一性。使用时尽量不要跨级使用

&lt;blockquote>表示引用，可以包含多个段落

&lt;pre>表示一段格式化文本

#### 头部元素

&lt;title>每个页面有且仅有一个title

&lt;base>，用法&lt;base target="_blank">，用于大量链接都为新窗口打开的页面

&lt;style>样式标签

&lt;script>脚本标签

&lt;noscript>用户代理不支持javascript的情况下提供说明

#### 文本元素

&lt;a>存在href表示链接，不存在href且存在name表示锚点。（用作制作hover伪类样式除外）

em, strong表示语义强调

&lt;abbr>表示缩写

&lt;sub>&lt;sup>主要用于数学和化学公式，sup可用于脚注

&lt;span>对应于&lt;div>，联级的无含义标签

&lt;ins>&lt;del>表示从文档中增加和删除

#### 媒体元素

&lt;img>图片

&lt;object>可用于插入flash

&lt;iframe>内嵌页面

#### 列表元素

&lt;dl>关联列表，dd是对dt的解释

&lt;ul>无序列表

&lt;ol>有序列表

&lt;li>列表项，必须是ol或者ul的子元素