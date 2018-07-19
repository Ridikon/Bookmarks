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

    constructor(private db: DbService) {
    }

    ngOnInit() {
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
