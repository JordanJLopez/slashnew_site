FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/chart', {
    name: 'chart',
    action() {
        BlazeLayout.render('MainLayout', {main:'SubredditChart'});
    }
});

FlowRouter.route('/chart/:subreddit', {
    name: 'singleChart',
    action() {
        BlazeLayout.render('MainLayout', {main:'SubredditChartSingle'});
    }
});


FlowRouter.route('/r/:subreddit', {
    name: 'liveSubreddit',
    action() {
        BlazeLayout.render('MainLayout', {main:'SubredditChartLive'});
    }
});

FlowRouter.route('/r/:subreddit/chart', {
    name: 'subredditChart',
    action() {
        BlazeLayout.render('MainLayout', {main:'SubredditChart'});
    }
});



FlowRouter.route('/subreddit', {
    name: 'subreddits',
    action() {
        BlazeLayout.render('MainLayout', {main:'Subreddits'});
    }
});

FlowRouter.route('/subreddit/:subreddit', {
    name: 'subreddit',
    action() {
        BlazeLayout.render('MainLayout', {main:'SubredditSingle'});
    }
});
