// * Copyright (c) 2018 iot.com, Inc. All Rights Reserved
// *
// * @fileoverview 分页
// * @author GaoYu
// * @date 18-08-23
// * @param page 当前第几页 从1开始
// * @param page_size 每页几条记录，默认10
// * @param total 总共记录数
// * @param page_url 翻页url，其中#page#是页数部分
// * @param [align] 分页内容显示位置，可选：left、right、center，默认为center
// * @param [show_total] 是否显示总条数，默认为'true'，注意需是字符串，js设置时，为bool类型
// * @param [show_size] 是否显示每页条数，默认为'true'，注意需是字符串，js设置时，为bool类型
// * @param [show_elevator] 显示电梯，可以快速切换到某一页，默认为'true'，注意需是字符串，js设置时，为bool类型
// * @param [visible_num] 翻页区域能容纳的最多格子数量，包含上一页下一页、省略号，默认为12个，最少7个。
// * @example
//     页面提供一个容器： <div class="show-pager" data_page="1" data_show_size="false" data_total="800" data_page_url="/textpage?page=#page#" data_page_size="6"></div>
//     详解： 容器中可以加入配置，配置名称为以上配置名称前加data_，比如data_show_size、data_total
//
//     引入js： <script type="text/javascript" src="../common/js/module/pager.js"></script>
//     初始化： 
//         var page = new Pager('.show-pager', {
//             align:'left',
//             page_url: '/aaaaa?page=#page#',
//             total: 200,
//             page_size: 5
//         }, function(page){
//             console.log(page);
//             this.aja
//             return {total: 300};
//         });
//     详解：
//         参数1：容器className或者id，需要跟.或者#
//         参数2：配置对象，如果为null，则读取页面容器标签上的配置，如为Object则读取传入的配置
//         参数3：function，如过为null或不传，则翻页为页面跳转，如为function，翻页则会回调如这个函数，并传入新的page值，如果查询数据成功，则需返回一个{total: 300};
//               其中的total为新的总数据个数,如返回false,则分页不会更新。
// 如果需手动更新配置，则调用page.setOptions({})，传入新的配置。
// 注意：因为有样式，所以需要引入global.less文件。
const Pager = function (element, options, callBack) {
    this.callBack = callBack;
    this.readDom = options ? false : true;
    this.initContent(element); //初始化Dom
    options = options || {};
    //读取配置
    this.$align = (this.readDom ? this.$content.getAttribute('data_align') : options.align) || 'center';
    this.$url = (this.readDom ? this.$content.getAttribute('data_page_url') : options.page_url) || '';
    this.$page = parseInt((this.readDom ? this.$content.getAttribute('data_page') : options.page) || 1);
    this.$show_total = this.readDom ? (this.$content.getAttribute('data_show_total') == 'false' ? false : true) : (options.show_total == undefined ? true : options.show_total);
    this.$show_size = this.readDom ? (this.$content.getAttribute('data_show_size') == 'false' ? false : true) : (options.show_size == undefined ? true : options.show_size);
    this.$show_elevator = this.readDom ? (this.$content.getAttribute('data_show_elevator') == 'false' ? false : true) : (options.show_elevator == undefined ? true : options.show_elevator);
    this.$visible_num = parseInt((this.readDom ? this.$content.getAttribute('data_visible_num') : options.visible_num) || 12);
    this.$visible_num < 7 && (this.$visible_num = 7);
    this.$total = parseInt((this.readDom ? this.$content.getAttribute('data_total') : options.total) || 0);
    this.$page_size = parseInt((this.readDom ? this.$content.getAttribute('data_page_size') : options.page_size) || 10);
    if (!element || element.constructor != String || element == '') { 
        return;
    }
    this.draw(); //渲染
}

