import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { FileDownloadService } from "shared/utils/file-download.service";
import { PayrollRegionServiceProxy } from "shared/service-proxies/service-proxies";
import { DataTable, Paginator, LazyLoadEvent } from "primeng/primeng";
import { PayrollRegionEditComponent } from "app/payroll/admin/regions/payroll-region-edit/payroll-region-edit.component";

@Component({
    selector: 'payroll-region-list',
    templateUrl: './payroll-region-list.component.html',
    styleUrls: ['./payroll-region-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PayrollRegionListComponent extends PayrollComponentBase {

    @ViewChild('editPayrollRegionModal') editModal: PayrollRegionEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _payrollRegionService: PayrollRegionServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    editRecord(id: number): void {
        this.editModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._payrollRegionService.getPayrollRegionForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('PayrollRegionDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._payrollRegionService.deletePayrollRegion(id)
                                .subscribe(() => {
                                    this.getPayrollRegion();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    });
            })
        }
    }

    getPayrollRegion(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._payrollRegionService.getPayrollRegions(
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

    exportToExcel(): void {
        this._payrollRegionService.getPayrollRegionsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPayrollRegion(): void {
        this.editModal.show();
    }
}
