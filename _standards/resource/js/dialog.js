;(function(){
    /**
     * @Class Dialog
     * @Desc 对话框模块
     * 可以用j_dlg_close来标记关闭按钮
     * ui-dialog-bd代表容器主体，具有20px的margin
     * ui-dialog-ft代表btn的容器，具有20px的padding和灰色背景。这个容器里的所有.button类都有右边距15px
     *
     *
     * var dialog = new IOT.Dialog({
            title: '系统提示', //窗口标题的html，如果不设置则无标题
            content: '<div class="ui-dialog-bd"><p>欢迎！</p></div>',
            //窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
            beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
            showClose: true,showFooter: true,
            className: '', //窗口最外层容器的类名
            cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
            width: '40%' //窗口宽度，如不传递默认为40%
        });
     * */
    function Dialog(options){
        this._options = $.extend(true, {
            title: '',
            content: '',
            beforeClose: null,
            showClose: true,
            showFooter: true,
            className: '',
            cache: true, //是否缓存。若为false则close的时候会remove掉对话框对应的dom元素
            width: '40%' //窗口宽度，默认为40%
        }, options);

        this._init();
    }

    $.extend(Dialog.prototype, {
        _init: function(){
            this._build();
            this._bindEvent();
        },
        /**
         * 创建对话框html
         * */
        _build: function(){
            var options = this._options;
            var style = 'width: ' + options.width;

            var html = '<div class="ui-dialog-pop ' + options.className + '" style="' + style + '">' +
                (options.title ? '<div class="ui-dialog-hd yahei">' + options.title + '</div>' : '');


            if(options.showClose){
                html += '<a class="ui-dialog-close j_dlg_close">&#215;</a>';
            }

            html += '</div>';

            this.$root = $(html).appendTo(document.body);

            this.$root.append($(options.content || ''));

            if(options.showFooter){
                this.$root.append($('<div class="ui-dialog-ft"><a class="button j_dlg_close">'+IOT.tr('关闭')+'</a></div>'));
            }

            this._$mask = $('<div class="ui-dialog-mask"></div>').appendTo($('body'));
        },

        _bindEvent: function(){
            var _this = this;
            var options = this._options;
            this.$root.on('click', '.j_dlg_close', function(e){
                e.preventDefault();
                //beforeClose执行结果为false,说明关闭时间被阻止了
                if(options.beforeClose && options.beforeClose.apply(_this) === false){
                    return false;
                }
                _this.close();
                if(options.onclose){
                    options.onclose.apply(this);
                }
            }).on('click', '.j_dlg_ok', function(){

            });
        },

        setSize: function(){
            var size = {
                width: this.$root.outerWidth(),
                height: this.$root.outerHeight()
            };
            this.$root.css({
                'margin-top' : '-' + (size.height / 2) + 'px',
                'margin-left' : '-' + (size.width / 2) + 'px'
            });
            this._$mask.css({
                height: $(document).height() + 'px'
            });
        },
        /**
         * 打开对话框
         * */
        open: function(){
            this.setSize();
            this.$root.show();
            this._$mask.show();
        },
        /**
         * 关闭对话框
         * */
        close: function(){
            this.$root.hide();
            this._$mask.hide();
            if(this._options.cache === false){ //设置不缓存
                this.$root.remove();
                this._$mask.remove();
            }
        },
        /**
         * 设置标题
         * */
        setTitle: function(title){
            this.$root.find('.ui-dialog-tit em').html(title);
        },
        /**
         * 设置内容
         * */
        setContent: function(content){
            this.$root.find('.ui-dialog-bd').html(content);
            this.setSize();
        }
    });

    Dialog.confirm = function(message, ok, cancel){
        var content = '<div class="ui-dialog-bd">' + message + '</div>';
        content += '<div class="ui-dialog-ft"><button class="button j_ok" href="#">' + IOT.tr('确定') + '</button><button class="button secondary j_cancel" href="#">' + IOT.tr('取消') + '</button></div>';
        var confirmDialog = new IOT.Dialog({
            className: 'ui-dialog-confirm',
            width: '450px',
            content: content,
            showFooter: false,
            cache: false,
            showClose: false
        });
        confirmDialog.$root.on('click', '.button', function(e){
            e.preventDefault();
            var $target = $(this);
            if($target.hasClass('j_ok')){
                ok && ok.call(this);
            }else{
                cancel && cancel.call(this);
            }
            confirmDialog.close();
        });
        confirmDialog.open();
    };

    IOT.Dialog = Dialog;
})();