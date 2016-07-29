---
  layout: fe
  title: Passport 浮层登录组件
---


## Passport类

使用IOT.Passport模块创建浮层登录。


Passport模块是公用模块，默认已经打包到公用js文件里，无需单独引入

## 使用方法

    IOT.passport.login(function(){
        successCallback(); //登录成功后执行的方法
    });

    IOT.passport.isLogin(); //返回当前是否登录


