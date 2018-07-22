import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FileStorageService} from '../services/file-storage.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    user_form: FormGroup;
    @Input() userFormItem;
    @Output() formItem = new EventEmitter<any>();

    constructor(private storage: FileStorageService) {
    }

    ngOnInit() {
        this.user_form = new FormGroup({
            img: new FormControl(this.userFormItem ? this.userFormItem.data.img : '', Validators.required),
            name: new FormControl(this.userFormItem ? this.userFormItem.data.name : '', Validators.required),
            email: new FormControl(this.userFormItem ? this.userFormItem.data.email : '', [Validators.required, this.checkUrl])
        });
    }

    checkUrl(control: FormControl) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(control.value)) {
            return null;
        }
        return {
            'errorCode': true
        };
    }

    formRun(event) {
        if (event) {
            this.storage.uploadFile('image', event).subscribe(res => {
                console.log('res', res);
            });
        }
        this.formItem.emit(this.user_form);
    }
}
