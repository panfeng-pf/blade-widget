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
```html
<script src="jquery.min.js"></script>
<script src="jquery-ui.min.js"></script>
<script src="jquery.blade-widget.js"></script>
```

### widget container functions
```javascript
// initial container
$('selector').bladeWidgetContainer(); // or $('selector').bladeWidgetContainer(options);

// add widget into container
$('selector').bladeWidgetContainer({
	action: 'add'
	, wgtHtml: '...'
});
```

### Option description and default value
```javascript
{
	mode: 'column'  /* column | row */
	, saveLayout: function(layout) {} /* callback function for save layout, parameter is a JSON object, format is [{'id':'x', 'col':y, 'row':z}, ...] */
}
```

### Widget functions
```javascript
// minimize widget, and restore it
$('selector').bladeWidget('toggle-min');

// maximize widget and restore it
$('selector').bladeWidget('toggle-max');
```

### Widget events
* blade.widget.win.min
* blade.widget.win.max
* blade.widget.win.restore
	
```javascript
$('selector').on('blade.widget.win.max', function(e, jqWgt) {
	console.log('event "blade.widget.win.max" has triggered');
}).on('blade.widget.win.min', function(e, jqWgt) {
	console.log('event "blade.widget.win.min" has triggered');
}).on('blade.widget.win.restore', function(e, jqWgt) {
	console.log('event "blade.widget.win.restore" has triggered');
});
```

Example for column mode
--------------
```html
<html>
<head>
	<title>Blade Widget Vertical Demo</title>
	<link rel="stylesheet" href="../jquery.blade-widget.css">
</head>
<body>
	<Strong>Blade Widget Vertical Demo</strong>
	<button id="btn-add">+ Add</button>
	<button id="btn-min-all">&mdash; Minimize All</button>
	<button id="btn-restore-all">&equiv; Restore All</button>
	<hr>
	<div>
		<!-- ================================== -->
		<!-- column 1 -->
		<!-- ================================== -->
		<div class="widget-column" style="width:20%;">
			<!-- ================================== -->
			<!-- widget A -->
			<!-- ================================== -->
			<div class="widget" id="A">
				<div class="widget-header">
					<div style="float:right;">
						<span class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</span>
						<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>
						<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>
					</div>
					<h3>Widget 1</h3>
				</div>
				<div class="widget-content" style="height:200px;overflow:auto;">
					<div style="padding:10px;">
						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
					</div>
				</div>
				<div class="widget-footer">footer</div>
			</div>
		 
			<!-- ================================== -->
			<!-- widget B -->
			<!-- ================================== -->
			<div class="widget" id="B">
				<div class="widget-header">
					<div style="float:right;">
						<span class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</span>
						<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>
						<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>
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
			<!-- ================================== -->
			<!-- widget C -->
			<!-- ================================== -->
			<div class="widget" id="C">
				<div class="widget-header">
					<div style="float:right;">
						<span class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</span>
						<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>
						<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>
					</div>
					<h3>Widget 3</h3>
				</div>
				<div class="widget-content" style="height:250px;">
					<iframe src="./iframes/iframe4img.html"></iframe>
				</div>
				<div class="widget-footer">footer</div>
			</div>
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
		jqWgtColSet.bladeWidgetContainer({
			mode: 'column'
			, saveLayout: function(layout) {
				console.log(JSON.stringify(layout));
			}
		});
		
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
			
			jqWgt.bladeWidget('toggle-min');
			if(jqWgt.hasClass('widget-min')) {
				jqBtn.html('&equiv;');
			} else {
				jqBtn.html('&mdash;');
			}
		}).on('click', '.btn-max', function() {
			var jqBtn = $(this);
			var jqWgt = jqBtn.closest('.widget');
			
			jqWgt.bladeWidget('toggle-max');
			if(jqWgt.hasClass('widget-max')) {
				jqBtn.html('&#9744;<small>]</small>');
			} else {
				jqBtn.html('&#9744;');
			}
		});
		
		//--------------------------------------
		// handle widget event
		//--------------------------------------
		jqWgtColSet.on('blade.widget.win.max', function(e, jqWgt) {
			var log = 'event "blade.widget.win.max" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
			console.log(log);
		}).on('blade.widget.win.min', function(e, jqWgt) {
			var log = 'event "blade.widget.win.min" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
			console.log(log);
		}).on('blade.widget.win.restore', function(e, jqWgt) {
			var log = 'event "blade.widget.win.restore" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
			console.log(log);
		});
		
		//--------------------------------------
		// add new widget
		//--------------------------------------
		$('#btn-add').click(function() {
			var wgtHtml = '';
			wgtHtml += '<div class="widget">';
			wgtHtml += '	<div class="widget-header">';
			wgtHtml += '		<div style="float:right;">';
			wgtHtml += '			<span class="btn-min" style="cursor:pointer;" title="Minimize">&mdash;</span>';
			wgtHtml += '			<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>';
			wgtHtml += '			<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>';
			wgtHtml += '		</div>';
			wgtHtml += '		<h3>header</h3>';
			wgtHtml += '	</div>';
			wgtHtml += '	<div class="widget-content" style="height:100px;"></div>';
			wgtHtml += '	<div class="widget-footer">footer</div>';
			wgtHtml += '</div>';
			
			jqWgtColSet.bladeWidgetContainer({
				action: 'add'
				, wgtHtml: wgtHtml
			});
		});
		
		//--------------------------------------
		// minimize all widgets
		//--------------------------------------
		$('#btn-min-all').click(function() {
			jqWgtColSet.find('.widget').each(function() {
				var jqWgt = $(this);
				if(! jqWgt.hasClass('widget-min')) {
					jqWgt.find('.btn-min').click();
				}
			});
		});
		
		//--------------------------------------
		// restore all widgets
		//--------------------------------------
		$('#btn-restore-all').click(function() {
			jqWgtColSet.find('.widget').each(function() {
				var jqWgt = $(this);
				if(jqWgt.hasClass('widget-min')) {
					jqWgt.find('.btn-min').click();
				}
			});
		});
	});
</script>
</html>
```

