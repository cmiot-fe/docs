---
  layout: fe
  title: 设备云smarty书写规范
---

## 设备云smarty书写规范

### Smarty语法

Smarty版本使用最新的smarty3，左分隔符：{ % ，右分隔符：% }

Smarty文件的后缀使用 tpl ，方便phpStorm识别。

Smarty中文文档： [http://www.smarty.net/docs/zh_CN/smarty.for.designers.tpl](http://www.smarty.net/docs/zh_CN/smarty.for.designers.tpl)


### 文件夹组织

模板使用继承机制，顶级模块为common/base.tpl，其他模板都应该从顶层模板里继承。顶层模块里定义了各种代码块，书写模板时只需要对需要填充的代码块进行填充。

模块按照页面级别划分并建立相应文件夹，例如首页放在base文件夹中

模板文件直接放在模块文件夹下，不另外建立文件夹存放模板文件。


### 模板文件顶部说明

说明格式：

    <%**
    * Copyright (c) ${YEAR} zhubajie.com, Inc. All Rights Reserved
    *
    * @fileoverview 模板文件
    * @author Libmw (limengjun@iot.chinamobile.com)
    * @date ${DATE}
    *%>

PhpStorm的设置：

* File => New => Edit File Templates

* 点击绿色"+"号，输入Name：smarty，Extention：tpl，再把上面的格式复制到模板编辑框里即可。

### Smarty的一些重要规则

继承后的最终模板，后面的block可以使用前面的block里定义的变量。


模板<strong>可以</strong>使用inc文件中的function，而且<strong>可以跨block</strong>使用。但是要先定义再使用。


inc文件<strong>可以</strong>使用模板里的变量，而模板<strong>不可以</strong>使用inc文件里的变量。<br>


继承以后的最终模板，可以通过

    { %block name="layout_before" prepend% }
        { %$menu_main = 'monitor'% }
    { %/block% }

来定义变量给父模板使用