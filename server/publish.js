Meteor.publish('topSubreddits', function(){

    return Subreddits.find({'name': {$ne: 'all'}}, {sort: {date: -1, count: -1}, limit:10});
})

Meteor.publish('subredditsAll', function() {
    return Subreddits.find({'name': 'all'}, {sort: {date: -1, count: -1}});
})

Meteor.publish('liveSubreddit', function(subreddit, date_str) {

    return Subreddits.find({'name': subreddit}, {sort: {time: -1}});
})

Meteor.publish('subreddit', function(subreddit) {
    return Subreddits.find({'name': subreddit}, {sort: {time: 1}});
})
