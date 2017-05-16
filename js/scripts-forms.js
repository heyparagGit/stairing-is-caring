//Stairing is Caring
//Scripts for all form pages

var newCompanyHandler = function() {
        $("#new-company").click(function() {
          $("#new-company-group, #existing-company-group").toggle();
        });
        $("#x-new-company").click(function() {
          $("#new-company-group, #existing-company-group").toggle();
        });
    };

    $("#company").autocomplete({
        source: ["%Company R%", "%Company S%", "%Company T%", "%Company S%", "%Company E%", "Expedia", "Blueprint Consulting Services"]
    });

    // begin Date Time script
      $(function () {
        $('#event-date-picker').datetimepicker({
          format: 'D/M/YYYY'
        });
      });
      $(function () {
        $('#event-start-time-picker').datetimepicker({
          format: 'h A'
        });
      });
      $(function () {
        $('#event-end-time-picker').datetimepicker({
          format: 'h A'
        });
      });
    //end Date Time script

$(document).ready(function(){
  newCompanyHandler();
});
