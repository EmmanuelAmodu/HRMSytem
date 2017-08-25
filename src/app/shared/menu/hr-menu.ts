import { SideBarMenu } from '@app/shared/layout/side-bar-menu';
import { SideBarMenuItem } from '@app/shared/layout/side-bar-menu-item';

export class HRMenu {

     static readonly menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [
        new SideBarMenuItem("HR Dashboard", "Common.Tenant.Dashboard", "icon-home", "/app/hr/dashboard"),
        new SideBarMenuItem("Leave Management", "Common.Tenant.Dashboard", "icon-globe", "/app/payroll/demogrid"),
        new SideBarMenuItem("Administration", "", "icon-wrench", "app/payroll/admin", [
            //new SideBarMenuItem("Personnel Group", "Payroll.Administration.PersonnelGroup", "fa fa-users", "/app/admin/organization-units"),
            //new SideBarMenuItem("Pension Administrators", "Payroll.Administration.PensionAdministrator", "icon-settings", "/app/payroll/admin/pension-admins"),
            //new SideBarMenuItem("Personnel Data", "Payroll.Administration.Personnel", "icon-people", "/app/admin/organization-units")
        ])
    ]);
}