import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { PMSgroupServiceProxy , PMSgroupListDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { PmsgroupEditComponent } from "app/payroll/admin/pmsgroups/pmsgroup-edit/pmsgroup-edit.component";
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'pmsgroup-list',
    templateUrl: './pmsgroup-list.component.html',
    styleUrls: ['./pmsgroup-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class PmsgroupListComponent extends PayrollComponentBase {

    @ViewChild('editPMSgroupModal') editModal: PmsgroupEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _pmsgroupService: PMSgroupServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getPMSgroups(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._pmsgroupService.getPMSgroups(
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
        this.editModal.show(id);
    }

    deleteRecord(id: number): void {
        if (id) {
            this._pmsgroupService.getPMSgroupForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('PMSgroupDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._pmsgroupService.deletePMSgroup(id)
                                .subscribe(() => {
                                    this.getPMSgroups();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._pmsgroupService.getPMSgroupsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createPMSgroup(): void {
        this.editModal.show();
    }
}
