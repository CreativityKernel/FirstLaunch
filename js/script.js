$(function () {

  var currentProject;
  var currentProjectId;

  var selectedCheatID, selectedCheatText, currentPrompt;

  var currentLikes = [];
  var currentWishes = {};

    render(decodeURI(window.location.hash));

  $(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

  function render(url) {
    $('.main-content .page').hide(); // Hide whatever page is currently shown.
  		var temp = url.split('/')[0];// Get the keyword from the url.


  		var	map = {
  			'': function() {
  				renderAllProjectsPage();
  			},

  			'#project': function() {
  				var index = url.split('#project/')[1].trim();
  				//renderSingleProjectPage(index);
          renderProjectValuesPage();
  			},

        '#cheat': function() {
  				//var index = url.split('#cheat/')[1].trim();
  				renderCheatPage(null);
  			},
  		};

  		// Execute the needed function depending on the url keyword (stored in temp).
  		if(map[temp]){
  			map[temp]();
  		}
  		// If the keyword isn't listed in the above - render the error page.
  		else {
  			//renderErrorPage();
  		}
  	}

    function renderAllProjectsPage(){
      var page = $('.all-projects');
      var list = $('.all-projects .projects-list');
      var theTemplateScript = $("#projects-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);

      $.get( "http://localhost:3000/projects", true, function(data){
        list.append (theTemplate(data));
        var a = list.find('.project-card');
        list.find('.project-card').on('click', function (e) {
              e.preventDefault();
              var projectID = $(this).data('index');
              currentProjectId = projectID;
              window.location.hash = 'project/' + projectID;
            })
          });
          page.show();
        }

    function renderSingleProjectPage(index){
      var page = $('.oppertunity-sysnthesis');
      var list = $('.oppertunity-sysnthesis .left');
      list.find('.postit-small').detach();
      var theTemplateScript = $("#oppertunities-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      $.get( "http://localhost:3000/projects/"+index, true, function(data){
        list.append (theTemplate(data.Likes));
          });
      page.show();
    }

    function renderProjectValuesPage(){
        var page = $('.values');
        $.get( "http://localhost:3000/projects/"+currentProjectId, true, function(data){
          $('#value-prompt').html("What do you like and wish about "+data.Title+ "?");
            });
        $('#value-prompt').html("ddsss");
        page.show();
    }

    function renderCheatPage(promptID){
      var page = $('.cheat');
      renderCheatCards();
      page.show();

    }

    function renderCheatCards(){
      selectedCheatText = "";
      selectedCheatID = null;
      $('#idea-card-text').val("");
      var list = $('.cheat .cheat-card-list');
      list.find('.cheat-card').detach();
      var theTemplateScript = $("#cheat-card-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      $.get( "http://localhost:3000/ideas/random/", true, function(data){
        list.append (theTemplate(data));
        list.find('.cheat-card').on('click', function (e) {
              e.preventDefault();
              selectedCheatID = $(this).data('index');
              selectedCheatText = $(this).data('text');
              $('#idea-card-text').val(selectedCheatText);
            })
          });
    }

    //create a new project
      $('#submit_project').click(function(){
        var project = {};
        project.Title = $('#projectTitle').val();
        project.Description = $('#exampleFormControlTextarea1').val();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/projects",
            data: project
          });
      });


      $('#cheat_refresher').click(function(){
          renderCheatCards();
      });

      $('#cheat_submit').click(function(){
          var newIdea={};
          newIdea.Prompt_id = "asda";
          newIdea.Parent = selectedCheatID;
          newIdea.Content = {};
          newIdea.Content.Title = $('#idea-card-text').val();

          $.ajax({
              type: "POST",
              url: "http://localhost:3000/ideas",
              data: newIdea
            });
      });


      $('#values-add').click(function(){
          currentLikes.push($('#values-postit-text').val())
          //currentWishes.push($('#values-postit-text').val())
          var htmlString = '<div class=\"postit-small\"><p class=\"postit-text-small\">'+$('#values-postit-text').val()+'</p></div>'
          $('#values-postit-container').append(htmlString);
          $('#values-postit-text').val("");
      });

      $('#values-done').click(function(){
          $.ajax({
              type: "PUT",
              url: "http://localhost:3000/projects/likes/currentProjectId",
              data: currentLikes
            });
      });



});




//value sysnthesis

//drag and drop oppertunity
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("target-id", ev.target.id);
}

function drop(ev) {
    var data = ev.dataTransfer.getData("target-id");
    ev.target.appendChild(document.getElementById(data));
    ev.preventDefault();
}
