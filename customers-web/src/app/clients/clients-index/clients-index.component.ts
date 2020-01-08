import { Component, OnInit } from '@angular/core';
import { Customer } from '../../interfaces/client';
import { BsModalService } from 'ngx-bootstrap';
import { ClientsFormComponent } from '../clients-form/clients-form.component';
import { ClientsService } from 'src/app/services/clients.service';
import { CustomerKpi } from 'src/app/interfaces/customer.kpi';

@Component({
    selector: 'app-clients-index',
    templateUrl: './clients-index.component.html',
    styles: []
})
export class ClientsIndexComponent implements OnInit {
    customerKpi: CustomerKpi = new CustomerKpi({ ageAverage: 0.0, ageStandardDeviation: 0.0 });
    constructor(private bsModalRef: BsModalService,
        private clientService: ClientsService
        ) {}

    ngOnInit() {
        this.clientService.findKpis().subscribe((res: CustomerKpi) => {
            this.customerKpi = res;
        });
    }

    onEventClick() {
        this.showFormComponent();
    }

    private showFormComponent(client?: Customer) {
        const initialState: any = {};
        if (client) {
            initialState.client = client;
        }
        this.bsModalRef.show(ClientsFormComponent, {
            class: 'modal-dialog-centered',
            initialState
        });
    }
}
