//Stairing is Caring
// index.html script

//Nav Button Event Handlers
var buttonHandlers = function(){
  $('#signUpBtn').click(function(){
    window.location = 'sign-up.html';
  });
  $('#pledgeBtn').click(function(){
    window.location = 'pledge-form.html';
  });
  $('#joinBtn').click(function(){
    window.location = 'event-list.html';
  });
  $('#createEventBtn').click(function(){
    window.location = 'request-event.html';
  });
  $('#createTeamBtn').click(function(){
    window.location = 'create-team.html';
  });
  $('#donationConfirm').click(function(){
    window.location = 'index.html';
  });
};

//Form Event Handlers
var formHandlers = function(){

  var validateForm = function(){
    $.validate({
      form: '#create-team-form, #pledge-form, #sign-in-form, #event-request-form, #sign-up-form',
      modules: 'html5, date, security'
    });
  };

  $('#sign-in-email, #sign-in-password').focusout(function(){
    validateForm();
  });

  $('#submitCommentBtn').click(function(){
    $('#pledge-form').submit(function(event){
      alert('Handler for #pledge-form .submit() called.');
      validateForm();
      $.getJSON('data/event.json', function (eventData){
        window.location = eventData.charity.donation_url;
      });
      event.preventDefault();
    });
  });

  $('#submitTeamBtn').click(function(){
    $('#create-team-form').submit(function(event){
      alert('Handler for #create-team-form .submit() called.');
      validateForm();
      event.preventDefault();
    });
  });

  $('#signInFormBtn').click(function(){
    $('#sign-in-form').submit(function(event){
      validateForm();
      alert('Handler for #sign-in-form .submit() called.');
      event.preventDefault();
    });
  //SUCCESS  window.location = 'index.html';
  });

  $('#submitClimberBtn').click(function(){
    $('#sign-up-form').submit(function(event){
      validateForm();
      //alert('Handler for #sign-up-form .submit() called.');

      event.preventDefault();
    });
  });

  $('#sumbitEventRequest').click(function(){
    $('#event-request-form').submit(function(event){
      alert('Handler for #event-request-form .submit() called.');
      validateForm();
      event.preventDefault();
    });
  });
};

//Render Functions
// index.html
var topTeamsStairsFunc = function(){
  $.getJSON('data/top-team-list.json', function (topTeamsData){
    console.log(topTeamsData);
    topTeamsData.topTeams.map(function (topTeams){
      var stairs = numeral(topTeams.totalStairs).format('(0,0)')
      var content = '<li><img class="avatar-small pull-left" src="'
      + topTeams.image
      + '" /><a href="team/'
      + topTeams.id
      + '">'
      + topTeams.name
      + '</a><h3 class="text-muted">'
      + stairs
      + '</h3></li>';

      $('#top-teams-stairs').append(content);
    });
  });
};

var topTeamsDonationsFunc = function(){
  $.getJSON('../data/top-team-list.json', function (topTeamsData){
    console.log(topTeamsData);
    topTeamsData.topTeams.map(function (topTeams){
      var dollars = numeral(topTeams.totalDonations).format('($0,0)')
      var content = '<li><img class="avatar-small pull-left" src="'
      + topTeams.image
      + '" /><a href="team/'
      + topTeams.id
      + '">'
      + topTeams.name
      + '</a><h3 class="text-muted">'
      + dollars
      + '</h3></li>';

      $('#top-teams-donations').append(content);
    });
  });
};

var climbingCompaniesFunc = function(){
  $.getJSON('../data/top-company-list.json', function (climbingCompaniesData){
    console.log(climbingCompaniesData);
    climbingCompaniesData.topCompanies.map(function (topCompanies){
      var stairs = numeral(topCompanies.totalStairs).format('(0,0)')
      var content = '<li><img class="avatar-small pull-left" src="'
      + topCompanies.image
      + '" /><span>'
      + topCompanies.name
      + '</span><h3 class="text-muted">'
      + stairs
      + '</h3></li>';

      $('#company-stairs').append(content);
    });
  });
};

var avgTeamDonationsFunc = function(){
  $.getJSON('../data/top-company-list.json', function (avgTeamDonationsData){
    console.log(avgTeamDonationsData);
    avgTeamDonationsData.topCompanies.map(function (topCompanies){
      var dollars = numeral(topCompanies.avgTeamDonations).format('($0,0)')
      var content = '<li><p>'
      + topCompanies.name
      + '</p><div class="thermometer"><div class="thermo-border"></div><div class="thermo-fill" style="width:'
      + topCompanies.donationsAsPercentOfLeader
      + '%;"></div><div class="thermo-bg"></div></div><h3 class="thermo-val text-muted">'
      + dollars
      +'</h3></li>';

      $('#avg-team-donations').append(content);
    });
  });
};

