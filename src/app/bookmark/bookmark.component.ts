import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DbService} from '../services/db.service';

@Component({
    selector: 'app-bookmark',
    templateUrl: './bookmark.component.html',
    styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
    @Input() bookmarkItem;
    modalRef: BsModalRef;
    formData: any;
    formDataValid: boolean = false;

    constructor(private modalService: BsModalService, private db: DbService) {
    }

    ngOnInit() {
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

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
        console.log(this.formData);
    }

}
