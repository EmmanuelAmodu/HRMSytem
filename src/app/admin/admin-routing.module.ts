import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AuditLogsComponent } from './audit-logs/audit-logs.component';
import { HostSettingsComponent } from './settings/host-settings.component';
import { TenantSettingsComponent } from './settings/tenant-settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageTextsComponent } from './languages/language-texts.component';
import { HostDashboardComponent } from './dashboard/host-dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'users', component: UsersComponent, data: { permission: 'Common.Administration.Users' } },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Common.Administration.Roles' } },
                    { path: 'auditLogs', component: AuditLogsComponent, data: { permission: 'Common.Administration.AuditLogs' } },
                    { path: 'maintenance', component: MaintenanceComponent, data: { permission: 'Common.Administration.Host.Maintenance' } },
                    { path: 'hostSettings', component: HostSettingsComponent, data: { permission: 'Common.Administration.Host.Settings' } },
                    { path: 'languages', component: LanguagesComponent, data: { permission: 'Common.Administration.Languages' } },
                    { path: 'languages/:name/texts', component: LanguageTextsComponent, data: { permission: 'Common.Administration.Languages.ChangeTexts' } },
                    { path: 'tenantSettings', component: TenantSettingsComponent, data: { permission: 'Common.Administration.Tenant.Settings' } },
                    { path: 'hostDashboard', component: HostDashboardComponent, data: { permission: 'Common.Administration.Host.Dashboard' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {

    constructor(private router: Router) {
        router.events.subscribe(() => {
            this.hideOpenDataTableDropdownMenus();
        });
    }

    hideOpenDataTableDropdownMenus(): void {
        var $dropdownMenus = $('.dropdown-menu.tether-element');
        $dropdownMenus.css({
            'display': 'none'
        });
    }

}
