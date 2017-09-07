Template.SubredditSingle.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var subreddit = FlowRouter.getParam('subreddit');
        self.subscribe('singleSubreddit', subreddit);
    });
});

Template.SubredditSingle.helpers({
    subreddit: ()=> {
        var subreddit = FlowRouter.getParam('subreddit');
        console.log(subreddit);
        return Subreddits.findOne({name: subreddit});
    }
})