---
  layout: oneapp
  title: oneApp js sdk api
  indexActive: active
---

# 快速开始

JSSDK是面向开发者的开放平台，提供App底层服务，通用规范的UI组件，和面向用户的底层API，开发者可以使用我们通用的UI组件组件设备页面，也可以选择自定义设备功能，开发出个性化定制设备页面，我们对于开发者的要求是：

# 主设备api

<h3 id="_1">可读属性</h3>

+ `OJS.device.id`获取设备id

+ `OJS.device.onlineStatus`在线状态：1在线，0不在线

<h3 id="_1">设备状态</h3>

<h4 id="OJSdevicegetSensorData">OJS.device.getSensorData(sensorName)</h4>

获取sensorName对应的传感器的最新值

<h4 id="OJSdevicesendNotify">OJS.device.sendNotify()</h4>

指定设备id，发送即时通知(命令)

<h4 id="OJSdevicebindPushData()">OJS.device.bindPushData()</h4>

绑定平台推送的设备状态变化信息，包括：设备在线状态变更，传感数据属性值变化，设备告警事件，通知确认及响应

   OJS.device.bindPushData({
       'netWorkStatusChange': function(data){
           console.log('netWorkStatusChange', data);
       }
   }); //在线状态变更

   OJS.device.bindPushData({
       'deviceStatusChange': function(data){
           console.log('deviceStatusChange', data);
       }
   }); //传感器上报了数据

# APP资源

<h3 id="OJSappisNetworkOK">OJS.app.isNetworkOK()</h3>

判断当前手机是否有网络

# UI

<h3 id="OJSUInavigationConfig">OJS.UI.navigationConfig()</h3>

配置顶部导航按钮（内容包括：返回键、更多）

<h3 id="OJSUIloadPage">OJS.UI.loadPage()</h3>

跳转到新页面

<h3 id="OJSUIback">OJS.UI.back()</h3>

返回上一页面

<h3 id="OJSUIalert">OJS.UI.navigationConfig()</h3>

统一确认对话框

<h3 id="OJSUItoast">OJS.UI.toast()</h3>

统一信息提示

<h3 id="OJSUIshowNotOnlineMask">OJS.UI.toast()</h3>

显示设备断网遮罩层

<h3 id="OJS.UI.hideNotOnlineMask">OJS.UI.hideNotOnlineMask()</h3>

隐藏设备断网遮罩层

