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
plugins: ['advlist autolink lists link image charmap print preview anchor',
'searchreplace visualblocks code fullscreen',
'insertdatetime media table contextmenu paste code'],
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
