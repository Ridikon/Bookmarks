import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DbService} from '../services/db.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    modalRef: BsModalRef;
    formData: any;
    formDataValid: boolean;
    @Input() userItem;

    constructor(private modalService: BsModalService, private db: DbService) {
    }

    ngOnInit() {
    }

    userModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    editUser(item) {
        this.db.updateItem('users', item.key, this.formData.value);
        this.modalRef.hide();
    }

    deleteUser(item) {
        this.db.deleteItem('users', item.key);
        this.modalRef.hide();
    }

    formComplete(data) {
        this.formData = data;
        this.formDataValid = data.valid;
    }

}
