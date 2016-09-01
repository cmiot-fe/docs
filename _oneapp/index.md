---
  layout: oneapp
  title: oneApp js sdk api
  indexActive: active
---

# 快速开始

JSSDK开发者在开发和物APP的设备操作界面所用到的sdk，通过JSSDK可以调用设备的各种数据、调用原生的手机api，向设备发送命令。

`测试地址`

<http://183.230.40.32/ojs/demo.html>

## 测试的时候在页面写死deviceID和token

为了让开发者在PC端调试页面，可以在开发的时候写死deviceID和token，这样PC端打开调试页面的时候便能顺利的得到设备的信息，也可以发送命令，但是无法调用OJS.app相关api。

token获取地址： <http://172.19.3.69:8082/subs_token/211994>

    var __DEBUG_DEVICE_ID = 211994;
    var __DEBUG_DEVICE_TOKEN = '6mzVvtJ7lXg=';

# 主设备api

<h4 id="OJSbindReady()">OJS.bindAppReady(callback)</h4>

    OJS.bindAppReady(function(){
        console.log('bindAppReady');
        OJS.app.toast('已经可以调用app的api了');
    });

因为OJS调用app的api需要先异步与app建立连接，因此需要注册此事件。在appReady前无法使用用OJS.app的api。

<h4 id="OJSbindReady()">OJS.bindReady(callback)</h4>

    OJS.bindReady(function(){
        console.log('bindReady', OJS.device.id, OJS.device.getSensorData());
    });

当OJS与app的api建立了连接，也与服务器建立了连接后并得到了设备当前数据后触发。在此之前无法获取设备的任何相关信息。

<h3 id="_1">可读属性</h3>

+ `OJS.device.id`获取设备id

+ `OJS.device.onlineStatus`在线状态：1在线，0不在线

<h3 id="_1">设备状态</h3>

<h4 id="OJSdevicegetSensorData">OJS.device.getSensorData(sensorName|sensorNameList)</h4>

获取sensorName对应的传感器的最新值。

sensorName如为字符串则获取一个传感器的值，sensorName若为数组则获取数组里所有传感器的值，sensorName若为空则返回所有

注意返回的传感器状态可能为undefined，因为传感器可能还并没有值。

<h4 id="OJSdevicesendNotify">OJS.device.sendNotify(message, sendCallBack, responseCallBack)</h4>

指定设备id，发送即时通知(命令)

发送成功返回true，发送失败返回false。发送失败的原因为socket已离线。

    var result = OJS.device.sendNotify({
        sayhello:'helloMyGirl'
    }, function(){
        console.log('命令已经下发');
    }, function(){
        console.log('设备已经收到命令！');
    });
    if(!result){
        console.log('命令发送失败，无法连接到服务器');
    }


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

<h3 id="OJSapphasNetWork">OJS.app.hasNetWork(callback)</h3>

判断当前手机是否有网络

    OJS.app.hasNetWork(function(data){debug(data ? '当前有网络' : '当前无网络')})

<h3 id="OJSUInavigationConfig">OJS.app.navigationConfig() 暂未实现</h3>

配置顶部导航按钮（内容包括：返回键、更多）

<h3 id="OJSUIloadPage">OJS.app.loadPage(url)</h3>

跳转到新页面

    OJS.app.loadPage('http://www.baidu.com')

<h3 id="OJSUIback">OJS.app.back()</h3>

返回上一页面，目前仅仅调用了一次history.back()

<h3 id="OJSUItoast">OJS.app.toast(message)</h3>

统一信息提示

    OJS.app.toast('toast的信息')

<h3 id="OJSUItoast">OJS.app.alert(title, message, button)</h3>

统一信息提示

    OJS.app.alert('标题', '内容', '按钮')

# UI

<h3 id="OJSUIshowNotOnlineMask">OJS.ui.showOfflineMask()</h3>

显示设备断网遮罩层

<h3 id="OJS.UI.hideNotOnlineMask">OJS.ui.hideOfflineMask()</h3>

隐藏设备断网遮罩层

