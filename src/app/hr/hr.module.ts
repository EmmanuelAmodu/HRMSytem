import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule } from 'ngx-bootstrap';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { HRRoutingModule } from './hr-routing.module';
import { CountoModule } from '@node_modules/angular2-counto';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { EJAngular2Module } from 'ej-angular2';
import { DataTableModule, PaginatorModule } from "primeng/primeng";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        TabsModule,
        TooltipModule,
        AppCommonModule,
        UtilsModule,
        HRRoutingModule,
        CountoModule,
        EasyPieChartModule,
        EJAngular2Module.forRoot(),
        DataTableModule,
        PaginatorModule
    ],
    declarations: [
    ]
})
export class HRModule { }