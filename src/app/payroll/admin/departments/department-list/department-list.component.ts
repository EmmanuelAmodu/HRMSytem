import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { DepartmentServiceProxy, DepartmentListDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { DepartmentEditComponent } from "app/payroll/admin/departments/department-edit/department-edit.component";
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.css'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class DepartmentListComponent extends PayrollComponentBase {

    @ViewChild('editDepartmentModal') editModal: DepartmentEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;

    constructor(
        injector: Injector,
        private _departmentService: DepartmentServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getDepartments(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._departmentService.getDepartments(
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
            this._departmentService.getDepartmentForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('DepartmentDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._departmentService.deleteDepartment(id)
                                .subscribe(() => {
                                    this.getDepartments();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._departmentService.getDepartmentsToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createDepartment(): void {
        this.editModal.show();
    }
}
