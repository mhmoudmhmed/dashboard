var gridHeight;

var grid = $('#grid_stack_cont').data('gridstack');
var justGrid = $('#grid_stack_cont');

var options = {
	float : true,
	animation: true,
	height: 6.5,
	acceptWidgets: '.outer_widget'
};
var finalOptions = {
	float: true,
	height: 6.5,
	animation: true
};
var twoGridOptions = {
	float: true,
	animation: true,
	height: 6.5,
	removeTimeout: 100,
	acceptWidgets: '.outer_widget'
};

justGrid.attr('data-gs-height', gridHeight);
justGrid.attr('data-gs-max-height', gridHeight);
justGrid.attr('data-gs-min-height', gridHeight);


$('.outer_widget').draggable({
	stack: '.outer_widget'
});

$(document).ready(function() {
	$('#final_prod').removeClass('ui-droppable');
	//         var $inner_content = $('#grid_stack_holder').children('.inner_widget').children('.grid-stack-item-content').children();
	//         	$inner_content.hide();
	$('.outer_widget').css('pointer-events', 'none');
      	
	$('.remove_outer').hide();
	$('.add_inner').hide();
	$('.remove_inner').hide();

	// initialize gridstack
	$('.grid-stack').gridstack(options);
	$('#grid_stack_holder').gridstack(twoGridOptions);
	


	// initialize gridstack
	$('#grid_stack_cont').gridstack(twoGridOptions);
	$('#grid_stack_holder').gridstack(twoGridOptions);
	$('#final_grid').gridstack(finalOptions);

	var grid = $('.grid-stack').data('gridstack');
	grid.disable();

	$('.inner_widget').draggable({
		revert: 'valid',
		handle: '.grid_stack_inner_content',
		scroll: false,
		appendTo: 'body',
		containment: $(this).closest('.outer_widget'),
		stack: '.inner_widget',
		drop: function( event, ui ) {
			$(this).children('.grid-stack-item-content').css('background-color', 'rgba(196, 18, 60, 0.1) !important');
			var outer_widget = $(this).closest('.outer_widget');
			var outer_height = outer_widget.height();
		}
	});

	$('#edit_tgl').on('click', function() {
		if( $('#edit_tgl').is(':checked') ) {
			$('.clear_grid').attr('disabled', false);
			$('.ser_grid').attr('disabled', false);
			$('.move_all').attr('disabled', false);
			$('.outer_widget').css('pointer-events', 'auto');
			$('#addWidget').show();
			$(document).on({
				mouseenter: function() {
					if( $(this).parent('#grid_stack_holder').length ) {
						$(this).children('.remove_outer').hide();
						$('.outer_widget').children('.ui-resizable-handle').hide();
						grid.resizable('.outer_widget', false);
					} else if ( $(this).parent('#grid_stack_cont').length ) {
						$(this).children('.remove_outer').show();
						$(this).children('.ui-resizable-handle').show();
						grid.resizable('.outer_widget', true);
					}
				},
				mouseleave: function() {
					if( $(this).parent('#grid_stack_holder').length ) {
					} else if ( $(this).parent('#grid_stack_cont').length ) {
						$(this).children('.remove_outer').hide();
					}
					$(this).children('.remove_outer').hide();
					$(this).children('.add_inner').hide();
				}
			}, '.outer_widget');

			grid.enable();
			grid.movable('.outer_widget', true);
			grid.resizable('.outer_widget', true);
		} else {
			$('.clear_grid').attr('disabled', true);
			$('.ser_grid').attr('disabled', true);
			$('.move_all').attr('disabled', true);
			$('.outer_widget').css('pointer-events', 'none');
			$('.outer_widget').children('.remove_outer').hide();
			$('#addWidget').hide();
			$('.outer_widget').children('.remove_outer').hide();
			$('.outer_widget').children('.ui-resizable-handle').hide();
			grid.disable();
			grid.movable('.outer_widget', false);
			grid.resizable('.outer_widget', false);
			$(document).off('mouseenter mouseleave', '.outer_widget');
			$(document).off('mouseenter mouseleave', '.inner_widget');
		}
	});

	$(".grid-stack-item").draggable();

	$(document).on('click', '.remove_outer', function(e){
		e.preventDefault();
		var grid = $(this).closest('.grid-stack').data('gridstack');
		var grid_holder = $('#grid_stack_holder').data('gridstack');
		var $el = $(this).closest('.outer_widget');
		// remove widgets from final product
		$('#final_prod').children('.outer_widget').remove();
		
		if( $(this).parent().parent().hasClass('grid-stack') ) {
			// remove it and move it
			grid.removeWidget($el);
			grid_holder.addWidget($el, 0, 0, 4, 2, true);
			
			$el.each(function() {
				var self = this;
				$(this).children('.remove_outer').hide();
				$el.children('.widget_text').removeClass('widget_placeholder_inside').addClass('widget_placeholder');
				$el.removeAttr('data-gs-min-width');
				grid_holder.minWidth($el, 4);
				grid_holder.update($el, 0, undefined, 4, 2);
				grid_holder.resize($el, 4, 2);
				$(this).draggable({
					revert: 'valid',
					handle: '.grid-stack-item-content',
					scroll: false,
					appendTo: 'body',
					containment: '.layout_panel'
				});
				$(self).removeClass('active');
				$(self).children().children('.box-over').css('animation-play-state','paused');
			});
		}
		
		var holdGrid = $('#grid_stack_holder').data('gridstack');
		var $holdWidgets = $('#grid_stack_holder').children('.outer_widget');
		// rearrange widgets within the holder grid
		// before the widgets were floating out of the static grid
		$holdWidgets.each(function(index){
			// reposition widgets one after another
			var self = this;
			setTimeout(function () {
				holdGrid.removeWidget($(self));
				holdGrid.addWidget($(self), undefined, undefined, 4, 2, true);
			}, index*0);
		});
		// reinitialize grid
		$('#grid_stack_holder').gridstack(twoGridOptions);
	});

	//     	// dragstart get current parent container id
	$(document).on('dragstart', '.outer_widget', function(event, ui) {
		var grid = $('#grid_stack_cont').data('gridstack');
		var holdGrid = $('#grid_stack_holder').data('gridstack');
		var justGrid = $('#grid_stack_cont');
		// remove widgets from final product
		$('#final_prod').children('.outer_widget').remove();

		// reinitialize the grid
		$('#grid_stack_cont').gridstack(options);
		
		var $all = $('.grid-stack-item');
		// disabling the siblings
		holdGrid.movable('.grid-stack-item', false);
		holdGrid.resizable('.grid-stack-item', false);
		holdGrid.locked($all, true);
		// disabling the siblings
		grid.movable('.grid-stack-item', false);
		grid.resizable('.grid-stack-item', false);
		grid.locked($all, true);
		
		if ( $(this).parent('#grid_stack_cont').length ) {
			$(this).draggable({
				revert: 'valid',
				handle: '.grid-stack-item-content',
				scroll: false,
				appendTo: 'body',
				containment: $(this).parent('#grid_stack_cont')
			});

		} else if( $(this).parent('#grid_stack_holder').length ) {
			$(this).draggable({
				revert: 'valid',
				handle: '.grid-stack-item-content',
				scroll: false,
				appendTo: 'body',
				containment: '.layout_panel'
			});
		}
  });
	
	$('#grid_stack_cont').droppable({
			drop: function( event, ui ) {

				console.log('dropped');
				
				var grid = $('#grid_stack_cont').data('gridstack');
				var holdGrid = $('#grid_stack_holder').data('gridstack');

				var justGrid = $('#grid_stack_cont');
				// Cannot target the widget being dragged by using "this" in any way
				// Instead, use .last() to target the current widget
				// this works because the widget will always be added to the end if there will be overflow
				var $el = $('#grid_stack_cont .outer_widget').last();
				var $gridWidgets = $('#grid_stack_cont').children('.outer_widget');
				var $holdWidgets = $('#grid_stack_holder').children('.outer_widget');
				
				var $all = $('.grid-stack-item');

				// enabling the siblings
				holdGrid.movable('.grid-stack-item', true);
				holdGrid.resizable('.grid-stack-item', true);
				holdGrid.locked($all, false);

				grid.movable('.grid-stack-item', true);
				grid.resizable('.grid-stack-item', true);
				grid.locked($all, false);
				
				if( $holdWidgets.length < 9) {
					$('.move-all').prop('disabled', true);
				}
				console.log($holdWidgets.length);
				//var $anime = $(ui.draggable).children().children('.box-over');
				//console.log($anime.attr('class'));
				//$anime.css('animation-play-state','running');
				//$(anime).html('hello');
				//console.log( _this.attr('id'));
				
				$(ui.draggable).addClass('active');
				
				$el.each(function() {
					var self = this;
					$(self).addClass('active');
					$(self).children().children('.box-over').css('animation-play-state','running');
				});

				if ( $(justGrid).attr('data-gs-current-height') >= 7 ) {
					console.log("overflow");

					// returning the widget that does not fit back to the holder grid
					$el.each(function() {
						var self = this;
						grid.removeWidget( $el );
						holdGrid.addWidget( $el, 0, 0, undefined, undefined, true);
					});

				}
				else {
					console.log("no overflow");
				}

				// reinitializing the draggable function, so that the widget is contained to the grid on drop
				$gridWidgets.each(function() {
					var self = this;
					if ( $(self).parent('#grid_stack_cont').length ) {
						$(self).draggable({
							revert: 'valid',
							handle: '.grid-stack-item-content',
							scroll: false,
							appendTo: 'body',
							containment: $(self).parent('#grid_stack_cont')
						});
					}
				});

				// rearrange widgets within the holder grid
				$holdWidgets.each(function(index){
					// reposition widgets one after another
					var self = this;
					setTimeout(function () {
						holdGrid.removeWidget($(self));
						holdGrid.addWidget($(self), 0, 0, 4, 2, true);
					}, index*0);
				});

				// reinitialize the grid
				$(this).gridstack(options);
			}
		});

	// dragstop get current parent container id, could have been dragged into new parent or dropped within same parent
	$(document).on('dragstop', '.outer_widget', function(event, ui) {
		var grid = $(this).parent('#grid_stack_cont').data('gridstack');
		var holdGrid = $('#grid_stack_holder').data('gridstack');
		console.log('stopped dragging');
		$(this).draggable({
			revert: 'valid',
			handle: '.grid-stack-item-content',
			scroll: false,
			appendTo: 'body',
			containment: $(this).parent('#grid_stack_cont')
		});
		
		var $sibs = $(this).siblings('.grid-stack-item');
		// enabling the siblings
		holdGrid.movable('.grid-stack-item', true);
		holdGrid.resizable('.grid-stack-item', true);
		holdGrid.locked($sibs, false);

		grid.movable('.grid-stack-item', true);
		grid.resizable('.grid-stack-item', true);
		grid.locked($sibs, false);

		$(this).removeClass('ui-draggable-dragging');
		$(this).parent().gridstack(twoGridOptions);
	});

	$(document).on('click', '.clear_grid', function() {
		var grid = $('#grid_stack_cont').data('gridstack');
		var $gridWidgets = $('#grid_stack_cont').children('.outer_widget');
		var holdGrid = $('#grid_stack_holder').data('gridstack');
		// remove widgets from final product
		$('#final_prod').children('.outer_widget').remove();

		// clearing the grid of all widgets and autopositioning them into the holder grid
		$gridWidgets.each(function(index){
			// remove from grid, reposition in holder grid one after another
			var self = this;
			setTimeout(function() {
				grid.removeWidget($(self));
				holdGrid.addWidget($(self), 0, 0, 4, 2, true);
			}, index*0);
		});
		// clear the serialization output
		$('.ser_output').val( '' );
		// reinitialize the grid
		$('#grid_stack_cont').gridstack(options);
		$('#final_prod').gridstack(finalOptions);

	});
	
	// moving all of the grid holder widgets to the "final" grid
	$(document).on('click', '.move_all', function() {
		var grid = $('#grid_stack_cont').data('gridstack');
		var holdGrid = $('#grid_stack_holder').data('gridstack');
		
		var $gridWidgets = $('#grid_stack_cont').children('.outer_widget');
		var $holdWidgets = $('#grid_stack_holder').children('.outer_widget');
		console.log($holdWidgets.length);
		if( $holdWidgets.length < 9) {
			
		} else if ( $holdWidgets.length === 9 ) {
			$holdWidgets.each(function(index){
				var self = this;
				setTimeout(function () {
					holdGrid.removeWidget($(self));
					grid.addWidget($(self), 0, 0, 4, 2, true);
				}, index*0);
			});
		}
		
		
	
			// reinitializing the draggable function, so that the widget is contained to the grid on drop
			$('.outer_widget').draggable({
				revert: 'valid',
				handle: '.grid-stack-item-content',
				scroll: false,
				appendTo: 'body',
				containment: $('#grid_stack_cont')
			});

		
		// reinitialize the grid
		$('#grid_stack_holder').gridstack(options);
		
	});
	
	
	// SERIALIZE THE GRID
	$(document).on('click', '.ser_grid', function() {
		// remove widgets from final product
		$('#final_prod').children('.outer_widget').remove();
		
		// create an empty array
		var grid_array = [];
		var $el = $('#grid_stack_cont').children('.outer_widget');
		
		// loop through each .outer_widget, get the attributes needed
		$el.each(function(index){
			var self = this;
			// attach these attributes to the nested array
			grid_array.push({
				id: $(self).attr('id'),
				x: $(self).attr('data-gs-x'),
				y: $(self).attr('data-gs-y'),
				width: $(self).attr('data-gs-width'),
				height: $(self).attr('data-gs-height'),
				fabClass: $(self).children().children().attr('class')
			});
		});
		// make the outputs pretty with JSON.stringify 
		console.log( JSON.stringify(grid_array, null, "\t") );
		$('.ser_output').val( JSON.stringify(grid_array, null, "\t") );
		
		// console log the array's length 
		console.log(grid_array.length);
		
		// count the number of items in the full array
		var count = grid_array.length;
		// add widgets to the final output, equal to the count
    for (var i = 0; i < count; i++) {
				// find the count and append equivalent values.
        $('#final_prod').append(' <div id="'+grid_array[i]["id"]+'" class="outer_widget grid-stack-item" ' +
																	' data-gs-x="'+grid_array[i]["x"]+'" ' +
																	' data-gs-y="'+grid_array[i]["y"]+'" ' +
																	' data-gs-width="'+grid_array[i]["width"]+'" ' +
																	' data-gs-height="'+grid_array[i]["height"]+'" > ' +
																	' <div class="grid-stack-item-content ui-draggable-handle"> ' + 
																	' <i class="'+grid_array[i]["fabClass"]+'"></i> ' +
																	' </div> ' +
															 	' </div> ');
    }
	});
	
});


// gridstack has multiple problems like widgets overlapping each other, 
// widgets being removed when you click one widget in one grid and another in the other grid,
// there are some other problems as well, the text in the "pls read" box will fix these.
$('.pls_read_btn').on('click', function(e) {
		e.preventDefault();
  if(!$('.pls_read_div').is(':visible')) {
			$( ".pls_read_div" ).show('slide',{direction:'right'},500);
      //$('#icon-toggle').addClass('fa-times');
      //$('#icon-toggle').removeClass('fa-bars');
		} else {
			$( ".pls_read_div" ).hide('slide',{direction:'right'},500);
      //$('#icon-toggle').removeClass('fa-times');
      //$('#icon-toggle').addClass('fa-bars');
		}
});

// light orange rgb(255, 204, 153)
// comments rgb(108, 103, 131)
// strings rgb(255, 186, 118)
// html rgb(255, 186, 118)
// violet rgb(155, 135, 253)
// background rgb(108, 103, 131)
// variable call rgb(106, 81, 230)