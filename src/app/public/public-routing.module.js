"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var signup_component_1 = require("./signup.component");
var homepage_component_1 = require("./homepage.component");
var login_component_1 = require("./login.component");
var publicRoutes = [
    { path: "signup", component: signup_component_1.SignupComponent },
    { path: "home", component: homepage_component_1.HomePageComponent },
    { path: "login", component: login_component_1.LoginComponent }
];
var PublicRoutingModule = (function () {
    function PublicRoutingModule() {
    }
    return PublicRoutingModule;
}());
PublicRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(publicRoutes, { useHash: true })
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], PublicRoutingModule);
exports.PublicRoutingModule = PublicRoutingModule;
//# sourceMappingURL=public-routing.module.js.map