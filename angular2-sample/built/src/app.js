"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var wikipedia_service_1 = require('./wikipedia-service');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var App = (function () {
    function App(wikipediaService) {
        this.wikipediaService = wikipediaService;
    }
    App.prototype.search = function (term) {
        var _this = this;
        this.wikipediaService.search(term).then(function (items) { return _this.items = items; });
    };
    App = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n<div>\n    <h2>Wikipedia Search</h2>\n<input #term type=\"text\" (keyup)=\"search(term.value)\">\n<ul>\n    <li *ngFor=\"#item of items\">{{item}}</li>\n</ul>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [wikipedia_service_1.WikipediaService])
    ], App);
    return App;
}());
exports.App = App;
browser_1.bootstrap(App, [wikipedia_service_1.WikipediaService, http_1.JSONP_PROVIDERS]).catch(function (err) { return console.error(err); });
