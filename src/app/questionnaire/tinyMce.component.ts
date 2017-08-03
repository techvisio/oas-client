import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
declare const tinymce: any;
@Component({
    selector: 'simple-tiny',
    template: `<div id="{{elementId}}"></div>`
})
export class guiEditorComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Input() content: String;
    @Input() blurCondition: Boolean;
    @Output() onEditorKeyup = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();
    editor;
    constructor() {
    }
    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            menubar: false,
            resize: false,
            branding: false,
            statusbar: false,
            height: "60",
            width:"100%",
            content_style: ".mce-floatpanel{background-color: black;}",

            plugins: ['advlist lists charmap',
                'table'],
            toolbar: 'insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
                ],
            skin_url: 'assets/skins/lightgray',

            setup: editor => {

                this.editor = editor;
                editor.on('init', () => {
                    editor.setContent(this.content);
                });

                editor.on('blur', () => {
                    this.blurCondition = false;
                    this.onBlur.emit(this.blurCondition);
                });
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit({ "key": this.elementId, "value": content });
                });

            },
        });
    }
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