var recentCommentFunc = function(){
  $.getJSON('../data/recent-comments-data.json', function (recentCommentData){
    console.log(recentCommentData);

    recentCommentData.recentComments.map(function (recentComments){
      var commentDatetime = moment(recentComments.created_at).format('h:m A MMM d YYYY');
      var pledge = numeral(recentComments.pledge_amount).format('($0,0)');
      var stairs = numeral(recentComments.stairs_guess).format('(0,0)');

      var content =
      '<div class="recent-activity"><img class="avatar-small pull-left" src="' + recentComments.commenter.image + '" /> <p>' + recentComments.commenter.name + '</p><h6>' + commentDatetime + '</h6><p>' + recentComments.comment + '</p><div class="row"><div class="col-xs-4 col-xs-offset-2"><label>Pledge</label><h3>' + pledge + '</h3></div><div class="col-xs-6"><label>Stairs Guess</label><h3>' + stairs + '</h3></div></div></div>';

      $('#activity-stream').append(content);

    });

  });
};

var eventCardFunc = function(){
  $.getJSON('../data/events.json', function (eventsData){
    console.log(eventsData);

    eventsData.events.map(function (events){
      var eventDate = moment(events.event_date).format('MMM D, YYYY');
      var sumDonations = numeral(events.donation_data.sum_donations).format('($,0)');
      var content =
        '<div class="col-sm-3 col-xs-6"><div class="event-card"><img src="'
        + events.image + '" /><div class="event-card-content"><a class="h3" href="/event/' + events.id + '">'
         + events.name + '</a><p>'
         + eventDate + '<br />'
         + events.location.city + ', ' + events.location.state + '</p><h4 class="text-muted uppercase">Benefiting</h4><h3>'
         + events.charity.name + '</h3><div class="thermometer"><div class="thermo-border"></div><div class="thermo-fill" style="width:'
         + events.donation_data.percent + '%;"></div><div class="thermo-bg"></div></div><h3 class="thermo-val text-muted">'
         + sumDonations
         + '</h3></div></div></div>';

      $('#event-card-list').append(content);
    });
  });
};

var homeTotalsFunc = function(){
  $.getJSON('../data/home-totals.json', function (homeTotalsData){
    console.log(homeTotalsData);

    homeTotalsData.homeTotals.map(function (homeTotals){
      var content = '<li><h3>'
      + homeTotals.count + ' ' + homeTotals.object
      + '</h3></li><li><h3>';

      $('#home-totals').append(content);
    });

    homeTotalsData.totalDollars.map(function (totalDollars){
       var dollars = numeral(totalDollars.count).format('($0,0)')
       $('#total-dollars').html('Total Raised: ' + dollars);
       $('#donation-total').html(dollars);
     });

     homeTotalsData.totalStairs.map(function (totalStairs){
        var stairs = numeral(totalStairs.count).format('(0,0)')
        $('#what-is-stairs-total').html(stairs);
        $('#what-is-stairs-total-m').html(stairs);
      });

    homeTotalsData.totalCharities.map(function (totalCharities){
       var charities = numeral(totalCharities.count).format('(0,0)')
       $('#what-is-charity-count').html(charities);
     });

  })
};


// event-detail.html and event-list.html scripts

var eventTeamsRender = function(){
  $.getJSON('../data/teams.json', function (teamsData){
    console.log(teamsData);

    teamsData.teams.map(function (teamsData){
      var stairsGoal = numeral(teamsData.stairs_goal).format('(0,0)');
      var donationGoal = numeral(teamsData.donation_goal).format('($0,0)');
      var donationPledges = numeral(teamsData.pledge_total).format('($0,0)');
      var content = '<tr><td><img src="' + teamsData.image + '" /></td><td><a href="/team/' + teamsData.id + '">'
      + teamsData.name + '</a></td><td><a href="/climber/'+ teamsData.owner.id +'">' + teamsData.owner.first_name + ' ' + teamsData.owner.last_name
      +'</a><br /><a href="/climber/' + teamsData.member.id + '">' + teamsData.member.first_name + ' ' + teamsData.member.last_name
      +'</a></td><td>' + teamsData.stairs_goal + '</td><td>' + teamsData.donation_goal + '</td><td>'
      + teamsData.pledge_total + '</td><td><button id="donate-inline" class="btn btn-primary">Donate</button></td><td><button id="join-team-inline" class="btn btn-default">Join</button></td></tr>';

      //To-do: Hide JOIN button for teams with Members
      //To-do: Do not render teamsData.member Name when empty

      $('#teams-table').append(content);
    });


  });
};

