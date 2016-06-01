/**
 * jQuery simple select
 * @auth: Karl Luo(360512239@qq.com)
 * @gitHub: https://github.com/luolinjia/fe-working/tree/gh-pages/select
 * @dependence jQuery
 * @createDate 09-03-2015
 * @usage:
 * <div class="all">
 * 		<select>...</select>
 * </div>
 *
 * $('select').iselect();
 *
 **/
(function($){
	$.fn.iselect = function (options) {
		var o = $(this),
			initData, cacheData,
			settings = {
				icon: 'icon-angle-down',
				// hasRedirect: false,
				hasSearch: false,
				searchIcon: '',
				searchData: {
					url: '',
					data: {}
				}
			}, req = {
				/**
				 * request the json data from server
				 * @param {Object} options
				 * @param {Function} callback
				 */
				reqJsonData: function (options, callback) {
					$.ajax($.extend({
						type: 'POST',
						dataType: 'JSON'
					}, options, true)).done(function(data){
						if (data && $.isFunction(callback)) {
							callback(data);
						}
					});
				}
			}, _ = {
				init: function () {
					var i = 0, size = o.length;
					for (; i < size; i++) {
						_.wrapSelect($(o[i]));
					}
				},
				wrapSelect: function (self) {
					// get the select value
					var selectList = $('option', self).map(function () {
						var thiz = $(this), _key = thiz.attr('value'), _url = thiz.attr('data-url'), _val = thiz.text(), _isSelected = !!thiz.attr('selected');
						return _key + '_*' + _url + '_*' + _val + '_*' + _isSelected;
					}), i = 0, size = selectList.length, list = [], defaultKey = '', defaultVal = '';

					for (; i < size; i++) {
						var item = selectList[i].split('_*'), key = item[0], url = item[1], val = item[2], isSelected = item[3];
						if ('true' === isSelected) {
							defaultKey = key;
							defaultVal = val;
						} else {
							if (i === 0) {
								defaultVal = val;
							}
						}
						list.push('<li data-val="' + key + '" ' + ('true' === isSelected ? 'selected' : '') + '><a href="' + ('undefined' !== url ? url : 'javascript:;') + '">' + val + '</a></li>');
					}

					self.wrap('<div class="i-select"></div>').parent().prepend('<span>' + defaultVal + '</span><i class="' + settings.icon + '"></i><ul>' + (settings.hasSearch ? '<div class="search"><input type="text"/>' + (settings.searchIcon === '' ? '' : '<i class="' + settings.icon + '"></i>') + '</div>' : '') + list.join('') + '</ul>');
					self.addClass('for-select').parent().css('width', self.outerWidth());

					_.bindEvents(self.parent(), defaultKey);
				},
				bindEvents: function (self, defaultKey) {
					var lis = $('li', self), $select = $('select', self), $ulHeight = self.find('ul').outerHeight(), setHeight = $ulHeight > 280 ? 280 : $ulHeight, $ulWidth = self.find('ul').outerWidth();

					settings.hasSearch ? _.bindSearch(self) : '';

					self.find('ul').slimScroll({
						height: setHeight + 30,
						width: $ulWidth + 10,
						distance: 15,
						color: '#e0e0e0'
					});
					self.find('.slimScrollDiv').css('position', 'absolute');
					self.find('.slimScrollDiv ul').css('height', setHeight).slideUp(10);
					self.find('.slimScrollDiv ul').css('width', $ulWidth);
					self.find('.slimScrollDiv ul .search input').css('width', $ulWidth-30);

					self.hover(function () {
						$(this).find('.slimScrollDiv').stop().slideDown(200);
						$(this).find('ul').stop().slideDown(200);
					}, function () {
						$(this).find('.slimScrollDiv').stop().slideUp(200);
						$(this).find('ul').stop().slideUp(200);
					});

					// set default value for the select
					if ('' === defaultKey) {
						$(lis[0]).addClass('selected');
						$select.find('option:first').attr('selected', 'selected');
					} else {
						lis.each(function () {
							$(this).attr('data-val') === defaultKey ? $(this).addClass('selected') : '';
						});
						$select.find('option[value="' + defaultKey + '"]').attr('selected', 'selected');
					}

					lis.on('click', function () {
						var thiz = $(this), key = thiz.attr('data-val'), value = thiz.text();
						$('span', self).text(value);
						lis.removeClass('selected');
						thiz.addClass('selected');
						$select.find('option').removeAttr('selected');
						$select.val(key).find('option[value="' + key + '"]').attr('selected', 'selected');
						thiz.parent().fadeOut(100);
						thiz.parent().parent().fadeOut(100);
					});
				},
				bindSearch: function (self) {
					var $search = self.find('.search input'), $ul = $search.parent().parent(), timer, preKeyword = '';

					// save the initData
					initData = self.find('select');

					$search.on('keyup', function () {

						if ('' === $search.val()) {
							$ul.find('li.search-li').remove();
							$ul.find('li').show();
							return;
						}
						if (preKeyword === $search.val()) {}

						var callback = function () {
							$search.parent().siblings('li').hide();
							$ul.append('<div class="search-tip">正在搜索...</div>');
							preKeyword = $search.val();
							req.reqJsonData({
								url: settings.searchData.url,
								data: $.extend({key: preKeyword}, settings.searchData.data, true)
							}, function (res) {
								if (res === false) { return; }
								if (res.code === 0) {
									var dom = _.renderSearchResult(res['data']);
									$ul.find('.search-tip').remove();
									$ul.append(dom);
									_.bindSearchEvents(self);
								} else {
									IOT.showPostError(res['msg']);
									$ul.find('.search-tip').remove().append(res['msg']);
								}
							});
						};

						timer && clearTimeout(timer);
						timer = setTimeout(callback, 1500);
					});
				},
				renderSearchResult: function (data) {
					var i = 0, size = data.length, list = [];
					for (; i < size; i++) {
						var item = data[i];
						list.push('<li class="search-li" data-val="' + item['id'] + '"><a href="javascript:;">' + item['label'] + '</a></li>');
					}
					return list.join('');
				},
				bindSearchEvents: function (self) {
					var lis = self.find('li');
					lis.on('click', function () {
						var thiz = $(this), id = thiz.attr('data-val'), label = thiz.text();
						$('span', self).text(label).attr('data-id', id);
						lis.removeClass('selected');
						thiz.addClass('selected');
						thiz.parent().fadeOut(100);
						thiz.parent().parent().fadeOut(100);
					});
				}
			};

		settings = $.extend(settings, options);
		_.init();
	};
})(jQuery);