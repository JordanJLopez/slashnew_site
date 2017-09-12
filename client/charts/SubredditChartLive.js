Template.SubredditChartLive.onCreated(function() {
    import moment from 'moment';
    import chart from 'chart.js';
});

Template.SubredditChartLive.onRendered(function() {

    var self = this;
    var subreddit = FlowRouter.getParam('subreddit').toLowerCase();
    var ctx  = document.getElementById("chart").getContext("2d");

    var timeString = moment().format('h:mm:ss a');
    var firstCount = -1;
    var lastCount = -1;
    var delta = -1;

    var data = {
        labels: [timeString],
        datasets: [{
            label: '# Of Submissions Since ' + moment().format('LT'),
            data: [0],
            yAxisID: 'left-y-axis'
        },
        {
            label: 'Delta',
            borderColor: '#f44336',
            data: [0],
            pointStyle: 'star',
            fill: false,
            yAxisID: 'right-y-axis'
        }]
    };
    chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    display: false
                    // type: 'time',
                    // time: {
                    //   tooltipFormat: "HH:mm:ss.SS",
                    // }
                }],
                yAxes: [{
                        id: 'left-y-axis',
                        type: 'linear',
                        position: 'left',
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 50,
                        },
                        scaleLabel: {
                            display: true
                            // labelString: '# Of Submissions'
                        }
                    },
                    {
                    id: 'right-y-axis',
                    type: 'linear',
                    position: 'right',
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 50,
                        fontColor: '#f44336'
                        // min:0,
                        // max:100
                    },
                    scaleLabel: {
                            display: true
                            // labelString: '# Of Submissions Added'
                    }
                }],
                bezierCurve: false
            },

            elements: {
                line: {
                    tension: 0, // disables bezier curves
                }
            }

        }
    });

    var dataCount = 1;
    var maxData = 50;

    self.autorun(function() {
        var date_str = moment().format('LT');

        self.subscribe('liveSubreddit', subreddit, date_str);
        var cursor =  Subreddits.findOne();
        // var maxData = document.getElementById('chartSlider');

        if(cursor) {
            if (firstCount == -1) {
                firstCount = cursor.count;
                lastCount = cursor.count;
            }

            // New document is added for each day.
            // New document inital count is 0
            // The following handles the transition without
            // breaking the graph

            if (0 > (cursor.count - lastCount)) {

                delta = cursor.count
            } else {
                delta = cursor.count - lastCount;

            }

            timeString = moment().format('LT');
            if(delta > 0) {
                chart.data.labels.push(timeString);
                chart.data.datasets[0].data.push(cursor.count - firstCount);
                chart.data.datasets[1].data.push(delta);
                chart.update();
                dataCount += 1;
            }

            // Reduce amount of data to fit max
            while (dataCount > maxData) {
                    chart.data.labels.shift();
                    chart.data.datasets.forEach((dataset) => {
                        dataset.data.shift();
                    });
                    dataCount -= 1;
            }


            lastCount = cursor.count;
            // // chart.update(0);
            // chart.update();
        }
    });
})

Template.SubredditChartLive.helpers({
    subreddit: ()=> {
        var subreddit = FlowRouter.getParam('subreddit').toLowerCase();
        return Subreddits.findOne({name: subreddit});
    },

    route_name: ()=> {
        return FlowRouter.getParam('subreddit').toLowerCase();
    },

    data_exists: ()=> {
        // Returns true if there exists data in the database
        var subreddit = FlowRouter.getParam('subreddit').toLowerCase();
        return Subreddits.findOne({name: subreddit})  !== undefined;
    },

    sn_date: ()=> {
        var date_str = moment().tz('America/Chicago').format('L');
        return date_str;
    },

    reddit_timestamp: ()=> {
        var subreddit = FlowRouter.getParam('subreddit').toLowerCase();
        var reddit_utc = Subreddits.findOne({name: subreddit}).last_created;
        console.log(reddit_utc);
        return moment(reddit_utc);
    }

})