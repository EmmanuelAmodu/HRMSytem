import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SalaryBankServiceProxy, BankListDto } from '@shared/service-proxies/service-proxies';
import { EditBankComponent } from "app/payroll/admin/banks/edit-bank/edit-bank.component";
import { FileDownloadService } from '@shared/utils/file-download.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import * as moment from "moment";
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'bank-list',
    templateUrl: './bank-list.component.html',
    styleUrls: ['./bank-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class BankListComponent extends PayrollComponentBase {

    @ViewChild('editBankModal') editBankModal: EditBankComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _bankService: SalaryBankServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    actionItems: Object[] = [
        { text: "Edit Record", value: "Edit" },
        { text: "Delete Record", value: "Delete" }
    ];

    getBanks(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._bankService.getBanks(
            "",
            this.primengDatatableHelper.getSorting(this.dataTable),
            this.primengDatatableHelper.getMaxResultCount(this.paginator, event),
            this.primengDatatableHelper.getSkipCount(this.paginator, event)
        ).subscribe((data) => {
            //this.gridData = data.items;
            this.primengDatatableHelper.totalRecordsCount = data.totalCount;
            this.primengDatatableHelper.records = data.items;
            this.primengDatatableHelper.hideLoadingIndicator();
        });
    }

    editRecord(id: number): void {
        this.editBankModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._bankService.getBankForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('SalaryBankDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._bankService.deleteBank(id)
                                .subscribe(() => {
                                    this.getBanks();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._bankService.getBanksToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createBank(): void {
        this.editBankModal.show();
    }
}
