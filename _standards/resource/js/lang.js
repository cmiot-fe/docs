/**
 * @singleton Lang
 * 多语言单例
 * */
;(function(){
    var lang = {
        _init: function(){
            this.loadLanguage();
        },
        loadLanguage: function(){
            if(window.LANGLIB){
                this.LANGLIB = window.LANGLIB;
            }else{
                this.LANGLIB = {};
            }
        },
        /**
         * @method 获取对应的语言文本
         * */
        tr: function(){
            if(!arguments.length){
                return '';
            }
            var strReg = arguments[0];
            var args = arguments;
            var i = 1;
            var str = this.LANGLIB[strReg] || strReg;
            return str.replace(/(%s)/g, function(){
                return args[i++];
            });
        }
    };
    lang._init();
    IOT.lang = lang;
    IOT.tr = function(){
        return lang.tr.apply(lang, arguments);
    }
})();
