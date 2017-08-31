import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { FileDownloadService } from "shared/utils/file-download.service";
import { PayrollReportGroupServiceProxy } from "shared/service-proxies/service-proxies";
import { DataTable, Paginator, LazyLoadEvent } from "primeng/primeng";
import { PayrollReportgroupEditComponent } from "app/payroll/admin/payroll-report/payroll-reportgroup-edit/payroll-reportgroup-edit.component";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-payroll-reportgroup-list',
    templateUrl: './payroll-reportgroup-list.component.html',
    styleUrls: ['./payroll-reportgroup-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PayrollReportgroupListComponent extends PayrollComponentBase {

    @ViewChild('editPayrollReportGroupModal') editModal: PayrollReportgroupEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _payrollReportGroupService: PayrollReportGroupServiceProxy,
        private _fileDownloadService: FileDownloadService,
        private _router: Router,
        private _currentActivatedRoute: ActivatedRoute
    ) {
        super(injector);
    }

    editRecord(id: number): void {
        this.editModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._payrollReportGroupService.getPayrollReportGroupForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('PayrollReportGroupDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._payrollReportGroupService.deletePayrollReportGroup(id)
                                .subscribe(() => {
                                    this.getPayrollReportGroups();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    });
            })
        }
    }

    getPayrollReportGroups(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._payrollReportGroupService.getPayrollReportGroups(
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
        this._payrollReportGroupService.getPayrollReportGroupsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPayrollReportGroup(): void {
        this.editModal.show();
    }

    goToItemList(id: number): void {
        this._router.navigate(['/app', 'payroll', 'admin', 'payrollreportsitems', id]);
    }
}
