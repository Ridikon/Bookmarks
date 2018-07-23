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
    downloadUrl: string;
    @Input() userFormItem;
    @Output() formItem = new EventEmitter<any>();

    constructor(private storage: FileStorageService) {
    }

    ngOnInit() {
        this.user_form = new FormGroup({
            img: new FormControl(this.userFormItem ? this.userFormItem.data.img : '../assets/img/user.png'),
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

    uploadImg() {
        this.storage.uploadFile('image', event).then(res => {
            res.ref.getDownloadURL().then(url => {
                this.downloadUrl = url;
            }).then(() => {
                this.user_form.patchValue({
                    img: this.downloadUrl
                });
            }).catch(err => {
                console.log(err.message);
            });
        }).catch(err => {
            console.log(err.message);
        });
    }

    formRun(event) {
        if (event) {
            this.uploadImg();
            this.formItem.emit(this.user_form);
        } else {
            this.formItem.emit(this.user_form);
        }
    }
}
