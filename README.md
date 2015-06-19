blade-widget
==============
A jQuery plug-in.<br/>
A widget framework, basic container could be column or row. One page could have several containers, and one container could have several widgets.<br/>
A widget has 3 parts, they are header, content and footer. content could be a iframe. A widget is just like a little window.<br/>
Demo is in package.

Dependency
--------------
* jQuery
* jQuery UI

Test environment
--------------
* jQuery v1.11.2
* jQuery UI v1.11.4
* web browsers
	* Firefox v38
	* Chrome v43
	* IE v9

How to Use
--------------
### Import CSS
```html
<link rel="stylesheet" href="jquery.blade-widget.css">
```

### Import JS
    <script src="jquery.min.js"></script>
    <script src="jquery-ui.min.js"></script>
    <script src="jquery.blade-widget.js"></script>

### Initial widget column
    <script type="text/javascript">
      $(function() {
        $('selector').bladeWidgetColumn();
        // or $('selector').bladeWidgetColumn({option});
      }
    </script>

### Option description and default value
    {
      saveLayout: function(layout) {} //callback function for save layout, parameter is a JSON object, format is [{'id':'x', 'col':y, 'row':z}, ...]
      
    }

### Widget functions
    <script type="text/javascript">
      $(function() {
        // minimize widget, and restore it
		$('selector').bladeWidget('min-toggle');
		
		// maximize widget and restore it
        $('selector').bladeWidget('min-toggle');
      }
    </script>

### widget events
    blade.widget.win.min
	blade.widget.win.max
	blade.widget.win.restore
	
	<script type="text/javascript">
      $(function() {
        $('selector').on('blade.widget.win.max', function(e, jqWgt) {
        	var log = 'event "blade.widget.win.max" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
        	console.log(log);
        }).on('blade.widget.win.min', function(e, jqWgt) {
        	var log = 'event "blade.widget.win.min" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
        	console.log(log);
        }).on('blade.widget.win.restore', function(e, jqWgt) {
        	var log = 'event "blade.widget.win.restore" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
        	console.log(log);
        });
      }
    </script>

Example HTML
--------------
    <html>
    
    <head>
    	<title>Blade Widget Demo</title>
    	
    	<!-- style -->
    	<link rel="stylesheet" href="../jquery.blade-widget.css">
    </head>
    
    <body>
    	<Strong>Blade Widget Demo</strong>
    	<button id="btn-add">+ Add</button>
    	<hr>
    	<div>
    		<!-- ================================== -->
    		<!-- column 1 -->
    		<!-- ================================== -->
    		<div class="widget-column" style="width:20%;">
    	 
    			<div class="widget" id="A">
    				<div class="widget-header">
    					<div style="float:right;">
    						<button class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</button>
    						<button class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</button>
    						<button class="btn-close" style="cursor:pointer;" title="Close">&#10006;</button>
    					</div>
    					<h3>Widget 1</h3>
    				</div>
    				<div class="widget-content">
    					<div style="padding:10px;">
    						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
    					</div>
    				</div>
    				<div class="widget-footer">footer</div>
    			</div>
    		 
    			<div class="widget" id="B">
    				<div class="widget-header">
    					<div style="float:right;">
    						<button class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</button>
    						<button class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</button>
    						<button class="btn-close" style="cursor:pointer;" title="Close">&#10006;</button>
    					</div>
    					<h3>Widget 2</h3>
    				</div>
    				<div class="widget-content" style="height:300px;">
    					<iframe src="http://wap.baidu.com"></iframe>
    				</div>
    				<div class="widget-footer">footer</div>
    			</div>
    		
    		</div>
    		
    		<!-- ================================== -->
    		<!-- column 2 -->
    		<!-- ================================== -->
    		<div class="widget-column" style="width:30%;">
    		
    			<div class="widget" id="C">
    				<div class="widget-header">
    					<div style="float:right;">
    						<button class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</button>
    						<button class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</button>
    						<button class="btn-close" style="cursor:pointer;" title="Close">&#10006;</button>
    					</div>
    					<h3>Widget 3</h3>
    				</div>
    				<div class="widget-content" style="height:250px;">
    					<iframe src="./iframes/iframe4img.html"></iframe>
    				</div>
    				<div class="widget-footer">footer</div>
    			</div>
    		
    		</div>
    </body>
    
    <script src="dependency/jquery-1.11.2.min.js"></script>
    <script src="dependency/jquery-ui-1.11.4/jquery-ui.min.js"></script>
    <script src="../jquery.blade-widget.js"></script>
    <script type="text/javascript">
    	$(function() {
    		//--------------------------------------
    		// initial widget column
    		//--------------------------------------
    		var jqWgtColSet = $('.widget-column');
    		jqWgtColSet.bladeWidgetColumn();
    		
    		//--------------------------------------
    		// widget action buttons
    		//--------------------------------------
    		jqWgtColSet.on('click', '.btn-close', function() {
    			var jqBtn = $(this);
    			var jqWgt = jqBtn.closest('.widget');
    			
    			jqWgt.remove();
    			
    		}).on('click', '.btn-min', function() {
    			var jqBtn = $(this);
    			var jqWgt = jqBtn.closest('.widget');
    			
    			jqWgt.bladeWidget('min-toggle');
    			if(jqWgt.find('.widget-content').is(':hidden')) {
    				jqBtn.html('&equiv;');
    			} else {
    				jqBtn.html('&mdash;');
    			}
    			
    		}).on('click', '.btn-max', function() {
    			var jqBtn = $(this);
    			var jqWgt = jqBtn.closest('.widget');
    			
    			jqWgt.bladeWidget('max-toggle');
    			if(jqWgt.hasClass('widget-max')) {
    				jqBtn.html('&#9744;<small>]</small>');
    			} else {
    				jqBtn.html('&#9744;');
    			}
    		});
    		
    		//--------------------------------------
    		// add new widget
    		//--------------------------------------
    		$('#btn-add').click(function() {
    			var wgtHtml = '';
    			wgtHtml += '<div class="widget">';
    			wgtHtml += '	<div class="widget-header">';
    			wgtHtml += '		<div style="float:right;">';
    			wgtHtml += '			<button class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</button>';
    			wgtHtml += '			<button class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</button>';
    			wgtHtml += '			<button class="btn-close" style="cursor:pointer;" title="Close">&#10006;</button>';
    			wgtHtml += '		</div>';
    			wgtHtml += '		<h3>header</h3>';
    			wgtHtml += '	</div>';
    			wgtHtml += '	<div class="widget-content" style="height:100px;"></div>';
    			wgtHtml += '	<div class="widget-footer">footer</div>';
    			wgtHtml += '</div>';
				
    			var jqWgtColFirst = $('.widget-column:first');
    			jqWgtColFirst.append(wgtHtml);
    		});
    	});
    </script>
    
    </html>