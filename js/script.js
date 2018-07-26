$(function () {

  var current_project;
  var current_project_id;

    render(decodeURI(window.location.hash));

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
  				renderSingleProjectPage(index);
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
      //Compile the template​
      var theTemplate = Handlebars.compile(theTemplateScript);

      $.get( "http://localhost:3000/projects", true, function(data){
        list.append (theTemplate(data));
        var a = list.find('.project-card');
        list.find('.project-card').on('click', function (e) {
              e.preventDefault();
              var projectID = $(this).data('index');
              current_project_id = projectID;
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
