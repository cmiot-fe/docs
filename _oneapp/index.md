---
  layout: oneapp
  title: oneApp js sdk api
  indexActive: active
---

# 快速开始

JSSDK开发者在开发和物APP的设备操作界面所用到的sdk，通过JSSDK可以调用设备的各种数据、调用原生的手机api，向设备发送命令。

### 2.0.1更新概要
* 增加了导航栏标题与背景色的自定义方法;
* 增加了设备断网处理


# 引入方式

<h4 id="jsbind">jsSDK引入地址</h4>

    //appapi.heclouds.com/sdk/ojs-2.0.1.min.js

<h4 id="cssbind">css引入地址（可不引入，即只在使用showOfflineMask方法的时候需要引入）</h4>

    //appapi.heclouds.com/sdk/ojs.min.css?v=1.0 

`注意事项`

jsSDK内包含了zepto库，所以开发的时候无需再引入其他操作dom的库，比如:jquery、zepto等。另外jsSDK内部有提供当设备离线的时候显示的样式。
jsSDK返回的值为json对象，不需要转换。

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

+ `OJS.userId`获取用户ID

+ `OJS.secret`获取用户secret

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

调用UI的时候需要在bindAppReady后才能调用成功

<h3 id="OJSnavigationConfig">OJS.app.navigationConfig(title, background, color)</h3>

修改顶部导航栏及标题

    OJS.app.navigationConfig(title, background, color)

* title: 标题文字
* background: 背景颜色，目前仅支持hex颜色（`#ffffff`）
* color: 字体颜色：浅色或者深色`light | dark`


<h3 id="OJSapphasNetWork">OJS.app.hasNetWork(callback)</h3>

判断当前手机是否有网络

    OJS.app.hasNetWork(function(data){debug(data ? '当前有网络' : '当前无网络')})


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

传递true或者false，显示设备断网详情(ojs会在设备不在线的时候主动调用)

    OJS.ui.onlineStatus()

显示设备断网遮罩层

    OJS.ui.showOfflineMask()

隐藏设备断网遮罩层

    OJS.ui.hideOfflineMask()



# 通知下发

下发命令的时候，只需要将当前的值以json形式传过去就可以：

    {
        state: true
    }

>如果当前值有不可为空的也需要同时传值过去

~~可参考ONENET开发文档 :  [私有协议模板和内容](http://open.iot.10086.cn/doc/art271.html#70 )~~

# 调试

可以使用chrome调试工具进行调试 chrome://inspect

# dopm包规范

将页面做好后需要在`当前目录`打包上传至onenet平台

dopm包格式应如下：

    1. 代码都应该是UTF-8编码，不然中方可能乱码。

    2. 包名为dopm.zip

    3. home-config.js用于app content展示(这个是显示的是设备列表页面上面信息的,不是进入h5页面里面的内容)

包结构

    dopm (设备的model name)目录层数5，每层目录10，总文件200
    ├── home-config.js (设备配置文件 用于配置首页展示的设备信息)必须有
    ├── app.html （入口文件，文件名必须使用app.html用于打包）必须有
    ├── app.js （入口JS文件，文件名必须使用app.js用于打包js文件）必须有
    ├── css 
    │   ├── private.css 
    │   ... xxx.css
    ├── js
    │   ├── private.js 
    │   ... xx...js
    ├── b
    │   ├── js
    │   ... app.html
    │   ... app.js
    │   ├──css

attr_name传感器模板中的属性

vaule_enum属性枚举展示值

unit 属性展示单位

nick_name属性前端展示值

例子：

    var config =[
        {
            "attr_name":"属性名1",
            "value_enum":{"1":"test","2":"test1"},
            "unit":"℃",
            "nick_name":"展示名称"
        },
        {
            "attr_name":"属性名1",
            "value_enum":{"1":"test","2":"test1"},
            "unit":"℃",
            "nick_name":"展示名称"
        }
    ]
    