var eventDetailRender = function(){
  $.getJSON('data/event.json', function (eventData){
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
//Stairing is Caring
// team-detail.html script

var teamRender = function(){
  $.getJSON('../data/team.json', function (teamData){
    console.log(teamData);

    $('#team-image').html('<img src="' + teamData.image + '" />');
    $('#team-name').html(teamData.name);
    $('#team-motto').html(teamData.motto);
    var owner = '<a class="climber-name" href="%climber-page-uri">'+ teamData.owner.first_name + ' ' + teamData.owner.last_name +'</a><img src="'+teamData.owner.company_logo+'" /><p>'+ teamData.owner.company+'</p>';
    $('#team-owner').html(owner);
    var member = '<a class="climber-name" href="%climber-page-uri">'+ teamData.member.first_name + ' ' + teamData.member.last_name + '</a><img src="'+teamData.member.company_logo+'" /><p>'+ teamData.member.company+'</p>';
    $('#team-member').html(member);

    $('#donation-thermometer').html('<div class="thermo-fill" style="width:'+teamData.donation_percent+'%;"></div>')
    var pledged = numeral(teamData.pledge_total).format('($0,0)');
    $('#pledge-total').html(pledged);
    var goal = numeral(teamData.donation_goal).format('($0,0)');
    $('#donation-goal').html(goal);

    $('#stairs-thermometer').html('<div class="thermo-fill" style="width:'+teamData.stairs_percent+'%;"></div>')
    var climbed = numeral(teamData.stairs_climbed).format('(0,0)');
    $('#stairs-climbed').html(climbed);
    var stairsGoal = numeral(teamData.stairs_goal).format('(0,0)');
    $('#stairs-goal').html(stairsGoal);

  });
};

var eventRender = function(){
  $.getJSON('data/event.json', function (eventData){
    var eventStairsOnsite = numeral(eventData.location.stairs_onsite).format('(0,0)');
    $('#event-stairs').html(eventStairsOnsite);
    $('#event-name').html('<a href="%event-page-uri%">'+eventData.name+'</a>');
    var eventDate = moment(eventData.event_date).format('MMMM Do, YYYY');
    $('#event-date').html(eventDate);
  });
};

var commentsRender = function(){
  $.getJSON('data/recent-comments-data.json', function (commentsData){
    console.log(commentsData);

    commentsData.recentComments.map(function (commentsData){
      var commentDatetime = moment(commentsData.created_at).format('h:mm A MMMM D, YYYY');
      var pledge = numeral(commentsData.pledge_amount).format('($0,0)');
      var stairs = numeral(commentsData.stairs_guess).format('(0,0)');
      var content = '<div class="activity-entry"><div class="col-xs-7"><div class="recent-activity"><img class="avatar-small pull-left" src="'+commentsData.commenter.image+'" /><a class="h3" href="#">'+commentsData.commenter.name+'</a><h6>'+ commentDatetime +'</h6><p>'+commentsData.comment+'</p></div></div><div class="col-xs-2"><label>Pledge</label><h3 class="pledge-val">'+ pledge +'</h3></div><div class="col-xs-3"><label>Stairs Guess</label><h3 class="stairs-guess-val">'+ stairs +'</h3></div></div>';

      $('#activity-stream').append(content);

    });
  });
};


//Stairing is Caring
//Scripts for all form pages
var pledgeFormRender = function(){
  $.getJSON('data/team.json', function (teamData){
    console.log(teamData);
    $('#team-name').html(teamData.name);
  });
  $.getJSON('data/event.json', function (eventData){
    console.log(eventData);
    $('#donation-link').html('<a href="'+eventData.charity.donation_url+'" target="_blank">'+eventData.charity.name+'</a>');
  });
};


// Sign Up Form
var newCompanyHandler = function() {
    $("#new-company-anchor").click(function() {
      $('#company-label').html('New Company Name');
      $('#new-company-group, #new-company-anchor').toggle();
    });
    $('#x-new-company').click(function() {
      $('#company-label').html('Company Name');
      $('#new-company-group, #new-company-anchor').toggle();
    });
    $('#company-input').autocomplete({
        source: ["%Company R%", "%Company S%", "%Company T%", "%Company S%", "%Company E%", "Expedia", "Blueprint Consulting Services"]
    });
};

// Create Team
var newTeammateHandler = function() {
    $('#new-climber-anchor, #x-new-climber').click(function() {
      $('#new-teammate-form-group, #existing-climber-form-group').toggle();
    });
    $('#').click(function() {
      $('#new-teammate-form-group, #existing-climber-form-group').toggle();
    });
    $('#existing-climber-input').autocomplete({
        source: ["%Climber Name 1%", "%Climber Name 2%", "%Climber Name 3%", "%Climber Name 4%", "%Climber Name 5%"]
    });
};

// COMMON functions:
//   buttonHandlers(); -- all pages
//   formHandlers(); -- all forms

// INDEX functions:
//   homeTotalsFunc();
//   eventCardFunc();
//   recentCommentFunc();
//   avgTeamDonationsFunc();
//   climbingCompaniesFunc();
//   topTeamsDonationsFunc();
//   topTeamsStairsFunc();

// EVENT-DETAIL functions:
//   eventDetailRender();
//   eventTeamsRender();

// EVENT-LIST functions:
//   eventCardFunc();
//   eventTableRender();
//   homeTotalsFunc();

// CLIMBER-DETAIL functions:
//   climberRender();
//   eventHistoryRender();

// TEAM-DETAIL functions:
//   teamRender();
//   eventRender();
//   commentsRender();

// PLEDGE-FORM functions:
// pledgeFormRender();

// SIGN-UP
//   newCompanyHandler();
