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
template: `<textarea id="{{elementId}}"></textarea>`
})
export class guiEditorComponent implements AfterViewInit, OnDestroy {
@Input() elementId: String;
@Output() onEditorKeyup = new EventEmitter<any>();
editor;
constructor()
{
}
ngAfterViewInit() {
tinymce.init({
selector: '#' + this.elementId,
menubar: false,
plugins: ['advlist lists charmap',
    'table'],
     toolbar: 'insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
     content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'],
skin_url: 'assets/skins/lightgray',
setup: editor => {
this.editor = editor;
editor.on('keyup', () => {
const content = editor.getContent();
this.onEditorKeyup.emit(content);
});
},
});
}
ngOnDestroy() {
tinymce.remove(this.editor);
}
}
