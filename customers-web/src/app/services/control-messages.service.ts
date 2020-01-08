import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ControlMessagesService {
    constructor() {}

    static getValidatorErrorMessage(
        validatorName: string,
        validatorValue?: any
    ) {
        const config = {
            required: '(*) El campo es requerido.',
            email: 'El correo no es válido.',
            min: `Mínimo valor permitido ${validatorValue.min}`,
            max: `Máximo valor permitido ${validatorValue.max}`,
            minlength: `Mínimo de caracteres permitidos ${
                validatorValue.requiredLength
            }`,
            maxlength: `Máximo de caracteres permitidos ${
                validatorValue.requiredLength
            }`,
            pattern: 'El valor no es permitido.',
            digits: 'Permitido solo numeros'
        };
        return config[validatorName];
    }

    static markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((key: any) => {
            formGroup.controls[key].markAsTouched();
        });
    }
}
