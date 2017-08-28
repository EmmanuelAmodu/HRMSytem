import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModalModule, TabsModule, TooltipModule, PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from '@node_modules/ng2-file-upload';

import { PayrollAdminRoutingModule } from './payroll-admin-routing.module'
import { UtilsModule } from '@shared/utils/utils.module'
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { EJAngular2Module } from 'ej-angular2'; 


import { BankListComponent } from './banks/bank-list/bank-list.component';
import { EditBankComponent } from './banks/edit-bank/edit-bank.component';
import { SectorsListComponent } from './business-sectors/sectors-list/sectors-list.component';
import { EditSectorComponent } from './business-sectors/edit-sector/edit-sector.component';
import { GlaccountListComponent } from './glaccounts/glaccount-list/glaccount-list.component';
import { EditGlaccountComponent } from './glaccounts/edit-glaccount/edit-glaccount.component';
import { PensionAdminListComponent } from './pension-admins/pension-admin-list/pension-admin-list.component';
import { PensionAdminEditComponent } from './pension-admins/pension-admin-edit/pension-admin-edit.component';
import { DataTableModule, PaginatorModule } from "primeng/primeng";
import { PayelementListComponent } from './payelements/payelement-list/payelement-list.component';
import { PayelementEditComponent } from './payelements/payelement-edit/payelement-edit.component';
import { CostCenterListComponent } from "app/payroll/admin/costcenters/cost-center-list/cost-center-list.component";
import { CostCenterEditComponent } from "app/payroll/admin/costcenters/cost-center-edit/cost-center-edit.component";

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

        PayrollAdminRoutingModule,
        UtilsModule,
        AppCommonModule,
        EJAngular2Module.forRoot(),
        DataTableModule,
        PaginatorModule
    ],
    declarations: [

        SectorsListComponent,
        EditSectorComponent,
        GlaccountListComponent,
        EditGlaccountComponent,
        BankListComponent,
        EditBankComponent,
        PensionAdminListComponent,
        PensionAdminEditComponent,
        PayelementListComponent,
        PayelementEditComponent,
        CostCenterListComponent,
        CostCenterEditComponent
    ],
    providers: [
    ]
})
export class PayrollAdminModule { }