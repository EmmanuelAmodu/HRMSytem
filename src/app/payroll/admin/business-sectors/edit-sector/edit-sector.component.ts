import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { BusinessSectorServiceProxy, BusinessSectorEditDto } from '@shared/service-proxies/service-proxies';
import { AppConsts } from '@shared/AppConsts';
import { PayrollComponentBase } from "app/payroll/shared/payroll-component-base";

@Component({
  selector: 'edit-sector-modal',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.css']
})
export class EditSectorComponent extends PayrollComponentBase {

    @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('codeInput') codeInput: ElementRef;
    @ViewChild('editModal') modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    private active: boolean = false;
    private saving: boolean = false;
    private loading: boolean = false;

    sector: BusinessSectorEditDto = new BusinessSectorEditDto();

    constructor(
        injector: Injector,
        private _sectorService: BusinessSectorServiceProxy
    ) {
        super(injector);
    }

    show(sectorId?: number): void {
        this.active = true;
        this.loading = true;
        this._sectorService.getBusinessSectorForEdit(sectorId).subscribe(result => {
            this.sector = result;
            this.loading = false;
            this.modal.show();
        });
    }

    setFocus(): void {
        if (this.sector.id)
            $(this.nameInput.nativeElement).focus();
        else
            $(this.codeInput.nativeElement).focus();
    }

    save(): void {
        var input = new BusinessSectorEditDto();
        input = this.sector;
        this.saving = true;
        this._sectorService.createOrUpdateBusinessSector(input)
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
