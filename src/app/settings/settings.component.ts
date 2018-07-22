import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    formData: any;
    formDataValid: boolean = false;
    clearForm: boolean = false;
    bookmarks: any;
    bookmarkLast: any;
    bookmarkPrevious: any;
    users: any;
    activeUser: any;

    constructor(private db: DbService) {
    }

    ngOnInit() {
        this.getBookmarks();
        this.getUsers();
    }

    getBookmarks() {
        this.db.getItems('/bookmarks').subscribe(res => {
            this.bookmarks = res;
            this.bookmarkLast = this.bookmarks[this.bookmarks.length - 1];
            this.bookmarkPrevious = this.bookmarks[this.bookmarks.length - 2];
        });
    }

    getUsers() {
        this.db.getItems('/users').subscribe(res => {
            this.users = res;
            this.users.filter(item => {
                if (item.data.active === 1) {
                    this.activeUser = item;
                }
            });
            console.log(this.activeUser);
        });
    }

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
    }

    addBookmark() {
        const bookmark = {
            title: this.formData.value.title,
            url: this.formData.value.url,
        };
        this.db.createItem('/bookmarks', bookmark);
        this.clearForm = true;
    }

}
