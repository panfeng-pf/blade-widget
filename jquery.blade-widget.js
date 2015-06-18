/*!
 * Blade Widget - v1.0.0 - 2015-06-11
 * jQuery Plug-in
 * http://github.com/panfeng-pf/blade-widget
 * Copyright (c) 2015 Blade Pan; Licensed Apache 2.0
 * Dependency: jQuery (test with jQuery v1.11.2, jQuery UI v1.11.4)
 */
(function($) {
	/*==============================================
	 * widget container
	 *==============================================
	 */
	$.fn.bladeWidgetContainer = function(options) {
		var jqWgtContainerSet = this;
		
		var action = options.action;
		if('add' == action) {
			/*--------------------------------------------
			 * add widget
			 *--------------------------------------------
			 */
			var jqWgtContainer = $(jqWgtContainerSet[0]);
			var wgtHtml = options.wgtHtml;
			
			var mode = '';
			if(jqWgtContainer.hasClass('widget-column')) {
				mode = 'column';
			} else if(jqWgtContainer.hasClass('widget-row')) {
				mode = 'row';
			} else {
				return jqWgtContainerSet;
			}
			
			jqWgtContainer.append(wgtHtml);
			if('row' == mode) {
				var jqWgtNew = jqWgtContainer.find('.widget:last');
				jqWgtContainer.width(jqWgtContainer.width() + jqWgtNew.outerWidth(true));
				jqWgtNew.bladeWidget('reset-height');
			}
			
		} else {
			/*--------------------------------------------
			 * init widget container
			 *--------------------------------------------
			 */
			var opts = $.extend({}, $.fn.bladeWidgetContainer.defaults, options);
			
			if('column' == opts.mode) {
				initWidgetColumn(opts, jqWgtContainerSet);
			} else if('row' == opts.mode) {
				initWidgetRow(opts, jqWgtContainerSet);
			}
		}
		
		return jqWgtContainerSet;
	};
	
	/*--------------------------------------------
	 * default options
	 *--------------------------------------------
	 */
	$.fn.bladeWidgetContainer.defaults = {
		mode: 'column'  /* column | row */
		, saveLayout: function(layout) {}
	};
	
	/*--------------------------------------------
	 * private functions
	 *--------------------------------------------
	 */
	function initWidgetColumn(opts, jqWgtColSet) {
		var jqWgtSet = jqWgtColSet.find('.widget');
		
		/*--------------------------------------------
		 * sync columns height with longest
		 *--------------------------------------------
		 */
		syncWgtColSetHeight(jqWgtColSet);
		
		/*--------------------------------------------
		 * use jQuery UI sortable to realize drag/drop/move
		 *--------------------------------------------
		 */
		jqWgtColSet.sortable({
			connectWith: ".widget-column"
			, handle: ".widget-header"
			, cancel: "a,button"
			, placeholder: "widget-placeholder"
			
			, start: function( event, ui ) {
				/*--------------------------------------------
				 * add a iframe mask when moving start
				 *--------------------------------------------
				 */
				createIframeMask(jqWgtSet);
				
				/*--------------------------------------------
				 * make placeholder size match moving item
				 *--------------------------------------------
				 */
				var h = ui.item.height();
				ui.placeholder.height(h);
			}
			, stop: function( event, ui ) {
				/*--------------------------------------------
				 * remove the iframe mask when moving stop
				 *--------------------------------------------
				 */
				destroyIframeMask(jqWgtSet);
				
				/*--------------------------------------------
				 * sync columns height with longest
				 *--------------------------------------------
				 */
				syncWgtColSetHeight(jqWgtColSet);
				
				/*--------------------------------------------
				 * save layout callback
				 *--------------------------------------------
				 */
				opts.saveLayout(getWgtLayout(jqWgtColSet, opts.mode));
			}
		});
	}
	
	function initWidgetRow(opts, jqWgtRowSet) {
		var jqWgtSet = jqWgtRowSet.find('.widget');
		
		/*--------------------------------------------
		 * sync rows width with longest
		 *--------------------------------------------
		 */
		syncWgtRowSetWidth(jqWgtRowSet);
		
		/*--------------------------------------------
		 * adjust widget height to match current row
		 *--------------------------------------------
		 */
		jqWgtSet.each(function() {
			var jqWgt = $(this);
			jqWgt.bladeWidget('reset-height');
		});
		
		/*--------------------------------------------
		 * use jQuery UI sortable to realize drag/drop/move
		 *--------------------------------------------
		 */
		jqWgtRowSet.sortable({
			connectWith: ".widget-row"
			, handle: ".widget-header"
			, cancel: "a,button"
			, placeholder: "widget-placeholder"
			
			, start: function( event, ui ) {
				var jqWgt = ui.item;
				var jqWgtPlaceholder = ui.placeholder;
				
				var wgtWidth = jqWgt.width();
				
				/*--------------------------------------------
				 * add a iframe mask when moving start
				 *--------------------------------------------
				 */
				createIframeMask(jqWgtSet);
				
				/*--------------------------------------------
				 * make placeholder size match moving item
				 *--------------------------------------------
				 */
				jqWgtPlaceholder.width(wgtWidth);
				
				/*--------------------------------------------
				 * add moving widget width into row
				 *--------------------------------------------
				 */
				jqWgtRowSet.each(function() {
					var jqWgtRow = $(this);
					var rowWidth = jqWgtRow.innerWidth() + wgtWidth;
					jqWgtRow.width(rowWidth);
				});
			}
			, stop: function( event, ui ) {
				var jqWgt = ui.item;
				var jqWgtRow = jqWgt.parent();
				
				/*--------------------------------------------
				 * remove the iframe mask when moving stop
				 *--------------------------------------------
				 */
				destroyIframeMask(jqWgtSet);
				
				/*--------------------------------------------
				 * adjust widget height to match new row
				 *--------------------------------------------
				 */
				jqWgt.bladeWidget('reset-height');
				
				/*--------------------------------------------
				 * save layout callback
				 *--------------------------------------------
				 */
				opts.saveLayout(getWgtLayout(jqWgtRowSet, opts.mode));
				
				/*--------------------------------------------
				 * sync rows width with longest
				 *--------------------------------------------
				 */
				syncWgtRowSetWidth(jqWgtRowSet);
			}
		});
	}
	
	function syncWgtColSetHeight(jqWgtColSet) {
		var maxHeight = 0;
		jqWgtColSet.each(function() {
			this.style.height = '';
			var h = $(this).height();
			if(h > maxHeight) {
				maxHeight = h;
			}
		});
		jqWgtColSet.height(maxHeight);
	}
	
	function syncWgtRowSetWidth(jqWgtRowSet) {
		var maxWidth = 0;
		jqWgtRowSet.each(function() {
			var jqWgtRow = $(this);
			var w = 0;
			jqWgtRow.find('.widget').each(function() {
				var jqWgt = $(this);
				w += jqWgt.outerWidth(true);
			});
			if(w > maxWidth) {
				maxWidth = w;
			}
		});
		jqWgtRowSet.width(maxWidth);
	}
	
	function createIframeMask(jqWgtSet) {
		var jqWgtContentSet = jqWgtSet.find('.widget-content');
		jqWgtContentSet.each(function() {
			var jqWgtContent = $(this);
			var jqWgtIframe = jqWgtContent.find('iframe');
			var h = jqWgtContent.innerHeight();
			var w = jqWgtContent.innerWidth();
			
			var maskHtml = '<div class="iframe-mask" style="height:' + h + 'px;width:' + w + 'px;"></div>';
			jqWgtIframe.before(maskHtml);
		});
	}
	
	function destroyIframeMask(jqWgtSet) {
		jqWgtSet.find('.iframe-mask').remove();
	}
	
	function getWgtLayout(jqWgtContainerSet, mode) {
		var layout = [];
		var posLvl1 = 0;
		jqWgtContainerSet.each(function() {
			posLvl1 ++;
			var posLvl2 = 0;
			var jqWgtContainer = $(this);
			jqWgtContainer.find('.widget').each(function() {
				posLvl2 ++;
				var jqWgt = $(this);
				var wgtId = jqWgt.attr('id');
				var wgtPos = {id: wgtId};
				if('column' == mode) {
					wgtPos.col = posLvl1;
					wgtPos.row = posLvl2;
				} else if('row' == mode) {
					wgtPos.row = posLvl1;
					wgtPos.col = posLvl2;
				}
				layout.push(wgtPos);
			});
		});
		return layout;
	}
	
	/*==============================================
	 * widget basic actions
	 *==============================================
	 */
	$.fn.bladeWidget = function(action) {
		var jqWgt = this;
		if(jqWgt.length > 1 || ! jqWgt.hasClass('widget')) return jqWgt;
		
		var mode = '';
		var jqWgtContainer = jqWgt.parent();
		if(jqWgtContainer.hasClass('widget-column')) {
			mode = 'column';
		} else if(jqWgtContainer.hasClass('widget-row')) {
			mode = 'row';
		} else {
			return jqWgt;
		}
		
		var jqWgtHeader = jqWgt.find('.widget-header');
		var jqWgtContent = jqWgt.find('.widget-content');
		var jqWgtFooter = jqWgt.find('.widget-footer');
		
		if('toggle-min' == action) {
			if(jqWgt.hasClass('widget-min')) {
				/*--------------------------------------------
				 * min -> restore
				 *--------------------------------------------
				 */
				if('column' == mode) {
					jqWgt.removeClass('widget-min');
					jqWgt.trigger("blade.widget.win.restore", [jqWgt]);
				}
			} else {
				/*--------------------------------------------
				 * restore -> min
				 *--------------------------------------------
				 */
				if('column' == mode) {
					jqWgt.addClass('widget-min');
					jqWgt.trigger("blade.widget.win.min", [jqWgt]);
				}
			}
			
		} else if('toggle-max' == action) {
			var jsWgt = jqWgt[0];
			var jsWgtHeader = jqWgtHeader[0];
			
			var jqWin = $(window);
			
			if(jqWgt.hasClass('widget-max')) {
				/*--------------------------------------------
				 * max -> restore
				 *--------------------------------------------
				 */
				jqWgtContent.height(jqWgtContent.attr('original-height')).removeAttr('original-height');
				if('row' == mode) {
					jsWgt.style.width = jqWgt.attr('original-width');
					jqWgt.removeAttr('original-width');
				}
				
				jqWgt.removeClass('widget-max');
				document.body.style.overflow = '';
				jsWgtHeader.style.cursor = '';
				jqWgtContainer.sortable( "enable" );
				
				jqWin.off('resize', $.fn.bladeWidget.wgtMaxResize);
				
				jqWgt.trigger("blade.widget.win.restore", [jqWgt]);
			} else {
				/*--------------------------------------------
				 * restore -> max
				 *--------------------------------------------
				 */
				jqWgtContent.attr('original-height', jqWgtContent.height());
				if('row' == mode) {
					jqWgt.attr('original-width', jsWgt.style.width);
					jsWgt.style.width = '';
				}
				
				jqWgt.addClass('widget-max');
				document.body.style.overflow = 'hidden';
				jsWgtHeader.style.cursor = 'auto';
				jqWgtContainer.sortable( "disable" );
				
				var data = {
					'jqWgtHeader': jqWgtHeader
					, 'jqWgtContent': jqWgtContent
					, 'jqWgtFooter': jqWgtFooter
				};
				$.fn.bladeWidget.wgtMaxResize({data:data});
				jqWin.on('resize', data, $.fn.bladeWidget.wgtMaxResize);
				
				jqWgt.trigger("blade.widget.win.max", [jqWgt]);
			}
		} else if('reset-height' == action) {
			if('row' == mode) {
				jqWgtContent.height(jqWgt.height() - jqWgtHeader.outerHeight(true) - jqWgtFooter.outerHeight(true));
			}
		}
		
		return jqWgt;
	};
	
	$.fn.bladeWidget.wgtMaxResize = function(event) {
		var data = event.data;
		var jqWgtHeader = data.jqWgtHeader;
		var jqWgtContent = data.jqWgtContent;
		var jqWgtFooter = data.jqWgtFooter;
		jqWgtContent.height(window.innerHeight - jqWgtHeader.outerHeight(true) - jqWgtFooter.outerHeight(true));
	};
})(jQuery);
