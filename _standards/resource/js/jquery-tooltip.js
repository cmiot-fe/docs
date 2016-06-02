/**
 * jQuery simple tooltip
 * @auth: Karl Luo(360512239@qq.com)
 * @gitHub:
 * @dependence jQuery
 * @createDate 06-02-2016
 * @usage:
 *
 * $('a').init();
 *
 **/
(function($){
	$.fn.tooltip = function (options) {
		var o = $(this),
			list = o.find('a[title]'),
			settings = {},
			_ = {
				init: function () {
					_.wrapTag();
				},
				wrapTag: function () {
					var i = 0, size = list.length;
					for (; i < size; i++) {
						var item = $(list[i]),
							val = item.attr('title');
						if ('' !== val) _.renderToolTip(val, item);
					}
				},
				renderToolTip: function (data, self) {
					var dom = '<div class="tooltip" style="position:absolute;display:inline-block;top:-32px;opacity:0;"><div style="background-color:black;color:white;padding:5px;border-radius:5px;white-space: nowrap;">' + data + '</div><div class="tooltip-triangle" style="width:0;height: 0;border-width:6px;border-style:solid;border-color:black transparent transparent transparent;position:relative;"></div></div>';
					self.append(dom);
					self.attr('title', '').css({'position': 'relative', 'display': 'inline-block'});
					var $tooltip = self.find('.tooltip'),
						$tria = $tooltip.find('.tooltip-triangle'),
						left = self.outerWidth(),
						offsetLeft = $tooltip.outerWidth();
					$tooltip.css({'left': (left - offsetLeft) / 2});
					$tria.css({'left': (offsetLeft / 2) - 3});
					self.on('mouseover', function (e) {
						$(this).find('.tooltip').stop().animate({'opacity': 1}, 200);
					}).on('mouseleave', function (e) {
						$(this).find('.tooltip').stop().animate({'opacity': 0}, 200);
					});
				}

			};

		settings = $.extend(settings, options);
		// _.init();
		return {
			init: _.init
		};
	};
})(jQuery);