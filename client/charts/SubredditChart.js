Template.SubredditChart.onCreated(function() {
    var self = this;

    // self.autorun(function() {
    //     self.subscribe('subreddits', function() {
    //         console.log(Subreddits, Subreddits.find(), Subreddits.find().fetch());
    //     });
    // });
});

Template.SubredditChart.onRendered(function() {

    var self = this;
    var subreddit = 'all'
    var ctx  = document.getElementById("chart").getContext("2d");

    var data = {
        labels: [],
        datasets: [{
            label: '# of Posts',
            data: []
        }]
    };
    chart = new Chart(ctx, {
        type: 'bar',
        data: data
    });

    self.autorun(function() {
        var subreddit = FlowRouter.getParam('subreddit').toLowerCase();
        self.subscribe('subreddit', subreddit);
        var cursor = Subreddits.find();
        var chart_labels = cursor.map(function(a) {return a.time;});
        cursor.rewind();
        var chart_data = cursor.map(function(a) {return a.count;});

        chart.data.labels = chart_labels;
        chart.data.datasets[0].data = chart_data;

        chart.update();
    })

})

Template.SubredditChart.helpers({
    subreddit: ()=> {
        var subreddit = FlowRouter.getParam('subreddit').toLowerCase();
        return Subreddits.findOne({name: subreddit});
    },
})