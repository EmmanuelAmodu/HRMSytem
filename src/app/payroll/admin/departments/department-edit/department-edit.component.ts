import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DepartmentServiceProxy, DepartmentEditDto, ComboboxItemDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
    selector: 'department-edit',
    templateUrl: './department-edit.component.html',
    styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;
    @ViewChild('accountTypeCombobox') accountTypeCombobox: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    department: DepartmentEditDto = new DepartmentEditDto();
    costCenterComboBoxItems: ComboboxItemDto[] = [];

    constructor(
        injector: Injector,
        private _departmentService: DepartmentServiceProxy
    ) {
        super(injector);
    }

    show(accountId?: number): void {
        this.active = true;
        this.loading = true;
        this._departmentService.getDepartmentForEdit(accountId).subscribe(result => {
            this.department = result;
            this.costCenterComboBoxItems = result.costCenterComboBoxItems;
            this.loading = false;
            this.modal.show();
        });
    }

    setFocus(): void {
        if (this.department.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = new DepartmentEditDto();
        input = this.department;
        console.log(input);
        this.saving = true;
        this._departmentService.createOrUpdateDepartment(input)
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

