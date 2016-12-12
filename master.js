$(function(){
   //dom
  var $machineStatus = $('.machine-status');
  var $mStatusContent = $machineStatus.find('.machine-content');
  var $machineWorkMode = $('.machine-workmode');
  var $machineTurn = $('.machine-turn');
  var $macWorkIngstatus = $machineTurn.find('.machine-working');
  var $cormodeLay = $('.curmode-overlay');
  //value
  var dpRem = parseInt($('html').css('fontSize'));  //单位rem
  var h = ($mStatusContent.height()/dpRem).toFixed(6);

  //arguments
  var workStatus = ['待机','自检','睡眠','暂停中','工作中','微焖','完成'];
  var workType = ['蔬菜','豆浆','五谷','DIY','云食谱'];
  var bType = ['无杯体','有杯体'];
  var errcode = ['开路','短路'];
  var errlist = []; //存取错误状态

  //init
  $mStatusContent.find('.contwrap').css('height', h+'rem');
  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView : 4,
    onTouchEnd: function(swiper, event){
      // console.log(swiper.activeIndex);
    }
  });

  //render
  function setWorkStatus(data){
    //设置当前状态
    setNowStatus(data);
    //set Mode
    // initUislide(data.CurrentMode-1);
    if(data.CurrentMode == 0 || data.CurrentMode == 5){
      $machineWorkMode.find('.swiper-slide').removeClass('active');
    }else{
      var d;
      d = data.CurrentMode == 6 ? 4 : (data.CurrentMode-1);
      $machineWorkMode.find('.swiper-slide').eq(d).addClass('active').siblings().removeClass('active');
      mySwiper.slideTo(2);mySwiper.slideTo(0);
      setTimeout(function(){
        d<4 ? mySwiper.slideTo(0) : mySwiper.slideTo(2);
      },2000)

    }
    //依据设备工作状态设置
    deviceStatusReturn(data);
    setBtn(data);
  }

  //SetStatus
  function setNowStatus(data){
    var d;
    if(data.CurrentMode == 0 || data.CurrentMode == 5){
      d = 8; //undefined
    }else if(data.CurrentMode == 6){
      d = 4;
    }else {
      d = data.CurrentMode -1;
    }
    $machineStatus.find('.speed p:first').find('i').text(data.CurrentSpeed); //speed
    $machineStatus.find('.time p:first').find('i').text(data.CurrenttotalRemainTime); //reTime
    $machineStatus.find('.start-type p:first').find('i').text(bType[data.CupStartUp]||'-'); //杯体
    $machineStatus.find('.temperature p:first').find('i').text(data.CurrentTemp); //温度
    $machineStatus.find('.mode .type').text(workType[d]||'--'); //模式
    $machineStatus.find('.work-status .type').text(workStatus[data.WorkState]||'--'); //工作模式

    if(data.ErrCode != 0){
      $('.warning-tips').show();
      if(!!data.ErrCode && errlist.indexOf(data.ErrCode) == -1){
        errlist.push(data.ErrCode);
        setWarnTips();
      }
    }else {
      errlist = [];
      $('.warning-tips').hide();
    }
    setWarningTips();
  }
  function setWarnTips(){
    if(errlist.length==0){
      $('.warn-info .content').empty().append('<p>暂无告警信息</p>');
    }else {
      var doc = document.createDocumentFragment();
      for(var i=0; i<errlist.length; i++){
        var $item = $(['<div class="warn-item">',
                    '  <h3></h3>',
                    '  <p></p>',
                    '</div>'].join(' '));
        $item.find('h3').text(i+'、告警');
        $item.find('p').text(errcode[i]);
        $(doc).append($item);
      }
      $('.warn-info .content').empty().append(doc);
    }
  }
  function setWarningTips(){
    var len = errlist.length;
    var $em = $machineStatus.find('.warning .num');
    if(len > 0){
      if(len>=10){
        len = '9+';
      }
      if($em.find('em').length != 0){
        $em.find('em').text(len)
      }else{
        $em.append('<em class="tips">'+len+'</em>');
      }
    }else {
      $machineStatus.find('.warning .num em').remove();
    }
  }

  //SetDeviceStatus
  function deviceStatusReturn(data){
    if(OJS.device.onlineStatus){
      // $machineTurn.show();
      if(data.WorkState < 3 ){
        $machineTurn.hide();
        $macWorkIngstatus.hide();
        // if(data.CurrentMode >0 && data.CurrentMode < 4 ){
        //   $machineTurn.find('.turn-wrap').show();
        //   $macWorkIngstatus.find('.working-wrapper').empty();
        // }else {
        //   $machineTurn.find('.turn-wrap').hide();
        // }
      }else {
        // $machineTurn.find('.turn-wrap').hide();
        $macWorkIngstatus.find('.machine-title').text('工作中');
        if( data.WorkState == 3){
          $macWorkIngstatus.find('.machine-title').text('工作暂停');
          // $machineTurn.find('.turn-wrap').hide();
          $macWorkIngstatus.find('.working-wrapper').empty();
          var $eme4 = $('<p class="success"><i></i>工作暂停中···</p>');
          $macWorkIngstatus.find('.working-wrapper').append($eme4);
        }else if( data.WorkState == 6) {
          $macWorkIngstatus.find('.machine-title').text('工作完成');
          // $machineTurn.find('.turn-wrap').hide();
          $macWorkIngstatus.find('.working-wrapper').empty();
          var $eme4 = $('<p class="success"><i></i>大功告成！赶快享受吧:)</p>');
          $macWorkIngstatus.find('.working-wrapper').append($eme4);
        }else if( data.WorkState == 4 || data.WorkState == 5) {
          $macWorkIngstatus.find('.working-wrapper').empty();
          if($macWorkIngstatus.find('.times,.temp,.speed').length != 0 ){
            $macWorkIngstatus.find('.times span').text(data.CurrentStepRemainTime);
            $macWorkIngstatus.find('.temp span').text(data.CurrentTemp);
            $macWorkIngstatus.find('.speed span').text(data.CurrentSpeed);
          }else {
            var $eme1 = $('<p class="times"><i></i>剩余时间：<span>'+data.CurrentStepRemainTime+'</span>秒</p>');
            var $eme2 = $('<p class="temp"><i></i>当前温度：<span>'+data.CurrentTemp+'</span>度</p>');
            var $eme3 = $('<p class="speed"><i></i>当前速度：<span>'+data.CurrentSpeed+'</span>档</p>');
            $macWorkIngstatus.find('.working-wrapper').append($eme1,$eme2,$eme3);
          }
        }else {
          $machineTurn.find('.turn-wrap').hide();
        }
        $machineTurn.show();
        $macWorkIngstatus.show();
      }
    }else {
      // $machineTurn.hide();
      $macWorkIngstatus.find('.working-wrapper').empty();
      var $eme5 = $('<p class="success"><i></i>设备不在线</p>');
      $macWorkIngstatus.find('.working-wrapper').append($eme5);
      $machineTurn.show();
      $macWorkIngstatus.show();
    }
  }

  //SetBtn
  function setBtn(data){
    var tit = '';
    if(data.WorkState == 3 || data.WorkState == 4 || data.WorkState == 5){
      if(data.WorkState == 3)  {
        tit = '暂停中，再次点击将关机';
        $('.tips-bottom').show()
      }else {
        tit = '暂停';
        $('.tips-bottom').hide()
      }
    }else {
      tit = '关机';
      $('.tips-bottom').hide()
    }
    $machineTurn.find('.startBtn').text(tit);
  }

  //Event
  var slideTouchFlag;
  $machineStatus.on('touchend', '.arrow', function(){
    var _this = $(this);
    var $contwrap = $mStatusContent.find('.contwrap');
    if(!_this.attr('flag')){
      _this.attr('flag', true);
      _this.find('i').addClass('slide')
      $contwrap.css({
        height: 0
      });
      $contwrap.addClass('slide')
    }else {
      _this.removeAttr('flag');
      _this.find('i').removeClass('slide');
      $contwrap.css('height', h+'rem');
      $contwrap.removeClass('slide')
    }
  })
  $machineWorkMode.on('touchstart', '.swiper-wrapper .swiper-slide', function(){
    slideTouchFlag = mySwiper.getWrapperTranslate('x');
    // OJS.app.toast(slideTouchFlag + 'start')
  });
  $machineWorkMode.on('touchend', '.swiper-wrapper .swiper-slide', function(event){
    var _this = $(this),
        _index = _this.index(),
        obj = OJS.device.getSensorData();
    var ls = mySwiper.getWrapperTranslate('x');
    // OJS.app.toast(ls + 'end')
    if(ls == slideTouchFlag){
      if(OJS.device.onlineStatus !=1){
        event.stopPropagation();
        OJS.app.toast("设备不在线，无法执行操作!");
        return false;
      }
      if(errlist.length != 0){
        event.stopPropagation();
        OJS.app.toast("设备存在告警，无法执行操作!");
        return false;
      }
      if(obj.WorkState !== 0 && obj.WorkState !== 2){
        //1,3,4,5,6
        event.stopPropagation();
        switch(obj.WorkState){
          case 1: OJS.app.toast("设备正在自检"); break;
          case 3: OJS.app.toast("设备处于暂停状态，需要从设备上操作才能继续任务！"); break;
          default: OJS.app.toast("设备有任务在进行中，请等待该任务完成后再执行其他操作！");
        }
        return false;
      }else {
        if(_index < 3){
          initUislide(_index);
          sendMandate({
            'SetTemp': {int: (_index+1)}
          }, function(){
            OJS.app.toast('请在设备上面按启动按钮开始工作!');
          });
          _this.addClass('active').siblings().removeClass('active');
        }else if(_index == 3) {
          $cormodeLay.show();
          var o = eq5; //本地数据 data.js
          $cormodeLay.find('.wrap-diy').children().each(function(i,e){
            if($(e).hasClass('machine-items')){
              $(e).Uislidebar(o[i]);
            }
          });
          var desc = [-10, 1, 0];
          $('.ui-slider-bar', $cormodeLay).each(function(i,e){
            $(e).data('val', desc[i]);
          });
        }else if(_index == 4) {
          location.href="./cloundlist.html";
        }
      }
    }else {
      event.stopPropagation();
      return false;
    }
  });
  $cormodeLay.on('touchend', '.setDiyBtn', function(e){
    e.preventDefault();
    var arr = [];
    if(OJS.device.onlineStatus !=1){
      event.stopPropagation();
      OJS.app.toast("设备不在线，无法执行操作!");
      return false;
    }
    if(errlist.length != 0){
      event.stopPropagation();
      OJS.app.toast("设备存在告警，无法执行操作!");
      return false;
    }
    $('.ui-slider-bar', $cormodeLay).each(function(i,e){
      arr.push($(e).data('val'));
    });
    sendMandate({
      'SetTemp': {int: +4},
      'SetSpeed': { int: +arr[1]},
      'SetMaxTime': {int: +arr[2]}
    }, function(){
      setTimeout(function(){
        $cormodeLay.hide();
        OJS.app.toast('请在设备上面按启动按钮开始工作!');
      },800)
    })
  });
  $cormodeLay.on('touchend', '.wrap-diy .close', function(){
    // var data = OJS.device.getSensorData();
    // setWorkStatus(data);
    $cormodeLay.hide();
  });

  $machineTurn.on('click', '.startBtn', function(){
    if(OJS.device.onlineStatus !=1){
      event.stopPropagation();
      OJS.app.toast("设备不在线，无法执行操作!");
      return false;
    }else if(errlist.length != 0) {
      event.stopPropagation();
      OJS.app.toast("设备存在告警，无法执行操作!");
      return false;
    }
    var data = OJS.device.getSensorData('WorkState');
    var status;
    (data == 4 || data == 5) ? status = 1 : status = 2;
    sendMandate({
      'PowerControl': {int: +status}
    }, function(status){
      if(status == 1) {
        OJS.app.toast("设备已暂停!");
      }else {
        OJS.app.toast("设备已关机!");
      }
    })
  })
  $machineStatus.on('touchend', '.warning', function(){
    setWarnTips();
    $('.warn-info').show()
  })
  $('.dialog.warn-info').on('touchend', function(event){
    event.stopPropagation();
    $(this).hide();
    return false
  });
  $('.dialog .info').on('touchend', function(event){
    event.stopPropagation();
  });
  $('.warning-tips').on('touchend', '.close', function(){
    $('.warning-tips').hide();
  })

  function sendMandate(_o,cb){
    //SetTemp : 工作模式
    var defaults = {
        "PowerControl": {int: 0},
        "SetTemp": {int: 0},
        "SetSpeed": {int: 0},
        "SetMaxTime": {int: 0},
        "MenuStepTotal": null,
        "MenuID": null,
        "IsHot": null,
        "Step1Temp":null,
        "Step1Speed": null,
        "Step1Time": null,
        "MenuStep2Temp": null,
        "MenuStep2Speed": null,
        "MenuStep2Time": null,
        "MenuStep2IsHot": null,
        "MenuStep3Temp": null,
        "MenuStep3Speed": null,
        "MenuStep3Time": null,
        "MenuStep3IsHot": null,
        "MenuStep4Temp": null,
        "MenuStep4Speed": null,
        "MenuStep4Time": null,
        "MenuStep4IsHot": null,
        "MenuStep5Temp": null,
        "MenuStep5Speed": null,
        "MenuStep5Time": null,
        "MenuStep5IsHot": null,
        "MenuStep6Temp": null,
        "MenuStep6Speed": null,
        "MenuStep6Time": null,
        "MenuStep6IsHot": null
      }
    var o = $.extend({}, defaults, _o);
    // console.log(o);
    var result = OJS.device.sendNotify(o, function(){
      OJS.app.toast('命令已经下发');
    }, function(){
      !!cb && cb();
      var data = OJS.device.getSensorData();
      setTimeout(function(){
        setWorkStatus(data);
      }, 800)

      // OJS.app.toast('请在设备上面按启动按钮开始当前模式!');
      // console.log("UPDATE");
    });
    if(!result){
      OJS.app.toast("命令发送失败, 无法连接到服务器!")
    }
  }

  function initUislide(_index){
    switch(_index){
      case 0: setArgument(eq1); break;
      case 1: setArgument(eq2); break;
      case 2: setArgument(eq3); break;
      case 3: setArgument(eq4); break;
      default:;
    }
    function setArgument(obj){
      $('.machine-turn .turn-wrap').children().each(function(i,e){
        $(e).Uislidebar(obj[i]);
      });
    }
  }

  //无网络判断
  function notNetwork(){
    setInterval(function(){
      OJS.app.hasNetWork(function(data){
        if(data){
          OJS.ui.hideOfflineMask();
          // OJS.app.toast(data+'有网络');
        }else {
          OJS.ui.showOfflineMask();
          // OJS.app.toast(data+'无网络');
        }
      })
    }, 5000)
  }
  //设备ready进入判断 - -
  var t, blooen = false;
  OJS.bindAppReady(function(){
    $('.dialog.login').show();
    t = setInterval(function(){
      if(blooen){
        clearInterval(t);
        $('.dialog.login').hide();
        bindReadyIf();
      }
    },1800)
  })
  var bindReadyFlag = false;
  function bindReadyIf(){
    var clReady = setTimeout(function(){
      if(!bindReadyFlag){
        OJS.app.alert("服务器数据请求失败！");
        clearTimeout(clReady)
      }
    }, 12000)
  }


  OJS.bindReady(function(){
    blooen = true;
    bindReadyFlag = true;
    notNetwork();
    OJS.device.bindPushData({
      'deviceStatusChange': function(data){
        // if(!data || !data.CurrentSpeed) {data = defaults;}
        if(OJS.device.onlineStatus == 1){
          setWorkStatus(data);
          initUislide(data.CurrentMode-1);
        }else {
          OJS.app.toast("设备不在线，无法更新数据！")
        }
      }
    })
  })

})
