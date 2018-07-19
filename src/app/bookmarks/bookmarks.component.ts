import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DbService} from '../services/db.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.component.html',
    styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
    modalRef: BsModalRef;
    form: FormGroup;
    bookmarksCopy: any;
    bookmarks = [];
    returnedArray: any[];
    formData: any;
    formDataValid: boolean = false;

    constructor(private modalService: BsModalService, private db: DbService) {
    }

    ngOnInit() {
        this.getBookmarks();
    }

    getBookmarks() {
        this.db.getItems('/bookmarks').subscribe(res => {
            this.bookmarks = res;
            const copy = JSON.stringify(this.bookmarks);
            this.bookmarksCopy = JSON.parse(copy);
            this.returnedArray = this.bookmarks.slice(0, 10);
        });
    }

    pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedArray = this.bookmarks.slice(startItem, endItem);
    }

    addBookmarkModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    addBookmark() {
        const bookmark = {
            title: this.formData.value.title,
            url: this.formData.value.url,
        };
        this.db.createItem('/bookmarks', bookmark);
        this.modalRef.hide();
        this.form.reset();
    }

    searchResult(search) {
        this.returnedArray = this.bookmarksCopy;
        if (!search) {
            return this.returnedArray = this.returnedArray.slice(0, 10);
        }
        this.returnedArray = this.returnedArray.filter(item => {
            if (String(item.data.title.toLowerCase()).includes(String(search.toLowerCase()))) {
                return item;
            }
        });
    }

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
    }
}
