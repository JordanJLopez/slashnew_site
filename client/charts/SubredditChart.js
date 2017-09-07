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
    var ctx  = document.getElementById("chart").getContext("2d");

    var data = {
        labels: ['LOADING'],
        datasets: [{
            data: [0]
        }]
    };
    chart = new Chart(ctx, {
        type: 'bar',
        data: data
    });

    self.autorun(function() {
        self.subscribe('subreddits');
        var cursor =  Subreddits.find({}, {sort: {count: -1}, limit: 10});

        chart.data.labels = cursor.map(function(doc){return doc.name;});
        chart.data.datasets[0] = {label: "# of Posts",
        data: cursor.map(function(doc){return doc.count;})};
        chart.update(0);
    });
})

Template.SubredditChart.helpers({
    subredditChart: ()=> {
        var cursor =  Subreddits.find({}, {sort: {count: -1}, limit: 10});
        var data = {
            labels: cursor.map(function(doc){return doc.name;}),
            datasets: [{
                data: cursor.map(function(doc){return doc.count;})
            }]
        };

        console.log(data);

        chart.data = data;
        chart.update({duration: 0});
    }
})