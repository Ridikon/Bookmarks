import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-bookmark',
    templateUrl: './add-bookmark.component.html',
    styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit, DoCheck {
    bookmark_form: FormGroup;
    @Output() formItem = new EventEmitter<any>();
    @Input() bookmarkFormItem;
    @Input() isClean;

    constructor() {
    }

    ngOnInit() {
        this.bookmark_form = new FormGroup({
            title: new FormControl(this.bookmarkFormItem ? this.bookmarkFormItem.data.title : '', Validators.required),
            url: new FormControl(this.bookmarkFormItem ? this.bookmarkFormItem.data.url : '', [Validators.required, this.checkUrl])
        });
    }

    ngDoCheck() {
        this.clearForm(this.isClean);
    }

    checkUrl(control: FormControl) {
        const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (regex.test(control.value)) {
            return null;
        }
        return {
            'errorCode': true
        };
    }

    formRun() {
        this.formItem.emit(this.bookmark_form);
    }

    clearForm(bool) {
        if (bool) {
            this.bookmark_form.reset();
        }
    }

}
