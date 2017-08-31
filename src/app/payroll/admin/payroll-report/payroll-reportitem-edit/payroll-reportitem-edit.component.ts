import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PayrollReportItemServiceProxy, PayrollReportItemEditDto } from "shared/service-proxies/service-proxies";
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'payroll-reportitem-edit',
    templateUrl: './payroll-reportitem-edit.component.html',
    styleUrls: ['./payroll-reportitem-edit.component.css']
})
export class PayrollReportitemEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('ordinalPositionInput') ordinalPositionInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    payrollReportItem: PayrollReportItemEditDto = new PayrollReportItemEditDto();
    name: string;
    ordinalPosition: number;

    constructor(
        injector: Injector,
        private _payrollReportItemService: PayrollReportItemServiceProxy
    ) {
        super(injector);
    }

    show(id?: number) :void {
        this.active = true;
        this.loading = true;
        this._payrollReportItemService.getPayrollReportItemForEdit(id).subscribe(result => {
            this.payrollReportItem = result;
            this.name = result.name;
            this.ordinalPosition = result.ordinalPosition;
            this.loading = false;
            this.modal.show();
        })
    }

    setFocus(): void {
        if (this.payrollReportItem.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.ordinalPositionInput.nativeElement).focus();
    }

    save(): void {
        let input = new PayrollReportItemEditDto();
        input = this.payrollReportItem;
        this.saving = true;
        this._payrollReportItemService.createOrUpdatePayrollReportItem(input)
            .finally(() => this.saving = false)
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

}
