Subreddits = new Mongo.Collection('subreddits');

SubredditSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Subreddit"
    },
    count: {
        type: Number,
        label: "Number of Posts in Subreddit"
    }
});

Subreddits.attachSchema(SubredditSchema);