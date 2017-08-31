import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { FileDownloadService } from "shared/utils/file-download.service";
import { PayrollReportItemServiceProxy } from "shared/service-proxies/service-proxies";
import { DataTable, Paginator, LazyLoadEvent } from "primeng/primeng";
import { PayrollReportitemEditComponent } from "app/payroll/admin/payroll-report/payroll-reportitem-edit/payroll-reportitem-edit.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'payroll-reportitem-list',
    templateUrl: './payroll-reportitem-list.component.html',
    styleUrls: ['./payroll-reportitem-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PayrollReportitemListComponent extends PayrollComponentBase implements OnInit {
      
    @ViewChild('editPayrollReportItemModal') editModal: PayrollReportitemEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;
    groupId: string;

    constructor(
        injector: Injector,
        private _payrollReportItemService: PayrollReportItemServiceProxy,
        private _fileDownloadService: FileDownloadService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._route.paramMap.subscribe(params => {
            this.groupId = params.get("id");
        })
    }

    back(): void { this._router.navigate(['']) }

    editRecord(id: number): void {
        this.editModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._payrollReportItemService.getPayrollReportItemForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('PayrollReportItemDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._payrollReportItemService.deletePayrollReportItem(id)
                                .subscribe(() => {
                                    this.getPayrollReportItems();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    });
            })
        }
    }

    getPayrollReportItems(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._payrollReportItemService.getPayrollReportItems(
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
        this._payrollReportItemService.getPayrollReportItemsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPayrollReportItem(): void {
        this.editModal.show();
    }
}
