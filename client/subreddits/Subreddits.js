

Template.Subreddits.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('subreddits');
    });
});


Template.Subreddits.helpers({
    subreddits: ()=> {
        return Subreddits.find({},{sort: {count: -1}, fields: {name: 1, count: 1}});
    }
});