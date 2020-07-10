/* ---------------------------------------------------------------------------------------- */
am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart1 = am4core.create("chartdiv1", am4charts.ChordDiagram);
  chart1.data = [
    { from: "A", to: "D", value: 10 },
    { from: "B", to: "D", value: 8 },
    { from: "B", to: "E", value: 4 },
    { from: "B", to: "C", value: 2 },
    { from: "C", to: "E", value: 14 },
    { from: "E", to: "D", value: 8 },
    { from: "C", to: "A", value: 4 },
    { from: "G", to: "A", value: 7 },
    { from: "D", to: "B", value: 1 }
  ];
  chart1.dataFields.fromName = "from";
  chart1.dataFields.toName = "to";
  chart1.dataFields.value = "value";
  // make nodes draggable
  var nodeTemplate = chart1.nodes.template;
  nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
  nodeTemplate.showSystemTooltip = true;
  var nodeLink = chart1.links.template;
  var bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
  bullet.fillOpacity = 1;
  bullet.circle.radius = 5;
  bullet.locationX = 0.5;
  // create animations
  chart1.events.on("ready", function() {
    for (var i = 0; i < chart1.links.length; i++) {
      var link = chart1.links.getIndex(i);
      var bullet = link.bullets.getIndex(0);
      animateBullet(bullet);
    }
  });
  function animateBullet(bullet) {
    var duration = 3000 * Math.random() + 2000;
    var animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
    animation.events.on("animationended", function(event) {
      animateBullet(event.target.object);
    });
  };
  chart1.legend = new am4charts.Legend();
  chart1.legend.fontSize = 12;
  chart1.legend.position = "bottom";
  chart1.legend.markers.template.width = 12;
  chart1.legend.markers.template.height = 12;

  chart1.responsive.enabled = true;

  window.addEventListener('resize', () => {
    if (window.innerWidth < 992) {
      chart1.legend.position = "bottom";
    } else {
      chart1.legend.position = "right";
    }
  }, true);
  chart1.svgContainer.autoResize = true;
});
/* --------------------------------------------------------------------------- */
am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end
  var chart2 = am4core.create("chartdiv2", am4charts.XYChart);
  chart2.hiddenState.properties.opacity = 0;
  chart2.data = [{
    category: "Cost of sales",
    value: 8786 - 2786,
    open: 8786,
    stepValue: 8786 - 2786,
    color: chart2.colors.getIndex( 8 ),
    displayValue: 2786
  }, {
    category: "Operating expenses",
    value: 8786 - 2786 - 1786,
    open: 8786 - 2786,
    stepValue: 8786 - 2786 - 1786,
    color: chart2.colors.getIndex( 9 ),
    displayValue: 1786
  }, {
    category: "Amortisation",
    value: 8786 - 2786 - 1786 - 453,
    open: 8786 - 2786 - 1786,
    stepValue: 8786 - 2786 - 1786 - 453,
    color: chart2.colors.getIndex( 10 ),
    displayValue: 453
  }];
  
  var categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "category";
  categoryAxis.renderer.minGridDistance = 40;
  var valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
  var columnSeries = chart2.series.push(new am4charts.ColumnSeries());
  columnSeries.dataFields.categoryX = "category";
  columnSeries.dataFields.valueY = "value";
  columnSeries.dataFields.openValueY = "open";
  columnSeries.fillOpacity = 0.8;
  columnSeries.sequencedInterpolation = true;
  columnSeries.interpolationDuration = 1500;
  var columnTemplate = columnSeries.columns.template;
  columnTemplate.strokeOpacity = 0;
  columnTemplate.propertyFields.fill = "color";
  var label = columnTemplate.createChild(am4core.Label);
  label.text = "{displayValue.formatNumber('$#,## a')}";
  label.align = "center";
  label.valign = "middle";
  var stepSeries = chart2.series.push(new am4charts.StepLineSeries());
  stepSeries.dataFields.categoryX = "category";
  stepSeries.dataFields.valueY = "stepValue";
  stepSeries.noRisers = true;
  stepSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
  stepSeries.strokeDasharray = "3,3";
  stepSeries.interpolationDuration = 2000;
  stepSeries.sequencedInterpolation = true;
  stepSeries.startLocation = 0.1;
  stepSeries.endLocation = 1.1;
  chart2.cursor = new am4charts.XYCursor();
  chart2.cursor.behavior = "none";
  
  chart2.legend = new am4charts.Legend();
  chart2.legend.fontSize = 12;
  chart2.legend.position = "right";
  chart2.legend.markers.template.width = 12;
  chart2.legend.markers.template.height = 12;

  chart2.responsive.enabled = true;

  window.addEventListener('resize', () => {
    if (window.innerWidth < 992) {
      chart2.legend.position = "bottom";
    } else {
      chart2.legend.position = "right";
    }
  }, true);
});
/* --------------------------------------------------------------------------------------- */
am4core.ready(function() {
  am4core.useTheme(am4themes_animated);
  var chart3 = am4core.create("chartdiv3", am4charts.XYChart);
  chart3.data = [{
    "country": "USA",
    "visits": 2025
  }, {
    "country": "France",
    "visits": 1114
  }, {
    "country": "Spain",
    "visits": 711
  }, {
    "country": "Netherlands",
    "visits": 665
  }, {
    "country": "Russia",
    "visits": 580
  }, {
    "country": "Canada",
    "visits": 441
  }, {
    "country": "Brazil",
    "visits": 395
  }];
  var categoryAxis = chart3.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "country";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 30;
  categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
    if (target.dataItem && target.dataItem.index & 2 == 2) {
      return dy + 25;
    }
    return dy;
  });
  var valueAxis = chart3.yAxes.push(new am4charts.ValueAxis());
  var series = chart3.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "visits";
  series.dataFields.categoryX = "country";
  series.name = "Visits";
  series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = .8;
  var columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;

  chart3.legend = new am4charts.Legend();
  chart3.legend.fontSize = 12;
  chart3.legend.position = "right";
  chart3.legend.markers.template.width = 12;
  chart3.legend.markers.template.height = 12;

  chart3.responsive.enabled = true;
  
  window.addEventListener('resize', () => {
    if (window.innerWidth < 992) {
      chart3.legend.position = "bottom";
    } else {
      chart3.legend.position = "right";
    }
  }, true);
});
/* -------------------------------------------------------------------------------- */
/* grid stack api */
var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: 'e, se, s, sw, w'
  },
  acceptWidgets: '.newWidget',
});
$('.newWidget').draggable({
  revert: 'invalid',
  appendTo: 'body',
  helper: 'clone',
});
/* -------------------------------------------------------------------------------------- */