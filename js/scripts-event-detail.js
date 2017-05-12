//Stairing is Caring
// event-detail.html script

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
      var pledged = numeral(eventData.donation_data.sum_donations).format('($0,0)')
      $('#donation-pledged').html(pledged);
      var donations = numeral(eventData.donation_data.sum_donation_goal).format('($0,0)')
      $('#donation-goal').html(donations);
      var stairsOnSite = numeral(eventData.location.stairs_onsite).format('(0,0)')
      $('#event-stairs').html(stairsOnSite);
      var eventDate = moment(eventData.event_date).format('MMMM Do YYYY');
      $('#event-date').html(eventDate);
      var start = moment(eventData.event_start_time).format('h:m A');
      var end = moment(eventData.event_end_time).format('h:m A');
      $('#event-start-time').html(start);
      $('#event-end-time').html(end);
      var rawAddress = eventData.location.address + ' ' + eventData.location.city + ' ' + eventData.location.state;
      var queryAddress = rawAddress.split(' ').join('+');
      var address = '<a href="http://maps.google.com/?q=' + queryAddress
      + '" target="_blank"><p>' + eventData.location.address + '<br />' + eventData.location.city + ', ' + eventData.location.state + '</p></a>';
      $('#event-full-address').html(address);
  });
};


$(document).ready(function(){
  eventDetailRender();
});
