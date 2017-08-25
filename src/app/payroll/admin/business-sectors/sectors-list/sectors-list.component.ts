import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { BusinessSectorServiceProxy, BusinessSectorListDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { EditSectorComponent } from "app/payroll/admin/business-sectors/edit-sector/edit-sector.component";
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
  selector: 'sectors-list',
  templateUrl: './sectors-list.component.html',
  styleUrls: ['./sectors-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class SectorsListComponent extends PayrollComponentBase {

    @ViewChild('editSectorModal') editModal: EditSectorComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _sectorService: BusinessSectorServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getSectors(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._sectorService.getBusinessSectors(
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
            this._sectorService.getBusinessSectorForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('BusinessSectorDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._sectorService.deleteBusinessSector(id)
                                .subscribe(() => {
                                    this.getSectors();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._sectorService.getBusinessSectorsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createSector(): void {
        this.editModal.show();
    }
}
