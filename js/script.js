$(function () {

  generateProjectsPage();

  function generateProjectsPage(){
    var projectsData;
    var rstatus;
    var list = $('.all-projects .projects-list');
    var theTemplateScript = $("#projects-template").html();
    //Compile the template​
    var theTemplate = Handlebars.compile(theTemplateScript);

    $.get( "http://localhost:3000/projects", function(data){

      projectsData = data;
        list.append (theTemplate(data));
        });

    var a = list.find('.project-card');
    list.find('.project-card').on('click', function (e) {
    			e.preventDefault();
    			var productIndex = $(this).data('index');
    			window.location.hash = 'project/' + productIndex;
    		})
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

});
