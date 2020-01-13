import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';
import { CustomValidators } from 'ngx-custom-validators';
import { ControlMessagesService } from 'src/app/services/control-messages.service';
import { Customer } from 'src/app/interfaces/client';
import * as moment from 'moment';

@Component({
    selector: 'app-clients-form',
    templateUrl: './clients-form.component.html',
    styles: []
})
export class ClientsFormComponent implements OnInit {
    form: FormGroup;
    client: Customer;
    maxDate: any;
    constructor(
        public modalReference: BsModalRef,
        private formBuilder: FormBuilder,
        private clientsService: ClientsService
    ) {
        this.createform();
        this.maxDate = new Date();
    }

    ngOnInit() {
        const values: any = this.client;
        if (values) {
            values.birthDate = new Date(moment(this.client.birthDate, 'DD/MM/YYYY').format());
            this.form.patchValue({ ...values });
        }
    }

    onClickSave() {
        ControlMessagesService.markFormGroupTouched(this.form);
        if (this.form.valid) {
            const values = this.form.value;
            values.birthDate = moment(values.birthDate).format('YYYY-MM-DD');
            this.clientsService.create(values).then(() => {
                /**
                 * Success
                 */
                this.form.reset();
                this.modalReference.hide();
            });
        }
    }

    private createform() {
        this.form = this.formBuilder.group({
            name: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            birthDate: [
                new Date(),
                [Validators.required, CustomValidators.date]
            ]
        });
    }
}
