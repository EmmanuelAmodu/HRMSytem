import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PayElementServiceProxy, PayElementEditDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
  selector: 'edit-payelement-modal',
  templateUrl: './payelement-edit.component.html',
  styleUrls: ['./payelement-edit.component.css']
})
export class PayelementEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;
    //@ViewChild('usageComboBox') usageComboBox: ElementRef;
    //@ViewChild('behaviourComboBox') behaviourComboBox: ElementRef;
    //@ViewChild('glAccountComboBox') glAccountComboBox: ElementRef;
    //@ViewChild('glAccount2ComboBox') glAccount2ComboBox: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    payelement: PayElementEditDto = new PayElementEditDto();
    itemGroupList: ComboboxItemDto[] = [];
    reportCodesList: ComboboxItemDto[] = [];
    usageList: ComboboxItemDto[] = [];
    behaviourList: ComboboxItemDto[] = [];
    glAccountList: ComboboxItemDto[] = [];
    glAccount2List: ComboboxItemDto[] = [];

    constructor(
        injector: Injector,
        private _payelementService: PayElementServiceProxy
    ) {
        super(injector);
    }

    show(accountId?: number): void {
        this.active = true;
        this.loading = true;
        this._payelementService.getPayElementForEdit(accountId).subscribe(result => {
            this.payelement = result;
            this.itemGroupList = result.payItemGroupComboBoxItems;
            this.usageList = result.usageComboBoxItems;
            this.behaviourList = result.behaviourComboBoxItems;
            this.filterGLAccount(result.payItemGroupId);
            this.reportCodesList = result.reportCodeComboBoxItems;
            this.loading = false;
            this.modal.show();
        });
    }

    filterGLAccount(Item: number): void {
        this.loading = true;
        this._payelementService.getGLAccountComboBoxItems(Item).subscribe(result => {
            this.glAccountList = result.items;
            this.glAccount2List = result.items;
            this.loading = false;
        })
    }

    setFocus(): void {
        if (this.payelement.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        let input = new PayElementEditDto();
        input = this.payelement;
        this.saving = true;
        this._payelementService.createOrUpdatePayElement(input)
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
