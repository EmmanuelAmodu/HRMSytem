import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PMSgroupServiceProxy, CustomerServiceProxy, PMSgroupEditDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";
import { FormControl } from "@angular/forms";
import { DataTable } from 'primeng/components/datatable/datatable';

@Component({
    selector: 'pmsgroup-edit',
    templateUrl: './pmsgroup-edit.component.html',
    styleUrls: ['./pmsgroup-edit.component.css']
})
export class PmsgroupEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    public active: boolean = false;
    public saving: boolean = false;
    public loading: boolean = false;

    filterCustomerText: string;
    customerComboboxItems: ComboboxItemDto[] = [];
    customerItem: ComboboxItemDto = new ComboboxItemDto();

    pmsgroup: PMSgroupEditDto = new PMSgroupEditDto();
    salaryCostCenterComboBoxItems: ComboboxItemDto[] = [];
    staffModeComboBoxItems: ComboboxItemDto[] = [];
    salaryAccountComboBoxItems: ComboboxItemDto[] = [];
    salaryModelComboBoxItems: ComboboxItemDto[] = [];
    taxModeComboBoxItems: ComboboxItemDto[] = []; 
    regionComboBoxItems: ComboboxItemDto[] = [];

    constructor(
        injector: Injector,
        private _pmsgroupService: PMSgroupServiceProxy,
        private _customerService: CustomerServiceProxy
    ) {
        super(injector);
    }

    getCustomerComboboxItems(NameFilter: string, BusinessSectorId?: number, Sorting?: string, MaxResultCount?: number, SkipCount?: number) {
        this._customerService.getCustomerComboBoxItems(
            NameFilter, BusinessSectorId, Sorting, MaxResultCount, SkipCount
        ).subscribe(result => {
            this.customerComboboxItems = result.items;
        });
    }

    loadCustomerAutocomplete(businessSectorIdInput: FormControl) {
        let value = businessSectorIdInput.value;
        if (value.length > 0)
            this.getCustomerComboboxItems(value);
    }

    selectCustomer(customer: ComboboxItemDto) {
        this.customerItem = customer;
        this.pmsgroup.customerId = Number(this.customerItem.value);
        this.customerComboboxItems = [];
    }

    show(accountId?: number): void {
        this.active = true;
        this.loading = true;
        this._pmsgroupService.getPMSgroupForEdit(accountId).subscribe(result => {
            this.pmsgroup = result;
            this.salaryCostCenterComboBoxItems = result.salaryCostCenterComboBoxItems;
            this.staffModeComboBoxItems = result.staffModeComboBoxItems;
            this.salaryAccountComboBoxItems = result.salaryAccountComboBoxItems;
            this.salaryModelComboBoxItems = result.salaryModelComboBoxItems;
            this.taxModeComboBoxItems = result.taxModeComboBoxItems;
            this.regionComboBoxItems = result.regionComboBoxItems;
            this.loading = false;
            this.modal.show();
            this.purgeValuesForZeros(this.pmsgroup, accountId);
        });
    }

    purgeValuesForZeros(pmsgroup, accountId?: number): void {
        if (!accountId) {
            this.customerItem = new ComboboxItemDto();
            for (let i in pmsgroup) {
                if (pmsgroup[i] === 0)
                    pmsgroup[i] = undefined;
            }
        }
    }

    setFocus(): void {
        if (this.pmsgroup.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = new PMSgroupEditDto();
        input = this.pmsgroup;
        this.saving = true;
        this._pmsgroupService.createOrUpdatePMSgroup(input)
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

