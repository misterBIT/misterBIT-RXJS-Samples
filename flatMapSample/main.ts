
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

// We want to accumulate all likes of all tweets
tweets.flatMap(tweet => tweet.likes)
      .subscribe(likeAction => {
        likeCount += likeAction;
        console.log(`Total Likes (All Tweets): ${likeCount}`);
      });


let tweet1 = new Tweet('I Love RxJS ');
let tweet2 = new Tweet('I Go Bananas ');
tweets.next(tweet1);
tweets.next(tweet2);



function generateTweets() {
    setInterval(()=>{
      let reaction = (Math.random() > 0.5)? LikeAction.Like : LikeAction.Unlike;
      tweet1.likes.next(reaction)
      
      reaction = (Math.random() > 0.5)? LikeAction.Like : LikeAction.Unlike;
      tweet2.likes.next(reaction)
    
    }, 1000)

}

generateTweets();