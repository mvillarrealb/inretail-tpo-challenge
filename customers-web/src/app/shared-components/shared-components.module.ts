import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CardComponent } from './card/card.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { RouterModule } from '@angular/router';


const components = [
    SidebarComponent,
    TopBarComponent,
    CardComponent,
    ControlMessagesComponent
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: components,
    exports: components
})
export class SharedComponentsModule { }
