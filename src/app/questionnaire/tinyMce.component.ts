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
            width:"80%",
            
            content_style: "iframe{width: 100%;height: 60px;display: block;}",
            plugins: ['advlist lists charmap',
                'table'],
            toolbar: 'insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
            content_css: [
                '../myCss.css'
                ],
            skin_url: 'assets/skins/pepper-grinder',
            setup: editor => {

                this.editor = editor;
                editor.on('init', () => {
                    editor.setContent(this.content);
                });

                editor.on('blur', () => {
                    this.blurCondition = false;
                    this.onBlur.emit(this.blurCondition);
                    alert('blur');
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
