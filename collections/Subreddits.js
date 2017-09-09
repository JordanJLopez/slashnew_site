Subreddits = new Mongo.Collection('subreddits');

SubredditSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Subreddit"
    },
    count: {
        type: Number,
        label: "Number of Posts in Subreddit"
    },
    last_title: {
        type: String,
        label: "Newest Post Title"
    },
    last_author: {
        type: String,
        label: "Newest Post Author"
    },
    last_shortlink: {
        type: String,
        label: "Newest Post Link"
    },
    time: {
        type: String,
        label: "Document Date"
    },
    over_18: {
        type: Boolean,
        label: "NSFW status of Newest Post"
    },
    last_subreddit: {
        type: String,
        label: "Subreddit of Newest Post"
    },
    last_timestamp: {
        type: String,
        label: "Newest Post Timestamp"
    }
});

Subreddits.attachSchema(SubredditSchema);