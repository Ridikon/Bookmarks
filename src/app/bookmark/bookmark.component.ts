import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DbService} from '../services/db.service';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
    @Input() bookmarkItem;
    modalRef: BsModalRef;
    form: FormGroup;
    formData: any;
    formDataValid: boolean = false;

    constructor(private modalService: BsModalService, private db: DbService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(this.bookmarkItem.data.title, Validators.required),
            url: new FormControl(this.bookmarkItem.data.url, [Validators.required, this.checkUrl])
        });
    }

    bookmarkModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    editBookmark(item) {
        this.db.updateItem('bookmarks', item.key, this.formData.value);
        this.modalRef.hide();
    }

    deleteBookmark(item) {
        this.db.deleteItem('bookmarks', item.key);
        this.modalRef.hide();
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

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
        console.log(this.formData);
    }

}
