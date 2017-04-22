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
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var signup_service_1 = require("./signup.service");
var HomePageComponent = (function () {
    function HomePageComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        this.route.params;
        // (+) converts string 'id' to a number
        //.switchMap((params: Params) => this.service.getHero(+params['id']))
        // .subscribe((hero: Hero) => this.hero = hero);
    };
    HomePageComponent.prototype.signup = function () {
        this.service.signUp(this.signupData);
    };
    return HomePageComponent;
}());
HomePageComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/public/homepage.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        signup_service_1.SignupService])
], HomePageComponent);
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=homepage.component.js.map