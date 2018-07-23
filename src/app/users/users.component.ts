import {Component, OnInit, TemplateRef} from '@angular/core';
import {DbService} from '../services/db.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    modalRef: BsModalRef;
    users: any;
    activeUser: any;
    formData: any;
    formDataValid: boolean = false;

    constructor(private modalService: BsModalService, private db: DbService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.db.getItems('/users').subscribe(res => {
            this.users = res;
            this.activeUser = this.users.filter(item => {
                if (item.data.active === 1) {
                    return item;
                }
            });
        });
    }

    addUserModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    addUser() {
        const user = {
            active: 0,
            img: this.formData.value.img,
            name: this.formData.value.name,
            email: this.formData.value.email,
        };
        this.db.createItem('/users', user);
        this.modalRef.hide();
    }

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
    }

    setActiveUser(data) {
        this.users.filter(item => {
            if (item.data.active === 1) {
                const user = {
                    active: 0,
                    img: item.data.img,
                    name: item.data.name,
                    email: item.data.email,
                };
                this.db.updateItem('/users', item.key, user);
            }
        });
        const user = {
            active: 1,
            img: data.data.img,
            name: data.data.name,
            email: data.data.email,
        };
        this.db.updateItem('/users', data.key, user);
    }
 }
