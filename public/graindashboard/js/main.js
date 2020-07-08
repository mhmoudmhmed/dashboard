/* grid stack api */

var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: 'e, se, s, sw, w'
  },
  acceptWidgets: '.newWidget'
});
grid.on('added', function(e, items) { log('added ', items) });
grid.on('removed', function(e, items) { log('removed ', items) });
grid.on('change', function(e, items) { log('change ', items) });

function log(type, items) {
  console.log(items);
  window.localStorage.setItem("items", "chart1");
  var str = '';
  items.forEach(function(item) { str += ' (x,y)=' + item.x + ',' + item.y; });
  console.log(type + items.length + ' items.' + str );
}
$('.newWidget').draggable({
  revert: 'invalid',
  scroll: false,
  appendTo: 'body',
  helper: 'clone'
});


/* ---------------------------------------------------------------------------------------- */
var chart1 = bb.generate({
  data: {
    columns: [
	["data1", 30],
	["data2", 120]
    ],
    type: "pie",
    onclick: function(d, i) {
	console.log("onclick", d, i);
  },
    onover: function(d, i) {
	console.log("onover", d, i);
  },
    onout: function(d, i) {
	console.log("onout", d, i);
  }
  },
  bindto: "#pieChart"
});

setTimeout(function() {
	chart1.load({
		columns: [
			["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
			["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
			["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
		]
	});
}, 1500);

setTimeout(function() {
	chart1.unload({ ids: "data1" });
	chart1.unload({ ids: "data2" });
}, 2500);
/* ---------------------------------------------------------------------------------------- */
var chart2 = bb.generate({
  data: {
    columns: [
	["data1", 30, 200, 100, 400, 150, 250],
	["data2", 130, 100, 140, 200, 150, 50]
    ],
    type: "bar"
  },
  bar: {
    width: {
      ratio: 0.5
    }
  },
  bindto: "#barChart"
});

setTimeout(function() {
	chart2.load({
		columns: [
			["data3", 130, -150, 200, 300, -200, 100]
		]
	});
}, 1000);

/*----------------------------------------------------------------------------*/
var chart3 = bb.generate({
  data: {
    columns: [
	["data1", 30, 20, 50, 40, 60, 50],
	["data2", 200, 130, 90, 240, 130, 220],
	["data3", 300, 200, 160, 400, 250, 250],
	["data4", 200, 130, 90, 240, 130, 220],
	["data5", 130, 120, 150, 140, 160, 150],
	["data6", 90, 70, 20, 50, 60, 120],
	["data7", 283, 170, 275, 143, 220, 255]
    ],
    type: "bar",
    types: {
      data3: "spline",
      data4: "line",
      data6: "area",
      data7: "step"
    },
    groups: [
      [
        "data1",
        "data2"
      ]
    ]
  },
  bindto: "#combinationChart"
});
/* ------------------------------------------------------------------------------ */


