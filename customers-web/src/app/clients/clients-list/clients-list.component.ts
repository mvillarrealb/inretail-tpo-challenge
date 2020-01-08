import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { Customer } from '../../interfaces/client';
import * as moment from 'moment';

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
    styles: []
})
export class ClientsListComponent implements OnInit {
    clientsList: Customer[] = [];
    @Input() hasProjection = false;
    @Output() data: EventEmitter<any> = new EventEmitter();
    @Output() eventEdit: EventEmitter<any> = new EventEmitter();
    constructor(
        private clientsService: ClientsService
    ) {}

    ngOnInit() {
        this.showClients();
        const container: HTMLElement = document.querySelector(
            '.container-table'
        );
        const ps = new PerfectScrollbar(container);
    }

    renderDate(date: any) {
        return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }

    private showClients() {
        this.clientsService.findAll().subscribe((res: Customer[]) => {
            this.clientsList = res;
            this.data.emit(res);
        });
    }
}
