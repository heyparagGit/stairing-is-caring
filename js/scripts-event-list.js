//Stairing is Caring
// events-list.html script

var eventTableRender = function(){
  $.getJSON('data/events.json', function (eventsData){
    console.log(eventsData);
    eventsData.events.map(function (events){
      var donations = numeral(events.donation_data.sum_donations).format('($0,0)');
      var eventDate = moment(events.event_date).format('MMM D, YYYY');
      var startTime = moment(events.event_start_time).format('h:mm A');
      var endTime = moment(events.event_end_time).format('h:mm A');

      var content = '<tr><td><img src="' + events.image + '" /></td><td><a href="event/'+ events.id +'">'+ events.name + '</a></td><td><span>' + eventDate + '</span><br /><span>'+ startTime + '</span>&nbsp;&ndash;&nbsp;<span>' + endTime + '</span></td><td>' + events.charity.name + '</td><td>' + events.location.city + ', ' + events.location.state + '</td><td><div class="thermometer"><div class="thermo-border"></div><div class="thermo-fill" style="width:' + events.donation_data.percent + '%;"></div><div class="thermo-bg"></div></div><h3 class="thermo-val text-muted">'+ donations + '</h3></td><td><h3>' + events.team_count + '</h3></td></tr>';

      $('#event-table').append(content);
    });
  });
};

$(document).ready(function(){
  eventTableRender();
});
