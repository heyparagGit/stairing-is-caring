//Stairing is Caring
// climber-detail.html script

var climberRender = function(){
  $.getJSON('data/climber.json', function(climberData){
    $('#climber-image').html('<img src="' + climberData.image + '" />');
    $('#climber-name').html(climberData.first_name + ' ' + climberData.last_name);
    $('#climber-team').html(climberData.team.name);
    $('#climber-email').html(climberData.email);
    var careerStairs = numeral(climberData.career_stairs).format('(0,0)');
    var careerDonations = numeral(climberData.career_donations).format('($0,0)');
    $('#career-stairs').html(careerStairs);
    $('#career-donations').html(careerDonations);
    $('#climber-next-event').html('<a href="events/'+climberData.team.event.id+'">'+climberData.team.event.name+'</a>');
    var eventDate = moment(climberData.team.event.event_date).format('MMMM Do, YYYY');
    $('#event-date').html(eventDate);
    $('#climber-company').html(climberData.company.name);
    $('#climber-company-logo').html('<img class="company-logo" src="'+ climberData.company.company_logo +'" />');
  });
};

var eventHistoryRender = function(){
  $.getJSON('data/event-history.json', function(eventsHistoryData){
    console.log(eventsHistoryData);

    eventsHistoryData.eventHistory.map(function(eventsHistoryData){
      var eventDate = moment(eventsHistoryData.event.event_date).format('MMM D, YYYY');
      var stairs = numeral(eventsHistoryData.stairs_climbed).format('(0,0)');
      var donations = numeral(eventsHistoryData.pledge_total).format('($0,0)');
      var content = '<tr><td>' + eventsHistoryData.event.name + '</td><td>' + eventDate + '</td><td>'+ stairs +'</td><td>'+donations+'</td></tr>';

      $('#climber-history').append(content);
    });
  });
};

$(document).ready(function(){
  climberRender();
  eventHistoryRender();
});
