import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsIndexComponent } from './clients/clients-index/clients-index.component';
import { ClientsProjectionComponent } from './clients/clients-projection/clients-projection.component';

const routes: Routes = [
    { path: '', component: ClientsIndexComponent },
    { path: 'projection', component: ClientsProjectionComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            useHash: true
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
