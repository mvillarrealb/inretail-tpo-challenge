import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlMessagesService } from '../../services/control-messages.service';

@Component({
    selector: 'app-control-messages',
    templateUrl: './control-messages.component.html',
})
export class ControlMessagesComponent {

    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        if (this.control) {
            for (const propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                    return ControlMessagesService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }
        return null;
    }

}
