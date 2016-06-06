// a socket that is singleton
var socket = Rx.DOM.fromWebSocket('ws://socket-server.com').singleInstance();

function getMultiplexData(id) {
  return Observable.create((observer) => {
    // send subscribe msg
    socket.onNext(JSON.stringify({ id: id, type: 'sub' }));

    var disposable = socket.map(e => JSON.parse(e.data)).
      filter(d => d.id === id).
      forEach(observer);

    return function(){
      // send unsubscribe msg
      socket.onNext(JSON.stringify({ id: id, type: 'unsub' }));
      disposable.dispose();
    }
  }).
  // wow, sockets often breaks, we can retry!
  retry(10);
}
