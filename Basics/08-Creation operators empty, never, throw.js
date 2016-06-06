// wat: The only proper response to something that makes absolutely no sense
// audio here: http://he.urbandictionary.com/define.php?term=wat

var wat = Rx.Observable.never();
// var wat = Rx.Observable.empty();
// var wat = Rx.Observable.throw(new Error('OOOPs'));

wat.subscribe(function (x) {
  console.log('no next? ' + x);
}, function (err) {
  console.log(err);
}, function () {
  console.log('Observable Completed');
});

// Actually: very useful in testing!