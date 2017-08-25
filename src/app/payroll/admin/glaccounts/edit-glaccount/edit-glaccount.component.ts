import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GLAccountServiceProxy, GLAccountEditDto, ComboboxItemDto, GLAccountEditDtoSubType } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'edit-glaccount-modal',
    templateUrl: './edit-glaccount.component.html',
    styleUrls: ['./edit-glaccount.component.css']
})
export class EditGlaccountComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;
    @ViewChild('accountTypeCombobox') accountTypeCombobox: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    account: GLAccountEditDto = new GLAccountEditDto();
    accountSubTypes: ComboboxItemDto[] = [];

    constructor(
        injector: Injector,
        private _accountService: GLAccountServiceProxy
    ) {
        super(injector);
    }

    show(accountId?: number): void {
        this.active = true;
        this.loading = true;
        this._accountService.getGLAccountForEdit(accountId).subscribe(result => {
            this.account = result;
            this.accountSubTypes = result.subTypeComboBoxItems;
            if (!result.subType)
                this.account.subType = GLAccountEditDtoSubType._11;
            this.loading = false;
            this.modal.show();
        });
    }

    setFocus(): void {
        if (this.account.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = new GLAccountEditDto();
        input = this.account;
        this.saving = true;
        this._accountService.createOrUpdateGLAccount(input)
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
