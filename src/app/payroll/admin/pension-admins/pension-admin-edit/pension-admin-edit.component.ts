import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PensionAdminServiceProxy, PensionAdminEditDto, AddressEditDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddressComponent } from "app/shared/common/address/address.component";
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
  selector: 'edit-pension-admin-modal',
  templateUrl: './pension-admin-edit.component.html',
  styleUrls: ['./pension-admin-edit.component.css']
})
export class PensionAdminEditComponent extends PayrollComponentBase implements OnChanges {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    private editForm: FormGroup
    private data: PensionAdminEditDto = new PensionAdminEditDto();
    private address: AddressEditDto = new AddressEditDto();

    private active: boolean = false;

    private saving: boolean = false;
    private loading: boolean = false;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private _pensionAdminService: PensionAdminServiceProxy
    ) {
        super(injector);
        this.createForm();
    }

    createForm() {
        this.editForm = this.fb.group({
            pensionAdminCode: [undefined, [Validators.required, Validators.maxLength(15)]],
            name: [undefined, [Validators.required, Validators.maxLength(128)]],
            custodianName: [undefined, [Validators.required, Validators.maxLength(128)]],
            address: this.createAddressForm()
        });
    }
    createAddressForm(): FormGroup {
        return this.fb.group({
            streetLine1: new FormControl(undefined),
            streetLine2: new FormControl(undefined),
            cityId: new FormControl(undefined),
            stateId: new FormControl(undefined),
            postalCode: new FormControl(undefined),
            countryId: new FormControl(undefined)
        });
    }
    ngOnChanges() {
    }

    show(pensionAdminId?: number): void {
        this.active = true;
        this.loading = true;
        this._pensionAdminService.getPensionAdminForEdit(pensionAdminId).subscribe(result => {
            this.setValues(result);
            this.loading = false;
            this.modal.show();
        });
    }

    setValues(value: PensionAdminEditDto) {
        var notNew: boolean = (value.pensionAdminCode) ? true : false;
        this.data = value;
        this.address = value.address;

        this.editForm.reset({
            bankCode: { value: value.pensionAdminCode, disabled: notNew },
            name: value.name,
            address: value.address || new AddressEditDto()
        });
    }
    setFocus(): void {
        if (this.data.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = this.data;
        var address = this.address;

        const formModel = this.editForm.getRawValue(); //to include disabled controls

        input.pensionAdminCode = formModel.pensionAdminCode as string;
        input.name = formModel.name as string;
        input.custodianName = formModel.custodianName as string;

        address = Object.assign(address, formModel.address as AddressEditDto);

        this.saving = true;
        this._pensionAdminService.createOrUpdatePensionAdmin(input)
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
