import {Component, OnInit, TemplateRef} from '@angular/core';
import {DbService} from '../services/db.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    modalRef: BsModalRef;
    formData: any;
    userFormData: any;
    formDataValid: boolean = false;
    clearForm: boolean = false;
    bookmarks: any;
    bookmarkLast: any;
    bookmarkPrevious: any;
    users: any;
    activeUser: any;
    appearance: {};

    constructor(private modalService: BsModalService, private db: DbService, private router: Router) {
        if (localStorage.pageOptions) {
            const options = JSON.parse(localStorage.getItem('pageOptions'));
            this.appearance = {
                themeColor: options.themeColor,
                fontSize: options.fontSize,
                pageZoom: options.pageZoom,
                showBookmarks: options.showBookmarks
            };
        } else {
            this.appearance = {
                themeColor: 'white',
                fontSize: 1,
                pageZoom: 1,
                showBookmarks: true
            };
        }
    }

    ngOnInit() {
        this.getBookmarks();
        this.getUsers();
    }

    setActiveTheme() {
        localStorage.setItem('pageOptions', JSON.stringify(this.appearance));
    }

    openPrint() {
        localStorage.setItem('printingPage', JSON.stringify(true));
        this.router.navigateByUrl('/');
    }

    resetOptions() {
        this.appearance = {
            themeColor: 'white',
            fontSize: 1,
            pageZoom: 1,
            showBookmarks: true
        };
        localStorage.setItem('pageOptions', JSON.stringify(this.appearance));
    }

    userModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    getBookmarks() {
        this.db.getItems('/bookmarks').subscribe(res => {
            this.bookmarks = res;
            this.bookmarkLast = this.bookmarks[this.bookmarks.length - 1];
            this.bookmarkPrevious = this.bookmarks[this.bookmarks.length - 2];
        });
    }

    addBookmark() {
        const bookmark = {
            title: this.formData.value.title,
            url: this.formData.value.url,
        };
        this.db.createItem('/bookmarks', bookmark);
        this.clearForm = true;
    }

    getUsers() {
        this.db.getItems('/users').subscribe(res => {
            this.users = res;
            this.users.filter(item => {
                if (item.data.active === 1) {
                    this.activeUser = item;
                }
            });
        });
    }

    editUser() {
        const user = {
            active: 1,
            img: this.userFormData.value.img,
            name: this.userFormData.value.name,
            email: this.userFormData.value.email,
        };
        this.db.updateItem('users', this.userFormData.key, user);
        this.modalRef.hide();
    }

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
    }

    userFormComplete(data) {
        console.log(data);
        this.userFormData = data;
        this.formDataValid = data.valid;
    }
}
