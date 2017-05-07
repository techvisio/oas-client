import { Injectable } from '@angular/core';

@Injectable()
export class CommonResponseService {
   private messageMap : Map<String, String>= new Map<String, String>();
   constructor() { 
       this.messageMap.set("SIGNSUCC","You are registered successfully. A verification mail has been send to your registered emailId"),
       this.messageMap.set("LOGINSUCC","You are logged in successfully")
        this.messageMap.set("USER_NAME_MISSING","Please enter user name.")
        this.messageMap.set("PASSWORD_MISSING","Please enter password.")
        this.messageMap.set("INVALID_PASSWORD_FORMAT","Password must contain 1 upper case, 1 numeric and 1 special character.")
        
        
   }
   
   getMessage(code:String){
       return this.messageMap.get(code);
   }
}
