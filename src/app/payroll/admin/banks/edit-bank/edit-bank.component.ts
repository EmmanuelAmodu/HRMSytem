import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SalaryBankServiceProxy, BankEditDto, AddressEditDto} from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddressComponent } from "app/shared/common/address/address.component";
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'edit-bank-modal',
    templateUrl: './edit-bank.component.html',
    styleUrls: ['./edit-bank.component.css']
})
export class EditBankComponent extends PayrollComponentBase implements OnChanges {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    private bankForm: FormGroup
    private bank: BankEditDto = new BankEditDto();
    private address: AddressEditDto = new AddressEditDto();

    private active: boolean = false;

    private saving: boolean = false;
    private loading: boolean = false;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private _bankService: SalaryBankServiceProxy
    ) {
        super(injector);
        this.createForm();
    }

    createForm() {
        this.bankForm = this.fb.group({
            bankCode: [undefined, [Validators.required, Validators.maxLength(15)]],
            name: [undefined, [Validators.required, Validators.maxLength(128)]],
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

    show(bankid?: number): void {
        this.active = true;
        this.loading = true;
        this._bankService.getBankForEdit(bankid).subscribe(result => {
            this.setValues(result);
            this.loading = false;
            this.modal.show();
        });
    }

    setValues(value: BankEditDto) {
        var notNew: boolean = (value.bankCode) ? true : false;
        this.bank = value;
        this.address = value.address;

        this.bankForm.reset({
            bankCode: { value: value.bankCode, disabled: notNew },
            name: value.name,
            address: value.address || new AddressEditDto()
        });
    }
    setFocus(): void {
        if (this.bank.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = this.bank;
        var address = this.address;

        const formModel = this.bankForm.getRawValue(); //to include disabled controls

        input.bankCode = formModel.bankCode as string;
        input.name = formModel.name as string;

        address = Object.assign(address, formModel.address as AddressEditDto);

        this.saving = true;
        this._bankService.createOrUpdateBank(input)
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
