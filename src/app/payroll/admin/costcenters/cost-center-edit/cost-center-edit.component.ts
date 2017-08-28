import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CostCenterServiceProxy, CostCenterEditDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'cost-center-edit-modal',
    templateUrl: './cost-center-edit.component.html',
    styleUrls: ['./cost-center-edit.component.css']
})
export class CostCenterEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    costCenter: CostCenterEditDto = new CostCenterEditDto();
    name: string;
    costCenterCode: string;

    constructor(
        injector: Injector,
        private _costCenterelementService: CostCenterServiceProxy
    ) {
        super(injector);
    }

    show(id?: number) :void {
        this.active = true;
        this.loading = true;
        this._costCenterelementService.getCostCenterForEdit(id).subscribe(result => {
            this.costCenter = result;
            this.name = result.name;
            this.costCenterCode = result.costCenterCode;
            this.loading = false;
            this.modal.show();
        })
    }

    setFocus(): void {
        if (this.costCenter.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        let input = new CostCenterEditDto();
        input = this.costCenter;
        this.saving = true;
        this._costCenterelementService.createOrUpdateCostCenter(input)
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
