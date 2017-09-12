Template.TopChart.onCreated(function() {
    var self = this;

    // self.autorun(function() {
    //     self.subscribe('subreddits', function() {
    //         console.log(Subreddits, Subreddits.find(), Subreddits.find().fetch());
    //     });
    // });
})

Template.TopChart.onRendered(function() {

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
        self.subscribe('topSubreddits', subreddit);
        var cursor = Subreddits.find();
        var chart_labels = []
        var chart_data = []

        cursor.forEach(function(item){
            chart_labels.push(item.name);
            chart_data.push(item.count);
        })

        chart.data.labels = chart_labels;
        chart.data.datasets[0].data = chart_data;

        chart.update();
    })

})


Template.TopChart.helpers({
    subreddit: ()=> {
        return Subreddits.findOne();
    },
})