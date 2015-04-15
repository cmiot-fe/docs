---
  layout: fe
  title: 字体图标
---

## 字体图标 Fontello

fontello是一个字体图标生成工具，可以选取提供的备选图标，也可以自己加入svg图标，然后系统可以把所选图标打包成字体文件。


### 使用方法

* 1.打开fontello[官网](http://fontello.com),把`/resource/common/css/_inc/config.json`文件拖到官网页面中，就可以看到当前可以使用的所有图标

* 2.在需要使用图标的地方加上i标签：&lt;i class="icon-search">&lt;/i>，类名可以在官网的Customize Names页面查看

> **注意：**对于loading类型的图标，可以加上animate-spin类名让其旋转，注意ie9及其以下浏览器无法使用css旋转


### 修改字体图标步骤

* 1.在官网页面选好需要使用的图标后，**点击扳手图标，在Advanced font settings里取消勾选Hinting,否则生成的字体文件无法在firefox和ie下使用，**点击右上角的Download webfont

* 2.解压后把字体文件覆盖到common/css中，把解压后css/fontello.css里新增图标的css代码复制到/common/css/_inc/ui-fontello.less中，用解压后的config.json文件覆盖/common/css/_inc/config.json