Pager.prototype = {
    show: function () { //显示
        this.$content.innerHTML = '';
        this.$content.append(this.$body);
        this.binds();
    },
    binds: function () { //绑定事件
        var _this = this;
        //绑定翻页事件
        var eL = this.$ul.getElementsByTagName("a");
        for (var i = 0; i < eL.length; i++) { 
            eL[i].addEventListener("click", function (e) {
                if (_this.callBack) {
                    e.preventDefault();
                    var page = this.getAttribute('data_page'), re = _this.callBack(parseInt(page));
                    re && (_this.setOptions({ page: parseInt(page), total: parseInt(re.total) }));
                }
            });
        }

        //绑定翻页电梯输入后回车事件
        _this.$show_elevator && _this.$ul.getElementsByClassName('j-elevator')[0].addEventListener("keyup", function (e) {
            var evt = window.event || e;
            if(evt.keyCode==13){
                var newPage = this.value;
                if (!isNaN(newPage) && _this.$page_total >= parseInt(newPage)) { 
                    if (_this.callBack) {
                        e.preventDefault();
                        var re = _this.callBack(parseInt(newPage));
                        if (re) {
                            _this.setOptions({ page: parseInt(newPage), total: parseInt(re.total) });
                        }
                    } else { 
                        location.href=_this.$url.split('#page#').join(newPage);
                    }
                }
            }
        });
    },
    setOptions: function (options) {  //更新配置函数
        options.align && (this.$align = options.align);
        options.page_url && (this.$url = options.page_url);
        options.page && (this.$page = options.page);
        options.show_total != undefined && (this.$show_total = options.show_total);
        options.show_size != undefined && (this.$show_size = options.show_size);
        options.show_elevator != undefined && (this.$show_elevator = options.show_elevator);
        options.visible_num && (this.$visible_num = options.visible_num < 7 ? 7 : options.visible_num);
        options.total && (this.$total = options.total);
        options.page_size && (this.$page_size = options.page_size);
        this.draw();
    },
    initContent: function (element) { //创建容器
        this.$content = (element.split('.').length >= 2 ? document.getElementsByClassName(element.split('.')[1])[0] : document.getElementById(element.split('#')[1]));
        this.$content.innerHTML = '', this.$body = document.createElement('div'), this.$ul = document.createElement('ul');
        this.$body.className = 'portal-pager ' + this.$align;
        this.$ul.className = 'portal-pager-ul';
        this.$body.append(this.$ul);
    },
    getPageLink: function(type, page){ //获得单个方块
        var _disabled = false, tag = page, pagenum = page;
        if (type == 'pre') {
            tag = '<';
            this.$page == 1 ? _disabled = true : pagenum = this.$page - 1;
        } else if (type == 'next') {
            tag = '>';
            this.$page == this.$page_total ? _disabled = true : pagenum = this.$page + 1;
        } else if (type == '...') {
            tag = '...';
        }
        var originalUrl = this.$url.split('#page#').join(pagenum);
        return (_disabled || type == '...' ? '<li class="portal-pager-box' + (_disabled ? ' disabled' : ' portal-pager-more') + '">' + tag + '</li>' : '<li class="portal-pager-box' + (pagenum == this.$page ? ' active' : '') + (tag > 999 ? ' other-width' : '') + '"><a data_page="' + pagenum + '" href="' + originalUrl + '"><span>' + tag + '</span></a></li>');
    },
    draw: function(){  //渲染整个分页
        this.$ul.innerHTML = '';
        if (this.$total == 0 || this.$total <= this.$page_size) {
            this.$body.style.display = 'none';
            return;
        }
        this.$body.style.display='block';
        this.$show_total && (this.$ul.innerHTML += '<li class="portal-pager-total">' + IOT.tr('总共：') + '<span>' + this.$total + '</span>' + IOT.tr('项') + '</li>');
        this.$show_size && (this.$ul.innerHTML += '<li class="portal-pager-size">' + IOT.tr('每页：') + '<span>' + this.$page_size + '</span>' + IOT.tr('项') + '</li>');
        this.$page_total = Math.ceil(this.$total / this.$page_size), pageHtml = this.getPageLink('pre');
        if (this.$page_total <= this.$visible_num - 2) {
            for (var i = 1; i <= this.$page_total; i++){
                pageHtml += this.getPageLink('', i);
            }
        }else{
            if (this.$page <= (this.$visible_num - 4) / 2) {
                for (var i = 1; i <= this.$visible_num - 4; i++){
                    pageHtml += this.getPageLink('', i);
                }
                pageHtml += this.getPageLink('...');
                pageHtml += this.getPageLink('', this.$page_total);
            } else if (this.$page > (this.$visible_num - 4) / 2 && this.$page < this.$page_total - (this.$visible_num - 4) / 2) {
                pageHtml += this.getPageLink('', 1);
                var l = (this.$visible_num - 6) / 2, s = 0, e = 0;
                if ((this.$visible_num - 6) % 2 != 0) {
                    s = parseInt(l), e = parseInt(l);
                } else {
                    s = parseInt(l) - 1, e = parseInt(l);
                }
                pageHtml += (this.$page - s == 3 ? this.getPageLink('', 2) : this.getPageLink('...'));
                for (var i = this.$page - s; i <= this.$page + e; i++){
                    pageHtml += this.getPageLink('', i);
                }
                pageHtml += (this.$page + e == this.$page_total - 2 ? this.getPageLink('', this.$page + e + 1) : this.getPageLink('...'));
                pageHtml += this.getPageLink('', this.$page_total);
            } else {
                pageHtml += this.getPageLink('', 1);
                pageHtml += this.getPageLink('...');
                for (var i = this.$page_total - (this.$visible_num - 5); i <= this.$page_total; i++) {
                    pageHtml += this.getPageLink('', i);
                }
            }
        }
        pageHtml += this.getPageLink('next');
        this.$ul.innerHTML += pageHtml;
        this.$show_elevator && (this.$ul.innerHTML += '<li class="portal-pager-elevator">' + IOT.tr('跳至') + '<input type="text" class="portal-pager-input j-elevator"/>' + IOT.tr('页') + '</li>');
        this.show();
    }
}
