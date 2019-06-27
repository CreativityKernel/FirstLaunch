var mongoose = require("mongoose"),
  Prompt = mongoose.model("Prompts"),
  Project = mongoose.model("Projects");

exports.list_all_prompts = function(req, res) {
  console.log("rsds");
  Prompt.find({}, function(err, prompt) {
    console.log("rasasds");
    if (err) res.send(err);
    res.json(prompt);
  });
};

exports.create_a_prompt = function(req, res) {
  if (req.body._id != null) {
    Prompt.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      function(err, prompt) {
        if (err) res.send(err);
        res.json(prompt);
      }
    );
  } else {
    var new_prompt = new Prompt(req.body);
    new_prompt.save(function(err, prompt) {
      console.log("prid" + prompt._id);
      console.log("prid" + req.body.project);
      if (err) res.send(err);
      Project.findOneAndUpdate(
        { _id: req.body.project },
        { $push: { prompts: prompt._id } },
        { new: true },
        function(err, project) {
          console.log(err);
          console.log("pro" + project);
        }
      );
      res.json(prompt);
    });
  }
};

exports.read_a_prompt = function(req, res) {
  console.log(req.params.promptId);
  Prompt.findById(req.params.promptId, function(err, prompt) {
    if (err) res.send(err);
    res.json(prompt);
  }).populate("ideas");
};

exports.update_a_prompt = function(req, res) {
  Prompt.findOneAndUpdate(
    { _id: req.params.promptId },
    req.body,
    { new: true },
    function(err, prompt) {
      console.log(prompt);
      if (err) res.send(err);
      res.json(prompt);
    }
  );
};

exports.delete_a_prompt = function(req, res) {
  Prompt.remove(
    {
      _id: req.params.promptId
    },
    function(err, prompt) {
      if (err) res.send(err);
      res.json({ message: "prompt successfully deleted" });
    }
  );
};

exports.add_vote_idea = function(req, res) {
  Prompt.findById(req.params.promptId, function(err, prompt) {
    if (err) {
      res.send(err);
    }

    var ideaId = req.params.ideaId;
    if (!prompt.votes) {
      prompt.votes = {};
    }
    if (!prompt.votes[ideaId]) {
      prompt.votes.set(ideaId, []);
    }

    var ideaVotes = prompt.votes.get(ideaId);
    var index = ideaVotes.indexOf(req.body.user_id);
    var containsVote = index > 0;

    if (containsVote) {
      ideaVotes.splice(index, 1, req.body);
    } else {
      ideaVotes.push(req.body);
    }
    prompt.votes.set(ideaId, ideaVotes);

    prompt.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(prompt);
    });
  }).populate("ideas");
};

exports.delete_vote_idea = function(req, res) {
  Prompt.findById(req.params.promptId, function(err, prompt) {
    if (err) {
      res.send(err);
    }
    var ideaId = req.params.ideaId;
    if (!prompt.votes) {
      prompt.votes = {};
    }
    if (!prompt.votes[ideaId]) {
      prompt.votes.set(ideaId, []);
    }

    var ideaVotes = prompt.votes.get(ideaId);
    var index = ideaVotes.indexOf(req.body.user_id);
    var containsVote = index > 0;

    if (containsVote) {
      ideaVotes.splice(index, 1);
    }
    prompt.votes.set(ideaId, ideaVotes);
    console.log(ideaVotes);

    prompt.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(prompt);
    });
  }).populate("ideas");
};
