Template.SubredditChartSingle.onCreated(function() {
    import moment from 'moment';
    import chart from 'chart.js';
});

Template.SubredditChartSingle.onRendered(function() {

    var self = this;
    var subreddit = FlowRouter.getParam('subreddit');
    var ctx  = document.getElementById("chart").getContext("2d");

    var timeString = moment();
    var firstCount = -1;
    var lastCount = -1;
    var delta = -1;

    var data = {
        labels: [timeString],
        datasets: [{
            label: '# of Posts',
            data: [0],
            yAxisID: 'left-y-axis'
        },
        {
            label: 'Delta',
            borderColor: '#ff6384',
            data: [0],
            yAxisID: 'right-y-axis'
        }]
    };
    chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                      tooltipFormat: "HH:mm:ss.SS",
                    },
                    ticks: {
                        autoSkipPadding: 5
                    }
                }],
                yAxes: [{
                        id: 'left-y-axis',
                        type: 'linear',
                        position: 'left',
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: '# Of Posts'
                        }
                    },
                    {
                    id: 'right-y-axis',
                    type: 'linear',
                    position: 'right',
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        min:0,
                        max:100
                    },
                    scaleLabel: {
                            display: true,
                            labelString: '# Of Posts Added'
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


    // setInterval(function() {
    //     self.subscribe('singleSubreddit', subreddit);
    //     var cursor =  Subreddits.findOne({name: subreddit});

    //     if(cursor) {
    //         console.log(cursor);
    //         if (lastCount == -1) {
    //             lastCount = cursor.count;
    //         }

    //         timeString = moment().format('h:mm:ss a');
    //         chart.data.labels.push(timeString);
    //         chart.data.datasets[0].data.push(cursor.count - lastCount);
    //         // chart.update(0);
    //         chart.update();
    //     }

    // }, 2000);



    self.autorun(function() {
        self.subscribe('singleSubreddit', subreddit);
        var cursor =  Subreddits.findOne({name: subreddit});

        if(cursor) {
            console.log(cursor);
            if (firstCount == -1) {
                firstCount = cursor.count;
                lastCount = cursor.count;
            }


            delta = cursor.count - lastCount;

            timeString = moment();
            chart.data.labels.push(timeString);
            chart.data.datasets[0].data.push(cursor.count - firstCount);
            chart.data.datasets[1].data.push(delta);

            lastCount = cursor.count;
            // chart.update(0);
            chart.update();
        }
    });
})

Template.SubredditChartSingle.helpers({
    subreddit: ()=> {
        var subreddit = FlowRouter.getParam('subreddit');
        return Subreddits.findOne({name: subreddit});
    }
})