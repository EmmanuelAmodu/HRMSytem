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
import { CostCenterListComponent } from "./costcenters/cost-center-list/cost-center-list.component";
import { CostCenterEditComponent } from "./costcenters/cost-center-edit/cost-center-edit.component";
import { PayrollRegionListComponent } from './regions/payroll-region-list/payroll-region-list.component';
import { PayrollRegionEditComponent } from './regions/payroll-region-edit/payroll-region-edit.component';
import { PayrollReportgroupListComponent } from './payroll-report/payroll-reportgroup-list/payroll-reportgroup-list.component';
import { PayrollReportgroupEditComponent } from './payroll-report/payroll-reportgroup-edit/payroll-reportgroup-edit.component';
import { PayrollReportitemListComponent } from './payroll-report/payroll-reportitem-list/payroll-reportitem-list.component';
import { PayrollReportitemEditComponent } from './payroll-report/payroll-reportitem-edit/payroll-reportitem-edit.component';
import { CustomerListComponent } from './customers/src/app/payroll/admin/customers/customer-list/customer-list.component';
import { CustomerEditComponent } from './customers/src/app/payroll/admin/customers/customer-edit/customer-edit.component';

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
        CostCenterEditComponent,
        PayrollRegionListComponent,
        PayrollRegionEditComponent,
        PayrollReportgroupListComponent,
        PayrollReportgroupEditComponent,
        PayrollReportitemListComponent,
        PayrollReportitemEditComponent,
        CustomerListComponent,
        CustomerEditComponent
    ],
    providers: [
    ]
})
export class PayrollAdminModule { }
