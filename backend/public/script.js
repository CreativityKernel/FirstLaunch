$(function () {

  var host="18.222.151.193";
  var currentProject;
  var currentProjectId;

  var selectedCheatID, selectedCheatText, currentPromptID;

  var currentLikes = {"Likes":[]};
  var currentWishes = {};

  var webAuth = new auth0.WebAuth({
      domain: 'creativitykernel.auth0.com',
      clientID: 'toJ3F9O6yh8LqUeY5HCTpyq5sp4GkodK',
      responseType: 'token id_token',
      scope: 'openid profile',
      redirectUri: window.location.href
    });


    handleAuthButtons();
    $('.main-content .page').hide(); // Hide whatever page is currently shown.

 render(decodeURI(window.location.hash));


  $(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

  function render(url) {
    $('.main-content .page').hide(); // Hide whatever page is currently shown.

  		var temp = url.split('/')[0];// Get the keyword from the url.
      if(temp.startsWith("#access_token")){
        temp = '#access_token';
      }

  		var	map = {
  			'': function() {
  				renderAllProjectsPage();
  			},

  			'#project': function() {
  				var index = url.split('#project/')[1].trim();
  				renderSingleProjectPage(index);
          //renderProjectValuesPage();
  			},

        '#values_join': function() {
  				//var index = url.split('#cheat/')[1].trim();
  				renderProjectValuesPage();
  			},

        '#oppertunities_join': function() {
  				//var index = url.split('#cheat/')[1].trim();
  				renderOpertunitySynthesisPage();
  			},

        '#cheat_join': function() {
  				//var index = url.split('#cheat/')[1].trim();
  				renderCheatPage();
  			},

        '#cheat': function() {
  				//var index = url.split('#cheat/')[1].trim();
  				renderCheatPage(null);
  			},

        '#access_token': function() {
  				handleAuthentication();
  			}
  		};

  		// Execute the needed function depending on the url keyword (stored in temp).
  		if(map[temp]){
  			map[temp]();
  		}
  		// If the keyword isn't listed in the above - render the error page.
  		else {
        renderAllProjectsPage();
  			//renderErrorPage();
  		}
  	}

    function renderAllProjectsPage(){
      renderBreadCrumbsProject("");
      renderBreadCrumbsModule("");
      var page = $('.all-projects');
      var list = $('.all-projects .projects-list');
      var theTemplateScript = $("#projects-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);

      $.get( "http://"+host+":3000/projects", true, function(data){
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
      var page = $('.single-project-page');
      $.get( "http://"+host+":3000/projects/"+index, true, function(data){
          renderBreadCrumbsProject(data.Title);
          $("#active_participants").text(data.Participants.length + " people active");
          $("#project_title").text(data.Title);
          $("#project_description").text(data.Description);
          $("#project_date").text("Started on - "+data.Created_date);
          $("#num_likewish").text(data.Likes.length + data.Wishes.length);
          $("#num_opportunity").text(data.Prompts.length);
          var count = 0;

          data.Prompts.forEach(function(item,index){
            count += item.Ideas.length;
          });
          $("#num_idea").text(count);

          var list = $('.single-project-page .prompt-list');
          list.find('.prompt-card').detach();
          var theTemplateScript = $("#prompt-card-template").html();
          var theTemplate = Handlebars.compile(theTemplateScript);
          list.append (theTemplate(data.Prompts));
          list.find('.prompt-card').on('click', function (e) {
                e.preventDefault();
                currentPromptID = $(this).data('prompt');
                window.location.hash = "cheat_join/"+currentPromptID;

            });
          });
          page.show();
    }

    function renderOpertunitySynthesisPage(){
      renderBreadCrumbsModule(" > Likes and Wishes");
      var page = $('.oppertunity-sysnthesis');
      var list = $('.oppertunity-sysnthesis .left');
      list.find('.postit-small').detach();
      var theTemplateScript = $("#oppertunities-template").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      $.get( "http://"+host+":3000/projects/"+currentProjectId, true, function(data){
        list.append (theTemplate(data.Likes));
          });
      page.show();
    }

    function renderProjectValuesPage(){
      renderBreadCrumbsModule(" > oppertunities")
        var page = $('.values');
        $.get( "http://"+host+":3000/projects/"+currentProjectId, true, function(data){
          $('#value-prompt').html("What do you like and wish about "+data.Title+ "?");
            });
        $('#value-prompt').html("ddsss");
        page.show();
    }

    function renderCheatPage(promptID){
      renderBreadCrumbsModule(" > Cheatstorming");
      var page = $('.cheat');
      $.get( "http://"+host+":3000/prompts/"+currentPromptID, true, function(data){
        $('#cheat-prompt').html("How might we "+data.Text+" ?");
          });
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
      $.get( "http://"+host+":3000/ideas/random/", true, function(data){
        list.append (theTemplate(data));
        list.find('.cheat-card').on('click', function (e) {
              e.preventDefault();
              selectedCheatID = $(this).data('index');
              selectedCheatText = $(this).data('text');
              $('#idea-card-text').val(selectedCheatText);
            })
          });
    }

    function renderBreadCrumbsProject(projectName){
      $("#bc-project").html(projectName);
    }

    function renderBreadCrumbsModule(moduleName){
      $("#bc-module").html(moduleName);
    }

    //create a new project
      $('#submit_project').click(function(){
        var project = {};
        project.Title = $('#projectTitle').val();
        project.Description = $('#exampleFormControlTextarea1').val();
        $.ajax({
            type: "POST",
            url: "http://"+host+":3000/projects",
            data: project
          });
      });

      $('#all-projects-link').click(function(){
          window.location.hash = '';
      });

      $("#bc-project").click(function(){
          window.location.hash = "project/"+currentProjectId;
          preventDefault();
      });




      $('#cheat_refresher').click(function(){
          renderCheatCards();
      });

      $('#cheat_submit').click(function(){
          var newIdea={};
          newIdea.Prompt_id = currentPromptID;
          newIdea.Parent = selectedCheatID;
          newIdea.Content = {};
          newIdea.Content.Title = $('#idea-card-text').val();

          $.ajax({
              type: "POST",
              url: "http://"+host+":3000/ideas",
              data: newIdea
            });
            $('#idea-card-text').val("");
      });


      $('#values-add').click(function(){
          currentLikes.Likes.push($('#values-postit-text').val())
          //currentWishes.push($('#values-postit-text').val())
          var htmlString = '<div class=\"postit-small\"><p class=\"postit-text-small\">'+$('#values-postit-text').val()+'</p></div>'
          $('#values-postit-container').append(htmlString);
          $('#values-postit-text').val("");
      });

      $('#values-done').click(function(){
          $.ajax({
              type: "POST",
              url: "http://"+host+":3000/projects/likes/"+currentProjectId,
              data: currentLikes
            });

            window.location.hash = "project/" +currentProjectId;
      });

      $('#valuesjoin').click(function(){
        window.location.hash = "values_join";
      });

      $('#opjoin').click(function(){
        window.location.hash = "oppertunities_join";
      });

      $('#cheatjoin').click(function(){
        window.location.hash = "cheat_join";
      });

      $('#op-done').click(function(){
        synthesize();
        window.location.hash = "project/"+currentProjectId;
      });

      function synthesize(){
        savePrompts($('#op-one .postit-text').val());
        savePrompts($('#op-two .postit-text').val());
        savePrompts($('#op-three .postit-text').val());
        savePrompts($('#op-four .postit-text').val());
      }

      function savePrompts(promptText){
        if(typeof promptText != 'undefined' && promptText.length > 0){

          var prompt = {};
          prompt.Text = promptText;
          prompt.Project = currentProjectId;

        $.ajax({
            type: "POST",
            url: "http://"+host+":3000/prompts/",
            data: prompt,
            async:false
          });
        }
      }

      $('#sign-in-button').click(function(e){
        e.preventDefault();
        webAuth.authorize();
      });

      $('#sign-out-button').click(function(e){
        e.preventDefault();
        logout();
      });

      function handleAuthentication() {
          webAuth.parseHash(function(err, authResult) {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                setSession(authResult);
                handleAuthButtons();
              } else if (err) {

              console.log(err);
                alert('Error: ' + err.error + '. Check the console for further details.'
              );
            }
    });
  }

  function setSession(authResult) {
    // Set the time that the Access Token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    webAuth.logout({
    returnTo: 'http://"+host+":3000/',
    client_id: 'toJ3F9O6yh8LqUeY5HCTpyq5sp4GkodK'
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    handleAuthButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

function handleAuthButtons(){
  if(isAuthenticated()){
    $('#sign-in-button').hide();
    $('#sign-out-button').show();
    getProfile();
    $('#avatar').show();
  }else{
    $('#sign-in-button').show();
    $('#sign-out-button').hide();
      $('#avatar').hide();
  }
}

var userProfile;
function getProfile() {
  if (!userProfile) {
    var accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.log('Access Token must exist to fetch profile');
    }

    webAuth.client.userInfo(accessToken, function(err, profile) {
      if (profile) {
        userProfile = profile;
        displayProfile(userProfile);
      }
    });
  } else {
    displayProfile(userProfile);
  }
}

function displayProfile(userProfile) {

  // display the profile
  $('#avatar_nickname').html(userProfile.nickname);
  $('#avatar img').attr("src",userProfile.picture);
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
    ev.target.prepend(document.getElementById(data));
    ev.target.classList.remove("drag-enter");
    ev.preventDefault();
}

function dragEnter(ev){
  ev.target.classList.add("drag-enter");
}

function dragLeave(ev){
  ev.target.classList.remove("drag-enter");
}
