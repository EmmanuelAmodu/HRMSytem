import { Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '@shared/AppConsts';

export abstract class PayrollComponentBase extends AppComponentBase {

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.localizationSourceName = "Payroll";
    }
    
}