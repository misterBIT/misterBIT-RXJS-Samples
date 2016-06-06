import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';
import {Control} from 'angular2/common';
import {JSONP_PROVIDERS} from 'angular2/http';
import {WikipediaService} from './wikipedia-servico'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Wikipedia Search</h2>
      <input type="text" [ngFormControl]="term"/>
      <ul>
        <li *ngFor="#item of items$ | async">{{item}}</li>
      </ul>
    </div>
  `
})
export class App {
  items$: Observable<Array<string>>;
  term = new Control();
  constructor(private wikipediaService: WikipediaService) {
    this.items$ = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 // flatMap make Observable<string> into the desired Observable<Array<string>>
                 // switchMap operator automatically unsubscribes from previous subscriptions as soon as the outer Observable emits new values
                 .switchMap(term => this.wikipediaService.search(term.toString()));
                 // Instead of manually subscribing to the Observable, let Angular do the unwrapping (note the AsyncPipe)
  }
}


bootstrap(App, [WikipediaService, JSONP_PROVIDERS]).catch(err => console.error(err));