Example for row mode
--------------
```html
<html>
<head>
	<title>Blade Widget Horizontal Demo</title>
	<link rel="stylesheet" href="../jquery.blade-widget.css">
</head>
<body>
	<Strong>Blade Widget Horizontal Demo</strong>
	<button id="btn-add">+ Add</button>
	<hr>
	<div>
		<!-- ================================== -->
		<!-- row 1 -->
		<!-- ================================== -->
		<div id="row-1" class="widget-row" style="height:200px;">
			<!-- ================================== -->
			<!-- widget A -->
			<!-- ================================== -->
			<div class="widget" id="A" style="width:200px;">
				<div class="widget-header">
					<div style="float:right;">
						<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>
						<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>
					</div>
					<h3>Widget 1</h3>
				</div>
				<div class="widget-content" style="overflow:auto;">
					<div style="padding:10px;">
						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
						Hello world! Hello world! Hello world! Hello world! Hello world! Hello world!
					</div>
				</div>
				<div class="widget-footer">footer</div>
			</div>
		 
			<!-- ================================== -->
			<!-- widget B -->
			<!-- ================================== -->
			<div class="widget" id="B" style="width:300px;">
				<div class="widget-header">
					<div style="float:right;">
						<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>
						<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>
					</div>
					<h3>Widget 2</h3>
				</div>
				<div class="widget-content">
					<iframe src="http://wap.baidu.com"></iframe>
				</div>
				<div class="widget-footer">footer</div>
			</div>
		</div>
		
		<!-- ================================== -->
		<!-- row 2 -->
		<!-- ================================== -->
		<div id="row-2" class="widget-row" style="height:150px;">
			<!-- ================================== -->
			<!-- widget C -->
			<!-- ================================== -->
			<div class="widget" id="C" style="width:300px;">
				<div class="widget-header">
					<div style="float:right;">
						<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>
						<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>
					</div>
					<h3>Widget 3</h3>
				</div>
				<div class="widget-content">
					<iframe src="./iframes/iframe4img.html"></iframe>
				</div>
				<div class="widget-footer">footer</div>
			</div>
		</div>
	</div>
</body>

<script src="dependency/jquery-1.11.2.min.js"></script>
<script src="dependency/jquery-ui-1.11.4/jquery-ui.min.js"></script>
<script src="../jquery.blade-widget.js"></script>
<script type="text/javascript">
	$(function() {
		//--------------------------------------
		// initial widget row
		//--------------------------------------
		var jqWgtRowSet = $('.widget-row');
		jqWgtRowSet.bladeWidgetContainer({
			mode: 'row'
			, saveLayout: function(layout) {
				console.log(JSON.stringify(layout));
			}
		});
		
		//--------------------------------------
		// widget action buttons
		//--------------------------------------
		jqWgtRowSet.on('click', '.btn-close', function() {
			var jqBtn = $(this);
			var jqWgt = jqBtn.closest('.widget');
			
			jqWgt.remove();
		}).on('click', '.btn-max', function() {
			var jqBtn = $(this);
			var jqWgt = jqBtn.closest('.widget');
			
			jqWgt.bladeWidget('toggle-max');
			if(jqWgt.hasClass('widget-max')) {
				jqBtn.html('&#9744;<small>]</small>');
			} else {
				jqBtn.html('&#9744;');
			}
		});
		
		//--------------------------------------
		// handle widget event
		//--------------------------------------
		jqWgtRowSet.on('blade.widget.win.max', function(e, jqWgt) {
			var log = 'event "blade.widget.win.max" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
			console.log(log);
		}).on('blade.widget.win.restore', function(e, jqWgt) {
			var log = 'event "blade.widget.win.restore" has triggered by widget whose id is [' + jqWgt.attr('id') + ']';
			console.log(log);
		});
		
		//--------------------------------------
		// add new widget
		//--------------------------------------
		$('#btn-add').click(function() {
			var wgtHtml = '';
			wgtHtml += '<div class="widget" style="width:200px;">';
			wgtHtml += '	<div class="widget-header">';
			wgtHtml += '		<div style="float:right;">';
			wgtHtml += '			<span class="btn-max" style="cursor:pointer;" title="Maximize">&#9744;</span>';
			wgtHtml += '			<span class="btn-close" style="cursor:pointer;" title="Close">&#10006;</span>';
			wgtHtml += '		</div>';
			wgtHtml += '		<h3>header</h3>';
			wgtHtml += '	</div>';
			wgtHtml += '	<div class="widget-content"></div>';
			wgtHtml += '	<div class="widget-footer">footer</div>';
			wgtHtml += '</div>';
			
			jqWgtRowSet.bladeWidgetContainer({
				action: 'add'
				, wgtHtml: wgtHtml
			});
		});
	});
</script>
</html>
```
