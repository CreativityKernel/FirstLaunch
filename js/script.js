$(function () {

  var current_project;
  var current_project_id;

  var sample = [
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [
            "\"I wish me\"",
            "\"I wish you too\"",
            "\"I wish me\"",
            "\"I wish you too\""
        ],
        "Likes": [
            "\"I like me777\"",
            "\"I like you too\"",
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "\"I like me77bbvvbvdfd7\"",
            "\"I like me77bbvvbvdfd7\"",
            "\"I like you todsdsdfsdfo\""
        ],
        "_id": "5b563b1d476d7fa2b7ed2efc",
        "Availablr_Modules": [],
        "Title": "\"my test Project\"",
        "Created_date": "2018-07-23T20:31:25.260Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b567367afaab6049b1be14e",
        "Title": "ssdsdsds",
        "Description": "sdfsdfsdfsdfsdf",
        "Created_date": "2018-07-24T00:31:35.478Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b567440afaab6049b1be14f",
        "Title": "fsdfsdf",
        "Description": "sd23e2332",
        "Created_date": "2018-07-24T00:35:12.058Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b56748aafaab6049b1be150",
        "Title": "My New Project",
        "Description": "Here is my new project",
        "Created_date": "2018-07-24T00:36:26.376Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b568259e00ddd05522df0c9",
        "Title": "sdfsdfsdf",
        "Description": "sfsfsdfsqweqweq2323",
        "Created_date": "2018-07-24T01:35:21.386Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579b71e00ddd05522df0ca",
        "Title": "reretertet",
        "Description": "ertettertet2443443",
        "Created_date": "2018-07-24T21:34:41.722Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579cfb611c2d182a618c1d",
        "Title": "ssdsdsds",
        "Description": "sdfsdfsdfsdfsdf",
        "Created_date": "2018-07-24T21:41:15.906Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579e6be26b441881a6b679",
        "Title": "dffff",
        "Description": "sdfsfsfsfsdf",
        "Created_date": "2018-07-24T21:47:23.998Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579e9ee26b441881a6b67a",
        "Title": "3r3rerer",
        "Description": "443rrwerw",
        "Created_date": "2018-07-24T21:48:14.479Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579ee9e26b441881a6b67b",
        "Title": "fefef",
        "Description": "wwwfff",
        "Created_date": "2018-07-24T21:49:29.258Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579f39e26b441881a6b67c",
        "Title": "rfeferfef",
        "Description": "efefefef",
        "Created_date": "2018-07-24T21:50:49.729Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579f63e26b441881a6b67d",
        "Title": "dsfdsdsf",
        "Description": "sdfdsfd",
        "Created_date": "2018-07-24T21:51:31.979Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579f8ce26b441881a6b67e",
        "Title": "dssfsfsf",
        "Description": "sdfsdfsfsfsfsdfsdf",
        "Created_date": "2018-07-24T21:52:12.375Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b579fb4e26b441881a6b67f",
        "Title": "dfssfsdf",
        "Description": "sdfsfsfsfs",
        "Created_date": "2018-07-24T21:52:52.088Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b57a0a0e26b441881a6b680",
        "Title": "fsfsfsdfsf",
        "Description": "sdfsfsdfsfsdfsdfsdf",
        "Created_date": "2018-07-24T21:56:48.992Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b57a19fcedbd80280e4098a",
        "Title": "asdasdsadad",
        "Description": "asdadasdadasdadsad",
        "Created_date": "2018-07-24T22:01:03.874Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b57a216cedbd80280e4098b",
        "Title": "sfsdfsdfsdfdsf",
        "Description": "sfsfsdfsdfsdfsdfsdf",
        "Created_date": "2018-07-24T22:03:02.108Z",
        "__v": 0
    },
    {
        "Participants": [],
        "Available_Modules": [],
        "Unlocked_Modules": [],
        "Prompts": [],
        "Wishes": [],
        "Likes": [],
        "_id": "5b57a31eb87d7d03357e2edf",
        "Title": "sfmsdnfsdnm,sdnfs",
        "Description": "sfsfsfsfsfsfsdfsdf",
        "Created_date": "2018-07-24T22:07:26.172Z",
        "__v": 0
    }
];

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
  				renderSingleProjectPage(index);
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
        list.find('.project-card').on('click', function (e) {
              e.preventDefault();
              var projectID = $(this).data('index');
              current_project_id = projectID;
              window.location.hash = 'project/' + projectID;
            })
          });
      page.show();
    }

    function renderCheatPage(promptID){

      var page = $('.cheat');
      renderCheatCards();
      page.show();

    }


    function renderCheatCards(){
      $('#idea-card-text').val("");
      var list = $('.cheat .cheat-card-list');
      list.find('.cheat-card').detach();
      var theTemplateScript = $("#cheat-card-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      $.get( "http://localhost:3000/ideas/random/", true, function(data){
        list.append (theTemplate(data));
        list.find('.cheat-card').on('click', function (e) {
              e.preventDefault();
              var ideaID = $(this).data('index');
              var ideaText = $(this).data('text');
              $('#idea-card-text').val(ideaText);
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
