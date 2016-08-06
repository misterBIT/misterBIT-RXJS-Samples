var $input = $('#input'),
    $results = $('#results');

/* Only get the value from each key up */
var keyups = Rx.Observable.fromEvent($input, 'keyup')
    .do(e => console.log('e is: ', e))
    .pluck('target', 'value')
    .do(e => console.log('value is: ', e))
    .filter(function (text) {
        return text.length > 2;
    })
    .do(e => console.log('filtered is: ', e))

/* Now debounce the input for 500ms */
var debounced = keyups.debounce(500 /* ms */);

/* Now get only distinct values, so we eliminate the arrows and other control characters */
var distinct = debounced.distinctUntilChanged();

// Avoid out-of-order ajax responses
var suggestions = distinct
    .flatMapLatest(searchWikipedia);

function searchWikipedia (term) {
    console.log('Searching for: ', term);
    return $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'opensearch',
            format: 'json',
            search: term
        }
    }).promise();
}

suggestions.subscribe(
    function (data) {
        console.log(data);
        $results
            .empty()
            .append ($.map(data[1], function (value, i) {
            return $('<li>').html('<a href="' + data[3][i] +
                                        '" title="'+data[2][i]+'" target="_blank">'+
                                        value + 
                                    '</a>');
        }));
    },
    function (error) {
        $results
            .empty()
            .text('Error:' + JSON.stringify(error));
    });
