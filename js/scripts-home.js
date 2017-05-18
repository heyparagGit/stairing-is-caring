//Stairing is Caring
// index.html script

//Event Handlers
var buttonHandlers = function(){
  $('#signUpBtn').click(function(){
    window.location = 'sign-up.html';
  });
  $('#pledge-btn').click(function(){
    window.location = 'pledge-form.html';
  });
  $('#join-btn').click(function(){
    window.location = 'event-list.html';
  });
  $('#create-event-btn').click(function(){
    window.location = 'request-event.html';
  });


};


//Render Functions

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
      var content =
      '<div class="recent-activity"><img class="avatar-small pull-left" src="'
      + recentComments.commenter.image
      + '" /> <a class="h3" href="/climber/' + recentComments.commenter.id + '">' + recentComments.commenter.name
      + '</a><h6>' + commentDatetime
      + '</h6><p>' + recentComments.comment
      + '</p><p>' + recentComments.pledge_amount + ', ' + recentComments.stairs_guess
      '</p></div>';

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
        '<div class="col-sm-3"><div class="event-card"><img src="'
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
      });

    homeTotalsData.totalCharities.map(function (totalCharities){
       var charities = numeral(totalCharities.count).format('(0,0)')
       $('#what-is-charity-count').html(charities);
     });

  })
};


$(document).ready(function(){
  homeTotalsFunc();
  eventCardFunc();
  recentCommentFunc();
  avgTeamDonationsFunc();
  climbingCompaniesFunc();
  topTeamsDonationsFunc();
  topTeamsStairsFunc();
  buttonHandlers();
});
