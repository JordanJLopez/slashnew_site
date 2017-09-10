Template.HomeLayout.onRendered(function() {
  var self = this;
  var date_str = moment().format('L');
  self.subscribe('liveSubreddit', 'all', date_str);

})

Template.HomeLayout.events({
  'submit .subreddit-search'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;

    if(text != '') {
      window.location.href = '/r/'+text;
    } else {
      // Clear form
      target.text.value = '';
    }

  },
  'click .btn'(event) {
    var text = document.getElementById("search").value;

    if(text != '') {
      window.location.href = '/r/'+text;
    } else {
      document.getElementById("search").value = '';
    }

  }
})

Template.HomeLayout.helpers({
    subreddit: ()=> {
        return Subreddits.findOne({name: 'all'});
    }
})