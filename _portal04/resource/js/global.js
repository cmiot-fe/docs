$(function() {
    var _common = {
        init: function() {
            _common.bindEvents();
            _common.bindScoll();
        },
        bindScoll: function () { 
            $(window).on('scroll', function (e) {
                var scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollY > 100) {
                    $('.suspension-bottom').show();
                } else {
                    $('.suspension-bottom').hide();
                }
            });
            $('.suspension-bottom').on('click', function (e) {
                e.preventDefault();
                $("html,body").animate({ scrollTop: 0 }, 500)
            });
            window.onresize = function () { 
                var $swipers = $('.swiper-portal');
                for (var i = 0; i < $swipers.length; i++) { 
                    var $item = $($swipers[i]).find('.swiper-body');
                    var page = $item.data('page');
                    if (!page) { 
                        continue;
                    }
                    var itemWidth = $item.find('.swiper-item').css('width').split('').slice(0, -2).join('');
                    $item[0].scrollLeft = itemWidth * (page - 1);
                }
            }
        },
        bindEvents: function() {
            
            // 导航鼠标移动动画------begin
            var menuAniSt = null;
            $('.header-menu-li-menu').on('mouseover', function () {
                if (menuAniSt) { 
                    clearTimeout(menuAniSt);
                    menuAniSt = null;
                }
            }).on('mouseout', function () { 
                var $this = $(this);
                menuAniSt = setTimeout(function () {
                    $this.css('height', '0px').find('ul').removeClass('show-this');
                },100)
            });
            $('.header-menu-ul-li').on('mouseover', function () { 
                var $el = $(this);
                var index = $el.data('index');
                var $showBody = $('.header-menu-li-menu');
                var $ul = $showBody.find('.header-menu-li-menu-' + index);
                if ($ul.length != 0) { 
                    if (menuAniSt) { 
                        clearTimeout(menuAniSt);
                        menuAniSt = null;
                    }
                    $ul.show().addClass('show-this').siblings('ul').hide();
                    $showBody.css('height', 94 + (Math.ceil($ul.find('li').length / 5) - 1) * 50 + 'px');
                }
            }).on('mouseout', function () { 
                menuAniSt = setTimeout(function () {
                    $('.header-menu-li-menu').css('height', '0px').find('ul').removeClass('show-this');
                },100)
            });
            // 导航鼠标移动动画------end

            // table切换-----------begin
            $('.table-style-header-ul').on('click', 'li', function () {
                var $this = $(this);
                if ($this.hasClass('active')) { 
                    return;
                }
                var key = $this.data('key');
                var $item =$this.parents('.table-style').find('.table-style-body').find('#' + key);
                if ($item.hasClass('table-item-show')) { 
                    return;
                }
                $this.addClass('active').siblings('.active').removeClass('active');
                $item.addClass('table-item-show').siblings('.table-item-show').removeClass('table-item-show');
            });
            // table切换-----------end

            // swiper切换----------begin
            $('.j-swiper').on('click', function () {
                var $this = $(this);
                var $swiperBody = $(this).siblings('.swiper-body');
                var pageSize = $swiperBody.data('pageSize');
                var page = $swiperBody.data('page') || 1;
                var totalPage = $swiperBody.find('.swiper-item').length - pageSize + 1;
                var key = $this.data('key');
                if (page + key > totalPage || page + key < 1) {
                    return;
                }
                var itemWidth = $swiperBody.find('.swiper-item').css('width').split('').slice(0, -2).join('');
                $swiperBody.data('page', page + key);
                $swiperBody.animate({ scrollLeft: itemWidth * (page + key - 1) }, 300);
            });
            // swiper切换----------end
        }
    };
    _common.init();
});
