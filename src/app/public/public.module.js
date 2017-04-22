"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var public_routing_module_1 = require("./public-routing.module");
var homepage_component_1 = require("./homepage.component");
var signup_component_1 = require("./signup.component");
var signup_service_1 = require("./signup.service");
var login_component_1 = require("./login.component");
var login_service_1 = require("./login.service");
var PublicModule = (function () {
    function PublicModule() {
    }
    return PublicModule;
}());
PublicModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            public_routing_module_1.PublicRoutingModule
        ],
        declarations: [
            homepage_component_1.HomePageComponent,
            signup_component_1.SignupComponent,
            login_component_1.LoginComponent
        ],
        providers: [signup_service_1.SignupService, login_service_1.LoginService]
    })
], PublicModule);
exports.PublicModule = PublicModule;
//# sourceMappingURL=public.module.js.map