---
  layout: fe
  title: Dialog弹出窗模块
  extjs:  <script src="resource/dialog.js"></script>
---

<style>
    .button{
        margin: 10px;
    }
</style>

## Dialog类

使用IOT.Dialog模块创建一个弹出窗口。


Dialog模块是公用模块，默认已经打包到公用js文件里，无需单独引入

## 使用方法

    var dialog = new IOT.Dialog({
        title: '系统提示', //窗口标题的html，如果不设置则无标题
        content: '&lt;div class="ui-dialog-bd">&lt;p>欢迎！&lt;/p>&lt;/div>&lt;div class="ui-dialog-btn">&lt;a class="button j_dlg_close">关闭&lt;/a>&lt;/div>',
        //窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
        beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
        closeBtn: true, //是否有右上角关闭按钮
        className: '', //窗口最外层容器的类名
        cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
        width: '40%' //窗口宽度，如不传递默认为40%
    });

    //打开窗口
    dialog.open();

    //关闭窗口
    dialog.close(); //如果cache设置为false，则会销毁窗口对应的dom元素

    //设置窗口标题
    dialog.setTitle();

    //设置窗口内容
    dialog.setContent();

<button onclick="openDialog();" class="button">运行</button>

### 实例属性

$root属性指向当前对话框的顶层dom，可以通过$root.find()来查找对话框里的其他元素

### 说明

在title和content里可以用j_dlg_close类名来标记关闭按钮，一旦元素拥有此类名，点击此元素便可关闭dialog

ui-dialog-bd代表窗口主内容，具有默认的padding样式

ui-dialog-btn代表窗口底部的按钮容器，这个容器里的所有button类都有左边距15px， 如：content: '&lt;div>我是内容&lt;/div>&lt;div class="ui-dialog-btn">&lt;a class="button">关闭&lt;a>&lt;/div>'

### 静态方法Dialog.confirm

Dialog.confirm可以弹出一个具有确认和取消按钮的对话框。

    IOT.Dialog.confirm('您确认要删除此项内容？', function(){
        alert('点击了确认按钮');
    }, function(){
        alert('点击了取消按钮');
    });

<button onclick="confirmDialog();" class="button">运行</button>

<script>
    function openDialog(){
        var dialog = new IOT.Dialog({
            title: '系统提示', //窗口标题的html，如果不设置则无标题
            content: '<div class="ui-dialog-bd"><p>欢迎！</p></div><div class="ui-dialog-btn"><a class="button j_dlg_close">关闭<a></div>', //窗口内容的html，如果不设置则无内容
            beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
            closeBtn: true, //是否有关闭按钮
            className: '', //窗口最外层容器的类名
            cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
            width: '40%' //窗口宽度，默认为40%
        });
        dialog.open();
    }
    function confirmDialog(){
        IOT.Dialog.confirm('您确认要删除此项内容？', function(){
            alert('点击了确认按钮');
        }, function(){
            alert('点击了取消按钮');
        });
    }
</script>
