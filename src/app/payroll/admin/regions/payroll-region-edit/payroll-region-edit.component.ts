import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PayrollRegionServiceProxy, PayrollRegionEditDto } from "shared/service-proxies/service-proxies";
import { CostCenterEditDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'payroll-region-edit-modal',
    templateUrl: './payroll-region-edit.component.html',
    styleUrls: ['./payroll-region-edit.component.css']
})
export class PayrollRegionEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    payrollRegions: PayrollRegionEditDto = new PayrollRegionEditDto();
    name: string;

    constructor(
        injector: Injector,
        private _payrollRegionService: PayrollRegionServiceProxy
    ) {
        super(injector);
    }

    show(id?: number) :void {
        this.active = true;
        this.loading = true;
        this._payrollRegionService.getPayrollRegionForEdit(id).subscribe(result => {
            this.payrollRegions = result;
            this.name = result.name;
            this.loading = false;
            this.modal.show();
        })
    }

    setFocus(): void {
        $(this.nameInput.nativeElement).focus();
    }

    save(): void {
        let input = new PayrollRegionEditDto();
        input = this.payrollRegions;
        this.saving = true;
        this._payrollRegionService.createOrUpdatePayrollRegion(input)
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

