/*!
 * Blade Widget - v1.0.0 - 2015-06-11
 * jQuery Plug-in
 * http://github.com/panfeng-pf/blade-widget
 * Copyright (c) 2015 Blade Pan; Licensed Apache 2.0
 * Dependency: jQuery (test with jQuery v1.11.2, jQuery UI v1.11.4)
 */
(function($) {
	/*==============================================
	 * widget column/container
	 *==============================================
	 */
	$.fn.bladeWidgetColumn = function(options) {
		var opts = $.extend({}, $.fn.bladeWidgetColumn.defaults, options);
		
		/*==============================================
		 * initial widget column/container set
		 *==============================================
		 */
		var jqWgtColSet = this;
		var jqWgtSet = jqWgtColSet.find('.widget');
		
		/*--------------------------------------------
		 * sync columns height with longest
		 *--------------------------------------------
		 */
		syncHeight(jqWgtColSet);
		
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
				 * make placeholder size match moving item
				 *--------------------------------------------
				 */
				var h = ui.item.height();
				ui.placeholder.height(h);
				
				/*--------------------------------------------
				 * add a mask div for iframe when moving start
				 *--------------------------------------------
				 */
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
			, stop: function( event, ui ) {
				/*--------------------------------------------
				 * sync columns height with longest
				 *--------------------------------------------
				 */
				syncHeight(jqWgtColSet);
				
				/*--------------------------------------------
				 * remove the mask div for iframe when moving stop
				 *--------------------------------------------
				 */
				jqWgtSet.find('.iframe-mask').remove();
				
				/*--------------------------------------------
				 * save layout callback
				 *--------------------------------------------
				 */
				var layout = getWgtLayout(jqWgtColSet);
				opts.saveLayout(layout);
			}
		});
		
		return jqWgtColSet;
	};
	
	/*--------------------------------------------
	 * default options
	 *--------------------------------------------
	 */
	$.fn.bladeWidgetColumn.defaults = {
		saveLayout: function(layout) {}
	};
	
	function syncHeight(jqElementSet) {
		var maxHeight = 0;
		jqElementSet.each(function() {
			this.style.height = '';
			var h = $(this).height();
			if(h > maxHeight) {
				maxHeight = h;
			}
		});
		jqElementSet.height(maxHeight);
	}
	
	function getWgtLayout(jqWgtColSet) {
		var layout = [];
		var col = 0;
		jqWgtColSet.each(function() {
			col ++;
			var row = 0;
			var jqWgtCol = $(this);
			jqWgtCol.find('.widget').each(function() {
				row ++;
				var jqWgt = $(this);
				var wgtId = jqWgt.attr('id');
				var wgtPos = {
					id: wgtId
					, col: col
					, row: row
				};
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
		
		var jqWgtHeader = jqWgt.find('.widget-header');
		var jqWgtContent = jqWgt.find('.widget-content');
		var jqWgtFooter = jqWgt.find('.widget-footer');
		
		if('min-toggle' == action) {
			if(jqWgtContent.is(':hidden')) {
				jqWgtContent.show();
				jqWgtFooter.show();
				
				jqWgt.trigger("blade.widget.win.restore", [jqWgt]);
			} else {
				jqWgtContent.hide();
				jqWgtFooter.hide();
				
				jqWgt.trigger("blade.widget.win.min", [jqWgt]);
			}
			
		} else if('max-toggle' == action) {
			var jsWgtHeader = jqWgtHeader[0];
			
			var jqWgtCol = jqWgt.parent();
			var jqWin = $(window);
			
			if(jqWgt.hasClass('widget-max')) {
				jqWgtContent.height(jqWgt.attr('original-height'));
				jqWgt.removeAttr('original-height');
				
				jqWgt.removeClass('widget-max');
				document.body.style.overflow = '';
				jsWgtHeader.style.cursor = '';
				jqWgtCol.sortable( "enable" );
				
				jqWin.off('resize', $.fn.bladeWidget.wgtMaxResize);
				
				jqWgt.trigger("blade.widget.win.restore", [jqWgt]);
			} else {
				jqWgt.attr('original-height', jqWgtContent.height());
				
				jqWgt.addClass('widget-max');
				document.body.style.overflow = 'hidden';
				jsWgtHeader.style.cursor = 'auto';
				jqWgtCol.sortable( "disable" );
				
				var data = {
					'jqWgtHeader': jqWgtHeader
					, 'jqWgtContent': jqWgtContent
					, 'jqWgtFooter': jqWgtFooter
				};
				$.fn.bladeWidget.wgtMaxResize({
					data:data
				});
				jqWin.on('resize', data, $.fn.bladeWidget.wgtMaxResize);
				
				jqWgt.trigger("blade.widget.win.max", [jqWgt]);
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
