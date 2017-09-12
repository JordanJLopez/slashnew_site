FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('HomeLayout');
    }
});

FlowRouter.route('/about', {
    name: 'about',
    action() {
        BlazeLayout.render('MainLayout', {main:'About'});
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

FlowRouter.route('/top', {
    name: 'topSubreddits',
    action() {
        BlazeLayout.render('MainLayout', {main:'TopChart'});
    }
});
