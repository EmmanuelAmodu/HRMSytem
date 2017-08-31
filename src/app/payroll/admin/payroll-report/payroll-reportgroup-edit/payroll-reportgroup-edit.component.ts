import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PayrollReportGroupServiceProxy, PayrollReportGroupEditDto } from "shared/service-proxies/service-proxies";
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'payroll-reportgroup-edit',
    templateUrl: './payroll-reportgroup-edit.component.html',
    styleUrls: ['./payroll-reportgroup-edit.component.css']
})
export class PayrollReportgroupEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('totalCaptionInput') totalCaptionInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    payrollReportGroup: PayrollReportGroupEditDto = new PayrollReportGroupEditDto();
    name: string;
    totalCaption: string;

    constructor(
        injector: Injector,
        private _payrollReportGroupService: PayrollReportGroupServiceProxy
    ) {
        super(injector);
    }

    show(id?: number): void {
        this.active = true;
        this.loading = true;
        this._payrollReportGroupService.getPayrollReportGroupForEdit(id).subscribe(result => {
            this.payrollReportGroup = result;
            this.name = result.name;
            this.totalCaption = result.totalCaption;
            this.loading = false;
            this.modal.show();
        })
    }

    setFocus(): void {
        if (this.payrollReportGroup.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.totalCaptionInput.nativeElement).focus();
    }

    save(): void {
        let input = new PayrollReportGroupEditDto();
        input = this.payrollReportGroup;
        this.saving = true;
        this._payrollReportGroupService.createOrUpdatePayrollReportGroup(input)
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
