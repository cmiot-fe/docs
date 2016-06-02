/**
 * Created with JetBrains PhpStorm.
 * Author: limengjun
 * Date: 13-11-15
 * Time: 下午3:06
 * Desc: javascript的翻页 调用：IOT.getPagesHtml(当前页数, 记录总数, 每页记录数, 翻页链接, options)
 */
(function(){
    function getPageLink(curr_page, page, page_url, tag){
        return '<li ' + (curr_page == page ? 'class="active"' : '') +'>'+
            '<a href="#" onclick="'+ page_url.replace('#page#', page) +';return false;">'+ (tag || page) +'</a></li>';
    }
    function getPagesHtml(curr_page, total_num, size, page_url, options){
        options = $.extend({
            max_page_total: 100, //最多的页数
            visible_num: 16 //翻页区域能容纳的最多格子数量，包含上一页下一页、省略号，默认为16个。
        }, options);

        var page_total = Math.min(Math.ceil(total_num / size), options.max_page_total);

        //除去上页下页、首页尾页、前后的省略号6个格子后还能显示的格子数
        var main_num = options.visible_num - 6;

        //页数过大时减少页面上显示的总页数,以免翻页区域宽度不够
        if(curr_page > 1000){
            main_num -= 5;
        }else if(curr_page > 100){
            main_num -= 3;
        }else if(curr_page > 10){
            main_num -= 1;
        }

        //当前页面左边的页面数
        var left_nums = Math.floor(main_num / 2);


        //当前页面右边的页面数
        var right_nums = main_num - 1 - left_nums;

        //循环开始的页面，1、2页特殊处理，循环至少从3开始*%}
        var loop_start = curr_page - left_nums;
        var loop_end = curr_page + right_nums;

        if(loop_start < 3){
            loop_end = loop_end + (3 - loop_start);
            loop_start = 3;
        }
   
            
        
        //循环结束的页面,倒数1、2页特殊处理，循环至多从total-2结束*%}
        if(loop_end > page_total - 2){
            if(loop_start - (loop_end - (page_total - 2)) >= 3){
                loop_start = loop_start - (loop_end - (page_total - 2));
            }
            loop_end = page_total - 2;
        }

        var html = '<ul>';

        if(curr_page > 1){
            html += getPageLink(curr_page, curr_page - 1, page_url, '上一页');
        }

        //第1页*%}
        if(page_total > 1){
            html += getPageLink(curr_page, 1, page_url);
        }

        //从第3页开始循环时，直接显示第二页，否则显示...*%}
        if(page_total >= 2){
            if(loop_start === 3){
                html += getPageLink(curr_page, 2, page_url);
            }else{
                html += '<li class="disabled"><a>...</a></li>';
            }
        }
        for(var i = loop_start;i <= loop_end; i++){
            html += getPageLink(curr_page, i, page_url);
        }

        if(page_total >= 4){
            //循环刚好在倒数第三页结束，直接显示倒数第二页，否则显示...*%}
            if(loop_end === page_total - 2){
                html += getPageLink(curr_page, page_total - 1, page_url);
            }else{
                html += '<li class="disabled"><a>...</a></li>';
            }
        }

        if(page_total >= 3){
            //尾页*%}
            html += getPageLink(curr_page, page_total, page_url);
        }

        if(curr_page < page_total){
            html += getPageLink(curr_page, parseInt(curr_page) + 1, page_url, '下一页');
        }

        html += '</ul>';
        return html;
    }
    IOT.getPagesHtml = getPagesHtml;
})();