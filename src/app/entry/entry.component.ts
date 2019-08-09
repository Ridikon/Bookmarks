import {AfterContentInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {SrakaComponent} from '../sraka/sraka.component';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    // template: `
    //     <div>
    //         <div #entry></div>
    //     </div>
    // `,
    styleUrls: ['./entry.component.scss'],
    animations: [
        trigger('whoop', [
            transition(':enter', [
                style({backgroundColor: 'green', height: 0}),
                animate(1000, style({height: '*'}))
            ]),
            transition(':leave', [
                animate(1000, style({backgroundColor: 'red', height: 0}))
            ])
        ])
    ]
})
export class EntryComponent implements OnInit, AfterContentInit {
    heroes = [
        {id: 1, name: 'Superman'},
        {id: 2, name: 'Batman'},
        {id: 3, name: 'Robin'},
        {id: 4, name: 'Flash'},
        {id: 5, name: 'BatGirl'}
    ];

    // @ViewChild('entry', {read: ViewContainerRef}) entry: ViewContainerRef;

    constructor(
        private resolver: ComponentFactoryResolver
    ) {
    }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        // const componentFactory = this.resolver.resolveComponentFactory(SrakaComponent);
        // const component = this.entry.createComponent(componentFactory);
        // component.instance['title'] = 'sraka 2';
        // // component.instance['foo'] = 'bar'
        // console.log(component.instance);
        // component.instance.submit.subscribe(this.onAction);
    }

    onAction(e: string) {
        console.log('wow', e);
    }

    trackByFn(index, item) {
        console.log(item);
        return item ? item.id : undefined;
    }

    addHero() {
        this.heroes = [
            {id: 1, name: 'Superman'},
            {id: 2, name: 'Batman'},
            {id: 3, name: 'Robin'},
            {id: 4, name: 'Flash'},
            {id: 5, name: 'BatGirl'},
            {id: 6, name: 'Tor'}
        ];
    }

}
