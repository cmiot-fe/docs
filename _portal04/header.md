---
  layout: portal04
  title: OneNET 4.0 UI standards
---
<div class="header" style="background-color: #000000;">
    <div class="header-body">
        <a href="#" class="header-logo"></a>
        <div class="header-menu">
            <ul class="header-menu-ul">
                <li data-index="1" class="header-menu-ul-li type-2 active">
                    <span>产品服务</span>
                </li>
                <li data-index="2" class="header-menu-ul-li type-2">
                    <span>解决方案</span>
                </li>
                <li data-index="3" class="header-menu-ul-li type-1">
                    <span>合作伙伴</span>
                </li>
                <li class="header-menu-ul-li">
                    <a href="#" class="header-menu-a">
                        <span>开发文档</span>
                    </a>
                </li>
                <li class="header-menu-ul-li">
                    <a href="#" class="header-menu-a">
                        <span>物联工场</span>
                    </a>
                </li>
            </ul>
            <div class="header-menu-li-menu">
                <ul class="header-menu-li-menu-1">
                    <li><a href="#">MQTT产品开发套件</a></li>
                    <li><a href="#">NB-IoT产品开发套件</a></li>
                    <li><a href="#">OneNET开发板</a></li>
                    <li><a href="#">中移和物</a></li>
                    <li><a href="#">轻应用平台</a></li>
                    <li><a href="#">视频能力</a></li>
                </ul>
                <ul class="header-menu-li-menu-2">
                    <li><a href="#">都市消防解决方案</a></li>
                    <li><a href="#">畜牧物联网解决方案</a></li>
                    <li><a href="#">智慧停车解决方案</a></li>
                    <li><a href="#">智慧井盖解决方案</a></li>
                    <li><a href="#">智慧餐厅解决方案</a></li>
                    <li><a href="#">智慧路灯解决方案</a></li>
                    <li><a href="#">智慧光伏解决方案</a></li>
                    <li><a href="#">共享经济解决方案</a></li>
                    <li><a href="#">光交箱监控解决方案</a></li>
                    <li><a href="#">扬尘监控解决方</a></li>
                </ul>
                <ul class="header-menu-li-menu-3">
                    <li><a href="#">OCP计划</a></li>
                    <li class="line"><a href="#">产业联盟</a></li>
                </ul>
            </div>
        </div>
        <div class="header-user">
            <div class="header-develop">
                <a href="#">
                    <div class="header-developer-icon"></div>开发者中心
                </a>
            </div>
            <ul class="header-user-is-login">
                <li class="header-user-head">
                    <div class="header-user-head-body">
                        <img src=""/>
                    </div>
                    <div class="h-u-h-c-b">
                        <div class="header-user-head-content">
                            <p class="h-u-h-c-username">Username</p>
                            <ul class="h-u-h-c-setting">
                                <li><a href="#"><i class="icon iconfont icon-user"></i>个人资料</a></li>
                                <li><a href="#"><i class="icon iconfont icon-setting"></i>安全设置</a></li>
                                <li><a href="#"><i class="icon iconfont icon-logout"></i>退出帐号</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="header-user-message">
                    <i class="icon iconfont icon-message"></i>
                    <span class="h-u-m-number">11</span>
                    <div class="h-u-m-m">
                        <div class="h-u-m-m-content">
                            <div class="h-u-m-m-header">
                                <span class="h-u-m-m-title">OneNET消息</span>
                                <a href="#">查看全部&nbsp;></a>
                            </div>
                            <ul class="h-u-m-m-list">
                                <li><a href="#">缤纷有礼，1分钟赢小礼物，视频能力是不是12138</a><span>2017-02-02</span></li>
                                <li><a href="#">缤纷有礼，1分钟赢小礼物，视频能力是不是12138</a><span>2017-02-03</span></li>
                                <li><a href="#">缤纷有礼，1分钟赢小礼物，视频能力是不是12138</a><span>2017-02-04</span></li>
                                <li><a href="#">缤纷有礼，1分钟赢小礼物，视频能力是不是12138</a><span>2017-02-05</span></li>
                                <li><a href="#">缤纷有礼，1分钟赢小礼物，视频能力是不是12138</a><span>2017-02-06</span></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<p style="margin-top: 40px;">smarty引入方法：</p>
<pre><code class="lang-js hljs html"><span class="hljs-comment">include file="../common/header.tpl" active=2 bc='#000000' usetype='usercenter'</span></code></pre>
<p>header可以直接引入就可</p>
<p>参数1：active，为默认选中的配置</p>
<p>参数2：bc，为Header背景颜色配置</p>
<p>参数3：usetype，要么不传，要么就传usercenter，为usercenter时则显示为用户中心的样式</p>
