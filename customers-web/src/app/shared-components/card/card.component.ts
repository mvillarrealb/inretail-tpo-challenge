import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styles: []
})
export class CardComponent implements OnInit {
    @Input() hasAction = true;
    @Input() title: string;
    @Input() subtitle: string;
    @Output() eventClick: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {
        //
    }

    onClickEvent() {
        this.eventClick.emit();
    }

}
