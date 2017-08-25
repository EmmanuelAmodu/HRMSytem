import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    //{ path: 'banks', component: BankListComponent, data: { permission: 'Payroll.Administration.SalaryBank' } },
                    //{ path: 'pension-admins', component: PensionAdminListComponent, data: { permission: 'Payroll.Administration.PensionAdministrator' } }
                    //{ path: 'sectors', component: SectorsListComponent, data: { permission: 'Common.Administration.BusinessSector' } },
                    //{ path: 'glaccounts', component: GlaccountListComponent, data: { permission: 'Common.Administration.GLAccount' } }
                    //{ path: 'auditLogs', component: AuditLogsComponent, data: { permission: 'Common.Administration.AuditLogs' } },
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
export class HRAdminRoutingModule {

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