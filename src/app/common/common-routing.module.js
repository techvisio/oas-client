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
var common_response_component_1 = require("./common-response.component");
var commonRoutes = [
    { path: "success/:code", component: common_response_component_1.CommonResponseComponent },
    { path: "error/:code", component: common_response_component_1.CommonResponseComponent }
];
var CommonRoutingModule = (function () {
    function CommonRoutingModule() {
    }
    return CommonRoutingModule;
}());
CommonRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(commonRoutes, { useHash: true })
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], CommonRoutingModule);
exports.CommonRoutingModule = CommonRoutingModule;
//# sourceMappingURL=common-routing.module.js.map