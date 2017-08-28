import { Component, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { FileDownloadService } from "shared/utils/file-download.service";
import { CostCenterServiceProxy } from "shared/service-proxies/service-proxies";
import { DataTable, Paginator, LazyLoadEvent } from "primeng/primeng";
import { CostCenterEditComponent } from "app/payroll/admin/costcenters/cost-center-edit/cost-center-edit.component";

@Component({
  selector: 'cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrls: ['./cost-center-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class CostCenterListComponent extends PayrollComponentBase {

    @ViewChild('editCostCenterModal') editModal: CostCenterEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _costCenterelementService: CostCenterServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    editRecord(id: number): void {
        this.editModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._costCenterelementService.getCostCenterById(id).subscribe(result => {
                this.message.confirm(
                    this.l('CostCenterDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._costCenterelementService.deleteCostCenter(id)
                                .subscribe(() => {
                                    this.getCostCenters();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    });
            })
        }
    }

    getCostCenters(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._costCenterelementService.getCostCenters(
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
        this._costCenterelementService.getCostCentersToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPayElement(): void {
        this.editModal.show();
    }
}
