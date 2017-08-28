import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SectorsListComponent } from "app/payroll/admin/business-sectors/sectors-list/sectors-list.component";
import { GlaccountListComponent } from "app/payroll/admin/glaccounts/glaccount-list/glaccount-list.component";
import { BankListComponent } from "app/payroll/admin/banks/bank-list/bank-list.component";
import { PensionAdminListComponent } from "app/payroll/admin/pension-admins/pension-admin-list/pension-admin-list.component";
import { PayelementListComponent } from "app/payroll/admin/payelements/payelement-list/payelement-list.component";
import { CostCenterListComponent } from "app/payroll/admin/costcenters/cost-center-list/cost-center-list.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'sectors', component: SectorsListComponent, data: { permission: 'Payroll.Administration.BusinessSector' } },
                    { path: 'glaccounts', component: GlaccountListComponent, data: { permission: 'Payroll.Administration.GLAccount' } },
                    { path: 'banks', component: BankListComponent, data: { permission: 'Payroll.Administration.SalaryBank' } },
                    { path: 'pension-admins', component: PensionAdminListComponent, data: { permission: 'Payroll.Administration.PensionAdministrator' } },
                    { path: 'payelements', component: PayelementListComponent, data: { permission: 'Payroll.Administration.PayElement' } },
                    { path: 'costcenters', component: CostCenterListComponent, data: { permission: 'Payroll.Administration.CostCenter' } }
                    //{ path: 'maintenance', component: MaintenanceComponent, data: { permission: 'Common.Administration.Host.Maintenance' } },
                    //{ path: 'hostSettings', component: HostSettingsComponent, data: { permission: 'Common.Administration.Host.Settings' } },
                    //{ path: 'editions', component: EditionsComponent, data: { permission: 'Common.Editions' } },
                    //{ path: 'languages', component: LanguagesComponent, data: { permission: 'Common.Administration.Languages' } },
                    //{ path: 'languages/:name/texts', component: LanguageTextsComponent, data: { permission: 'Common.Administration.Languages.ChangeTexts' } },
                    //{ path: 'tenants', component: TenantsComponent, data: { permission: 'Common.Tenants' } },
                    //{ path: 'organization-units', component: OrganizationUnitsComponent, data: { permission: 'Common.Administration.OrganizationUnits' } },
                    //{ path: 'tenantSettings', component: TenantSettingsComponent, data: { permission: 'Common.Administration.Tenant.Settings' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class PayrollAdminRoutingModule {

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.hideOpenJTableDropdownMenus();
    });
  }

  hideOpenJTableDropdownMenus(): void {
    var $dropdownMenus = $('.dropdown-menu.tether-element');
    $dropdownMenus.css({
      'display': 'none'
    });
  }

}
