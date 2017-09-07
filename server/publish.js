Meteor.publish('subreddits', function(){
    return Subreddits.find({'name': {$ne: 'all'}}, {sort: {count: -1}, limit: 10});
});

Meteor.publish('singleSubreddit', function(subreddit) {
    return Subreddits.find({name: subreddit});
})