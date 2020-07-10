/* grid stack api */

var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: 'e, se, s, sw, w'
  },
  removable: '#trash',
  removeTimeout: 100,
  acceptWidgets: '.newWidget'
});

grid.on('added', function(e, items) { log('added ', items) });
grid.on('removed', function(e, items) { log('removed ', items) });
grid.on('change', function(e, items) { log('change ', items) });
function log(type, items) {
  var str = '';
  items.forEach(function(item) { str += ' (x,y)=' + item.x + ',' + item.y; });
  console.log(type + items.length + ' items' + str );
}
// TODO: switch jquery-ui out
$('.newWidget').draggable({
  revert: 'invalid',
  scroll: false,
  appendTo: 'body',
  helper: 'clone',
});

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
  })
  
  function animateBullet(bullet) {
    var duration = 3000 * Math.random() + 2000;
    var animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
    animation.events.on("animationended", function(event) {
      animateBullet(event.target.object);
    })
  }
});