import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { ClientsService } from './services/clients.service';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsIndexComponent } from './clients/clients-index/clients-index.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientsProjectionComponent } from './clients/clients-projection/clients-projection.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        ClientsFormComponent,
        ClientsListComponent,
        ClientsIndexComponent,
        ClientsProjectionComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule
    ],
    providers: [ClientsService ],
    bootstrap: [AppComponent],
    entryComponents: [ClientsFormComponent]
})
export class AppModule { }
