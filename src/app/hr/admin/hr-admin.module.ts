import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { HRAdminRoutingModule } from './hr-admin-routing.module'
import { UtilsModule } from '@shared/utils/utils.module'
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { EJAngular2Module } from 'ej-angular2'; 


import { DataTableModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,

        FileUploadModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),

        HRAdminRoutingModule,
        UtilsModule,
        AppCommonModule,
        EJAngular2Module.forRoot(),
        DataTableModule,
        PaginatorModule
    ],
    declarations: [
    ],
    providers: [
    ]
})
export class HRAdminModule { }