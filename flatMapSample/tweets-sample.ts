enum LikeAction {
  Like = 1,
  Unlike = -1
}

class Tweet {
  likes = new Rx.Subject<LikeAction>();
  constructor (public text: string) {}
}

let tweets = new Rx.Subject<Tweet>();
let likeCount = 0;

tweets.subscribe(tweet => console.log(tweet.text));

tweets.flatMap(tweet => tweet.likes)
      .subscribe(likeAction => {
        likeCount = likeCount + likeAction;
        console.log(`Total Likes: ${likeCount}`);
      });

let firstTweet = new Tweet('first tweet');
let secondTweet = new Tweet('second tweet');

tweets.next(firstTweet);
tweets.next(secondTweet);

firstTweet.likes.next(LikeAction.Like);
secondTweet.likes.next(LikeAction.Like);
secondTweet.likes.next(LikeAction.Like);
secondTweet.likes.next(LikeAction.Unlike);