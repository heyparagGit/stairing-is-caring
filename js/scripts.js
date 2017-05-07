//Stairing is Caring scripts

var recentCommentFunc = function(){
  $.getJSON('/data/recent-comments-data.json', function (recentCommentData){
    console.log(recentCommentData);

    var recentCommentsMap = recentCommentData.recentComments.map(function (recentComments){
      var commentDatetime = moment(recentComments.created_at).format('h:m A MMM d YYYY');
      var content =
      '<div class="recent-activity"><img class="avatar-small pull-left" src="'
      + recentComments.commenter.image
      + '" /> <a class="h3" href="#">' + recentComments.commenter.name
      + '</a><h6>' + recentComments.created_at
      + '</h6><p>' + recentComments.comment
      + '</p><p>' + recentComments.pledge_amount + ', ' + recentComments.stairs_guess
      '</p></div>';

      $('#activity-stream').append(content);

    });

  });
};

var eventCardFunc = function(){
  $.getJSON('/data/event-card-data.json', function (eventCardData){
    console.log(eventCardData);

    var eventsData = eventCardData.events.map(function (events){
      var eventDate = moment(events.event_date).format('MMM Do, YYYY');
      var content =
        '<div class="col-sm-3"><div class="event-card"><img src="'
        + events.image + '" /><div class="event-card-content"><a class="h3">'
         + events.name + '</a><p>'
         + eventDate + '<br />'
         + events.location.city + ', ' + events.location.state + '</p><h4 class="text-muted uppercase">Benefiting</h4><h3>'
         + events.charity.name + '</h3><div class="thermometer"><div class="thermo-border"></div><div class="thermo-fill" style="width:'
         + events.donation_data.percent + '%;"></div><div class="thermo-bg"></div></div><h3 class="thermo-val text-muted">'
         + events.donation_data.sum_donations
         + '</h3></div></div></div>';

      $('#event-card-list').append(content);
    });
  });
};

var totalDollarsFunc = function(){
  $.getJSON('/data/total-dollars.json', function (totalDollarsData){
    console.log(totalDollarsData);

    totalDollarsData.totalDollars.map(function (totalDollars){
      $('#total-dollars').html('Total Raised: ' + totalDollars.count);
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
  eventCardFunc();
  recentCommentFunc();
});
