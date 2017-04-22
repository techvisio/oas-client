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
var login_service_1 = require("./login.service");
var LoginComponent = (function () {
    function LoginComponent(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        //  @HostBinding('@routeAnimation') routeAnimation = true;
        //@HostBinding('style.display')   display = 'block';
        //@HostBinding('style.position')  position = 'absolute';
        this.loginData = new login_service_1.LoginDetail();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.route.params;
        // (+) converts string 'id' to a number
        //.switchMap((params: Params) => this.service.getHero(+params['id']))
        // .subscribe((hero: Hero) => this.hero = hero);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.service.login(this.loginData).then(function (response) {
            if (response.status === 'success') {
                _this.router.navigate(['/success', "LOGINSUCC"]);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/public/login.component.html',
        styleUrls: ['app/public/login.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map