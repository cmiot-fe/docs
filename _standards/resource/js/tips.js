/**
 * Created with JetBrains PhpStorm.
 * Desc: tips提示
 * Author: limengjun
 * Date: 14-8-19
 * Time: 上午11:01
 */
(function () {
    function Tips(options) {
        this.content = options.content;
        this.type = options.type;
        this.width = options.width;
        this._config = {
            iconFont: {
                'info': 'icon-info-circled',
                'error': 'icon-cancel-circled',
                'warning': 'icon-attention-circled',
                'success': 'icon-ok-circled',
                'welcome': 'icon-ok-circled'
            },
            className: {
                'info': 'info',
                'error': 'alert',
                'warning': 'warning',
                'success': 'success',
                'welcome': 'success'
            }
        };
    }

    Tips.prototype = {
        create: function () {
            var ctml = [];
            ctml = ['<div class="alert-box alert-box-pop ' + this._config.className[this.type] + '">'];
            ctml.push('<i class="' + this._config.iconFont[this.type] + '"></i>');
            ctml.push(this.content);
            ctml.push('</div>');

            var objHtml = $(ctml.join(''));
            objHtml.appendTo(document.body);
            return objHtml;
        },
        resetPosition: function (obj) {
            var width = obj.width();
            var height = obj.height();
            var scroll = $(window).height() / 2;
            obj.css({
                'margin-left': -width / 2 - 45 / 2,
                'top': -height / 2 + scroll + 15,
                position: 'fixed',
                left: '50%'
            });
            obj.animate({
                top: -height / 2 + scroll
            }, 400);
        },
        hideClose: function (obj) {
            obj.remove();
        }
    };
    //创建弹窗主体
    //外部可以扩展
    IOT.tips = function (content, type, timeout) {
        typeof timeout === 'number' || (timeout = 2000);
        if (/^\s*$/.test(content) || !content) return false;
        var tip = new Tips({content: content, type: type || "success", timeout: timeout});
        tip.hideClose($('.tisp-' + type));
        var $tip_box = tip.create();
        tip.resetPosition($tip_box);
        if (timeout) setTimeout(function () {
            tip.hideClose($tip_box);
        }, timeout);
        else {
            var $doc = $(document), onClick;
            $doc.click(onClick = function (e) {
                var tip_box = $tip_box.get(0), target = e.target;
                if (tip_box !== target && !$.contains(tip_box, target)) {
                    $doc.unbind('click', onClick);
                    tip.hideClose($tip_box);
                }
            });
        }
    };
})();
