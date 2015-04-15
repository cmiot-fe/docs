---
  layout: fe
  title: tips提示模块
---

<style>
    .button{
        margin: 10px;
    }
</style>

## IOT.tips方法

使用IOT.tips可以在页面弹出一个提示。

tips方法是公用方法，默认已经打包到公用js文件里，无需单独引入

## 使用方法

    /**
    * @param content {String}  弹出内容
    * @param [type] {String} 内容类型 支持success/error/warning/info，默认success
    * @param [timeout] {String} 弹层出现的时间，单位为毫秒，默认3000
    */
    IOT.tips(content, type, timeout);




### DEMO

<button onclick="IOT.tips('登录成功');" class="button">IOT.tips('登录成功')</button>
<button onclick="IOT.tips('系统错误', 'error');" class="button">IOT.tips('系统错误', 'error')</button>
<button onclick="IOT.tips('提交失败，请稍后再试', 'warning');" class="button">IOT.tips('提交失败，请稍后再试', 'warning')</button>
<button onclick="IOT.tips('欢迎来到设备云', 'info');" class="button">IOT.tips('欢迎来到设备云', 'info')</button>
<button onclick="IOT.tips('我要显示10秒才消失', 'success', 10000);" class="button">IOT.tips('我要显示10秒才消失', 'success', 10000)</button>

**注意** 由于当前页面无法拉取字体图标，demo里的图标会显示不正常