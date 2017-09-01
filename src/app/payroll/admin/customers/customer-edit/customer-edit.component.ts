import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { CustomerServiceProxy, CustomerEditDto, AddressEditDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddressComponent } from "app/shared/common/address/address.component";
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'customer-edit',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent extends PayrollComponentBase implements OnChanges {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    private editForm: FormGroup
    private customer: CustomerEditDto = new CustomerEditDto();
    private address: AddressEditDto = new AddressEditDto();
    businessSectorComboBoxItems: ComboboxItemDto[];

    private active: boolean = false;

    private saving: boolean = false;
    private loading: boolean = false;

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private _customerService: CustomerServiceProxy
    ) {
        super(injector);
        this.createForm();
    }

    createForm() {
        this.editForm = this.fb.group({
            customerNumber: [undefined, [Validators.required, Validators.maxLength(15)]],
            name: [undefined, [Validators.required, Validators.maxLength(128)]],
            contact: [undefined, [Validators.required, Validators.maxLength(128)]],
            emailAddress: [undefined, [Validators.required, Validators.maxLength(128)]],
            telephoneNumber: [undefined, [Validators.required, Validators.maxLength(128)]],
            execContact: [undefined, [Validators.maxLength(128)]],
            execEmailAddress: [undefined, [Validators.maxLength(128)]],
            execPhoneNumber: [undefined, [Validators.maxLength(128)]],
            financeContact: [undefined, [Validators.maxLength(128)]],
            financeEmailAddress: [undefined, [Validators.maxLength(128)]],
            financePhoneNumber: [undefined, [Validators.maxLength(128)]],
            businessSectorId: [undefined, [Validators.required, Validators.maxLength(128)]],
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

    show(id?: number): void {
        this.active = true;
        this.loading = true;
        this._customerService.getCustomerForEdit(id).subscribe(result => {
            this.setValues(result);
            this.businessSectorComboBoxItems = result.businessSectorComboBoxItems;
            this.loading = false;
            this.modal.show();
        });
    }

    setValues(value: CustomerEditDto) {
        var notNew: boolean = (value.customerNumber) ? true : false;
        this.customer = value;
        this.address = value.address;

        this.editForm.reset({
            name: value.name,
            address: value.address || new AddressEditDto()
        });
    }

    setFocus(): void {
        if (this.customer.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = this.customer;
        var address = this.address;
        const formModel = this.editForm.getRawValue(); //to include disabled controls

        //input.customerNumber = formModel.customerNumber as string;
        //input.name = formModel.name as string;
        //input.contact = formModel.contact as string;
        //input.emailAddress = formModel.emailAddress as string;
        //input.telephoneNumber = formModel.telephoneNumber as string;
        //input.execContact = formModel.execContact as string;
        //input.execEmailAddress = formModel.execEmailAddress as string;
        //input.execPhoneNumber = formModel.execPhoneNumber as string;
        //input.financeContact = formModel.financeContact as string;
        //input.financeEmailAddress = formModel.financeEmailAddress as string;
        //input.financePhoneNumber = formModel.financePhoneNumber as string;
        //input.businessSectorComboBoxItems = this.businessSectorComboBoxItems;
        //input.businessSectorId = formModel.businessSectorComboBox as number;

        input = Object.assign(this.customer, formModel as CustomerEditDto);
        address = Object.assign(address, formModel.address as AddressEditDto);
        input.address = address;

        this.saving = true;
        this._customerService.createOrUpdateCustomer(input)
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
