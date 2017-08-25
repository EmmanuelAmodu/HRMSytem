import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PensionAdminServiceProxy, PensionAdminListDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { PensionAdminEditComponent } from "app/payroll/admin/pension-admins/pension-admin-edit/pension-admin-edit.component";
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'app-pension-admin-list',
    templateUrl: './pension-admin-list.component.html',
    styleUrls: ['./pension-admin-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PensionAdminListComponent extends PayrollComponentBase {

    @ViewChild('editPensionAdminModal') editPensionAdminModal: PensionAdminEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _pensionAdminService: PensionAdminServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getPensionAdmins(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._pensionAdminService.getPensionAdmins(
            "",
            this.primengDatatableHelper.getSorting(this.dataTable),
            this.primengDatatableHelper.getMaxResultCount(this.paginator, event),
            this.primengDatatableHelper.getSkipCount(this.paginator, event)
        ).subscribe((data) => {
            this.primengDatatableHelper.totalRecordsCount = data.totalCount;
            this.primengDatatableHelper.records = data.items;
            this.primengDatatableHelper.hideLoadingIndicator();
        });
    }

    editRecord(id: number): void {
        this.editPensionAdminModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._pensionAdminService.getPensionAdminForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('PensionAdminDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._pensionAdminService.deletePensionAdmin(id)
                                .subscribe(() => {
                                    this.getPensionAdmins();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._pensionAdminService.getPensionAdminsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPensionAdmin(): void {
        this.editPensionAdminModal.show();
    }
}
