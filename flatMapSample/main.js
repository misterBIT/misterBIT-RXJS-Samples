var LikeAction;
(function (LikeAction) {
    LikeAction[LikeAction["Like"] = 1] = "Like";
    LikeAction[LikeAction["Unlike"] = -1] = "Unlike";
})(LikeAction || (LikeAction = {}));
var Tweet = (function () {
    function Tweet(text) {
        this.text = text;
        this.likes = new Rx.Subject();
    }
    return Tweet;
}());
var tweets = new Rx.Subject();
var likeCount = 0;
tweets.subscribe(function (tweet) { return console.log(tweet.text); });
tweets.flatMap(function (tweet) { return tweet.likes; })
    .subscribe(function (likeAction) {
    likeCount = likeCount + likeAction;
    console.log(tweet1.text + " - Total Likes: " + likeCount);
});
var tweet1 = new Tweet('I Love RxJS ');
var tweet2 = new Tweet('I Go Bananas ');
tweets.next(tweet1);
tweets.next(tweet2);
function generateTweets() {
    setInterval(function () {
        var reaction = (Math.random() > 0.5) ? LikeAction.Like : LikeAction.Unlike;
        tweet1.likes.next(reaction);
        reaction = (Math.random() > 0.5) ? LikeAction.Like : LikeAction.Unlike;
        tweet2.likes.next(reaction);
    }, 1000);
}
generateTweets();
