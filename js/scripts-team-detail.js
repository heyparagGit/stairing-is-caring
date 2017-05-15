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

    $('#stiars-thermometer').html('<div class="thermo-fill" style="width:'+teamData.stairs_percent+'%;"></div>')
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
      var content = '<div class="activity-entry"><div class="col-sm-7"><div class="recent-activity"><img class="avatar-small pull-left" src="'+commentsData.commenter.image+'" /><a class="h3" href="#">'+commentsData.commenter.name+'</a><h6>'+ commentDatetime +'</h6><p>'+commentsData.comment+'</p></div></div><div class="col-sm-2"><h3 class="pledge-val">'+ pledge +'</h3></div><div class="col-sm-2"><h3 class="stairs-guess-val">'+ stairs +'</h3></div></div>';

      $('#activity-stream').append(content);

    });
  });
};

$(document).ready(function(){
  teamRender();
  eventRender();
  commentsRender();
});
