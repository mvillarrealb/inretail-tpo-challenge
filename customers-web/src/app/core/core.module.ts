import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';

const bookstores: any = [
    AngularFirestoreModule,
    SharedComponentsModule,
    ReactiveFormsModule
];

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebaseconfig),
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ...bookstores
    ],
    declarations: [],
    exports: [ModalModule, BsDatepickerModule, ...bookstores]
})
export class CoreModule { }
