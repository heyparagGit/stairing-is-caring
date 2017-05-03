//home-totals.json


var totalDollarsFunc = function(){
  $.getJSON('/data/total-dollars.json', function (totalDollarsData){
    console.log(totalDollarsData);

    totalDollarsData.totalDollars.map(function (totalDollars){
      $('#total-dollars').html('Total Raised: ' + totalDollars.count);
      return totalDollars.count;
    });


  })
};

var homeTotalsFunc = function(){
  $.getJSON('/data/home-totals.json', function (homeTotalsData){
    console.log(homeTotalsData);

    var items = homeTotalsData.homeTotals.map(function (homeTotals){
      return homeTotals.count + ' ' + homeTotals.object;
    });

    if (items.length) {
      var content = '<li><h3>' + items.join('</h3></li> <li><h3>') + '</li></h3>';
      $('#home-totals').append(content);
    }

  });
};

$(document).ready(function(){
  homeTotalsFunc();
  totalDollarsFunc();

});
