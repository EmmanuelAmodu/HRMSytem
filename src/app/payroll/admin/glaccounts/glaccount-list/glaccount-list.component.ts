import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { GLAccountServiceProxy, GLAccountListDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EditGlaccountComponent } from "app/payroll/admin/glaccounts/edit-glaccount/edit-glaccount.component";
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'glaccount-list',
    templateUrl: './glaccount-list.component.html',
    styleUrls: ['./glaccount-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class GlaccountListComponent extends PayrollComponentBase {

    @ViewChild('editGLAccountModal') editModal: EditGlaccountComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _accountService: GLAccountServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getGLAccounts(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._accountService.getGLAccounts(
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
        this.editModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._accountService.getGLAccountForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('GLAccountDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._accountService.deleteGLAccount(id)
                                .subscribe(() => {
                                    this.getGLAccounts();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._accountService.getGLAccountsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createGLAccount(): void {
        this.editModal.show();
    }
}
