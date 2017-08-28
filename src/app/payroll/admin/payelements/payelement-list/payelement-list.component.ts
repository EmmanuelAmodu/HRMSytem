import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PayElementListDto, PayElementServiceProxy } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { PayelementEditComponent } from "app/payroll/admin/payelements/payelement-edit/payelement-edit.component";

@Component({
  selector: 'payelement-list',
  templateUrl: './payelement-list.component.html',
  styleUrls: ['./payelement-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class PayelementListComponent extends PayrollComponentBase{

    @ViewChild('editPayElementModal') editModal: PayelementEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _payelementService: PayElementServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getPayElements(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._payelementService.getPayElements(
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
            this._payelementService.getPayElementForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('PayElementDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._payelementService.deletePayElement(id)
                                .subscribe(() => {
                                    this.getPayElements();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._payelementService.getPayElementsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPayElement(): void {
        this.editModal.show();
    }
}

