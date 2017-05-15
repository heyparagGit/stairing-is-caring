//Stairing is Caring
// event-detail.html script

var eventTeamsRender = function(){
  $.getJSON('../data/teams.json', function (teamsData){
    console.log(teamsData);

    teamsData.teams.map(function (teamsData){
      var stairsGoal = numeral(teamsData.stairs_goal).format('(0,0)');
      var donationGoal = numeral(teamsData.donation_goal).format('($0,0)');
      var donationPledges = numeral(teamsData.pledge_total).format('($0,0)');
      var content = '<tr><td><img src="' + teamsData.image + '" /></td><td><a href="%team-page-uri%">'
      + teamsData.name + '</a></td><td><a href="%climber-page-uri%">' + teamsData.owner.first_name + ' ' + teamsData.owner.last_name
      +'</a><br /><a href="%climber-page-uri%">' + teamsData.member.first_name + ' ' + teamsData.member.last_name
      +'</a></td><td>' + teamsData.stairs_goal + '</td><td>' + teamsData.donation_goal + '</td><td>'
      + teamsData.pledge_total + '</td><td><button id="donate-inline" class="btn btn-primary">Donate</button></td><td><button id="join-team-inline" class="btn btn-default">Join</button></td></tr>';

      $('#teams-table').append(content);
    });


  });
};

var eventDetailRender = function(){
  $.getJSON('../data/event.json', function (eventData){
    console.log(eventData);

      var image = '<img src="' + eventData.image + '" />';
      $('#event-image').append(image);
      $('#event-name').html(eventData.name);
      var charity = '<a href="' + eventData.charity.sitelink + '" target="_blank">'+eventData.charity.name+'</a>';
      $('#charity-name').append(charity);
      var donationThermometer = '<div class="thermo-fill" style="'+eventData.donation_data.percent+'%"></div>';
      $('#donation-thermometer').append(donationThermometer);
      var pledged = numeral(eventData.donation_data.sum_donations).format('($0,0)');
      $('#donation-pledged').html(pledged);
      var donations = numeral(eventData.donation_data.sum_donation_goal).format('($0,0)');
      $('#donation-goal').html(donations);
      var stairsOnSite = numeral(eventData.location.stairs_onsite).format('(0,0)');
      $('#event-stairs').html(stairsOnSite);
      var eventDate = moment(eventData.event_date).format('MMMM Do, YYYY');
      $('#event-date').html(eventDate);
      var start = moment(eventData.event_start_time).format('h:mm A');
      var end = moment(eventData.event_end_time).format('h:mm A');
      $('#event-start-time').html(start);
      $('#event-end-time').html(end);
      var rawAddress = eventData.location.address + ' ' + eventData.location.city + ' ' + eventData.location.state;
      var queryAddress = rawAddress.split(' ').join('+');
      var address = '<a href="http://maps.google.com/?q=' + queryAddress
      + '" target="_blank"><p>' + eventData.location.address + '<br />' + eventData.location.city + ', ' + eventData.location.state + '</p></a>';
      $('#event-full-address').html(address);
      // format addtocalendar widget
      $('#cal-start-datetime').html(eventData.event_start_time);
      $('#cal-end-datetime').html(eventData.event_end_time);
      $('#cal-event-name').html(eventData.name);
      $('#cal-timezone').html(eventData.timezone);
      var streetAddress = eventData.location.address + ' ' + eventData.location.city + ', ' + eventData.location.state;
      $('#cal-address').html(streetAddress);
  });
};


$(document).ready(function(){
  eventDetailRender();
  eventTeamsRender();
});
