import { Injectable } from '@angular/core';

@Injectable()
export class CommonResponseService {
    private messageMap: Map<String, String> = new Map<String, String>();
    constructor() {
        this.messageMap.set("SIGNSUCC", "You are registered successfully. A verification mail has been send to your registered emailId"),
            this.messageMap.set("LOGINSUCC", "You are logged in successfully")
        this.messageMap.set("RESETPASSSUCC", "Your password has been reset successfully. New password has been sent to your emailId");
        this.messageMap.set("USER_NAME_MISSING", "Please enter user name.")
        this.messageMap.set("PASSWORD_MISSING", "Please enter password.")
        this.messageMap.set("NO_USER_FOUND", "No user found with provided detail. please enter valid user name and client code")
        this.messageMap.set("DUPLICATE_USER", "User already exists.")
        this.messageMap.set("CLIENT_CODE_MISSING", "Please enter client code.")
        this.messageMap.set("INVALID_CREDENTIAL", "You have entered wrong password.")
        this.messageMap.set("USER_INACTIVE", "User is not active, Contact your admin.")
        this.messageMap.set("INVALID_PASSWORD_FORMAT", "Password must contain 1 upper case, 1 numeric and 1 special character.")
        this.messageMap.set("TITLE_MISSING", "Please provide questionnaire title.")
        this.messageMap.set("NUM_OF_QUES_MISSING", "Please provide number of questions you want to add in questionnaire.")
        this.messageMap.set("DURATION_MISSING", "Please provide questionnaire time duration.")
        this.messageMap.set("MARKS_MISSING", "Please provide questionnaire total marks.")
        this.messageMap.set("QUESTION_TITLE_MISSING", "Please provide question title.")
        this.messageMap.set("QUESTION_TYPE_MISSING", "Please provide question type.")
        this.messageMap.set("INVALID_QUESTION_TYPE", "Please provide valid question type.")
        this.messageMap.set("NO_QUESTIONNAIRE_FOUND", "No questionnaire found for this id.")
        this.messageMap.set("NO_USER_EMAIL_ID_FOUND", "No user found with provided emailId")
        this.messageMap.set("NO_CLIENT_EMAIL_ID_FOUND", "No client found with provided emailId")
        this.messageMap.set("NO_CLIENT_FOUND", "No client found with provided detail")

    }

    getMessage(code: String) {
        return this.messageMap.get(code);
    }
}
