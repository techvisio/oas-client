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
var core_1 = require("@angular/core");
var CommonResponseService = (function () {
    function CommonResponseService() {
        this.messageMap = new Map();
        this.messageMap.set("SIGNSUCC", "You are registered successfully. A verification mail has been send to your registered emailId"),
            this.messageMap.set("LOGINSUCC", "You are logged in successfully");
    }
    CommonResponseService.prototype.getMessage = function (code) {
        return this.messageMap.get(code);
    };
    return CommonResponseService;
}());
CommonResponseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CommonResponseService);
exports.CommonResponseService = CommonResponseService;
//# sourceMappingURL=common-response.service.js.map