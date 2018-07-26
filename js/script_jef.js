function renderIndividualProjectPage(current_project_id){

    // test purpose
    var path_temp = "https://api.myjson.com/bins/wfudm";
    
    // real API command
    var path = "" + "/" + current_project_id;
    
    $.getJSON(path_temp, function (json) {

        var num = json[1].Participants.length;
        $("#active_participants").text(num + " people active");
        
        
        var title = json[1].Title;
        $("#project_title").text(title);    
    
        var description = json[1].Description;
        $("#project_description").text(description); 
    
        var date = json[1].Created_date;
        $("#project_date").text(date); 
        
    });
    
}
