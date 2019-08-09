import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-sraka',
    templateUrl: './sraka.component.html',
    styleUrls: ['./sraka.component.scss'],

})
export class SrakaComponent implements OnInit {
    @Output() submit = new EventEmitter<string>();



    constructor() {
    }

    ngOnInit() {
    }

    onClick() {
        this.submit.emit('Super');
    }



}
