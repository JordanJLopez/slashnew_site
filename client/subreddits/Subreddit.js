Template.Subreddit.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('subreddits');
    });
});

Template.Subreddit.helpers({
    subreddit: ()=> {
        return Subreddits.find({}, {sort:{count:-1}, limit: 5});
    }
})