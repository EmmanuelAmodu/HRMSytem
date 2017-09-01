import { Component, OnInit, AfterViewInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppConsts } from '@shared/AppConsts';
import { CustomerServiceProxy, CustomerListDto } from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { DataTable } from 'primeng/components/datatable/datatable';
import { Paginator } from 'primeng/components/paginator/paginator';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { CustomerEditComponent } from "app/payroll/admin/customers/customer-edit/customer-edit.component";

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css'],
    providers: [CustomerServiceProxy],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CustomerListComponent extends PayrollComponentBase {

    @ViewChild('editPensionAdminModal') editModal: CustomerEditComponent;
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('paginator') paginator: Paginator;
    input: CustomerListDto;
    businessSectorId: number;

    constructor(
        injector: Injector,
        private _customerService: CustomerServiceProxy,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCustomers(event?: LazyLoadEvent): void {
        this.primengDatatableHelper.showLoadingIndicator();
        this._customerService.getCustomers(
            "",
            this.businessSectorId,
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
            this._customerService.getCustomerForEdit(id).subscribe(result => {
                this.message.confirm(
                    this.l('GLAccountDeleteWarningMessage', result.name),
                    (isConfirmed) => {
                        if (isConfirmed) {
                            this._customerService.deleteCustomer(id)
                                .subscribe(() => {
                                    this.getCustomers();
                                    this.notify.success(this.l('SuccessfullyDeleted'));
                                });
                        }
                    }
                );
            });
        }
    }

    exportToExcel(): void {
        this._customerService.getCustomersToExcel()
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }

    createCustomer(): void {
        this.editModal.show();
    }
}

