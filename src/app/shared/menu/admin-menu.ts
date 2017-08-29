import { SideBarMenu } from '@app/shared/layout/side-bar-menu';
import { SideBarMenuItem } from '@app/shared/layout/side-bar-menu-item';

export class AdminMenu {

    static readonly menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [
        new SideBarMenuItem("Dashboard", "Common.Tenant.Dashboard", "icon-home", "/app/main/dashboard"),
        new SideBarMenuItem("Administration", "", "icon-wrench", "", [
            new SideBarMenuItem("Roles", "Common.Administration.Roles", "icon-briefcase", "/app/admin/roles"),
            new SideBarMenuItem("Users", "Common.Administration.Users", "icon-people", "/app/admin/users"),
            new SideBarMenuItem("Languages", "Common.Administration.Languages", "icon-flag", "/app/admin/languages"),
            new SideBarMenuItem("AuditLogs", "Common.Administration.AuditLogs", "icon-lock", "/app/admin/auditLogs"),
            new SideBarMenuItem("Maintenance", "Common.Administration.Host.Maintenance", "icon-wrench", "/app/admin/maintenance"),
            new SideBarMenuItem("Settings", "Common.Administration.Tenant.Settings", "icon-settings", "/app/admin/tenantSettings")
        ]),
        new SideBarMenuItem("Payroll", "", "icon-people", "", [
            new SideBarMenuItem("Business Sectors", "Payroll.Administration.BusinessSector", "fa fa-asterisk", "/app/payroll/admin/sectors"),
            new SideBarMenuItem("Salary Banks", "Payroll.Administration.SalaryBank", "fa fa-bank", "/app/payroll/admin/banks"),
            new SideBarMenuItem("GL Accounts", "Payroll.Administration.GLAccount", "fa fa-asterisk", "/app/payroll/admin/glaccounts"),
            new SideBarMenuItem("Cost Centers", "Payroll.Administration.CostCenter", "fa fa-asterisk", "/app/payroll/admin/costcenters"),
            new SideBarMenuItem("Pay Elements", "Payroll.Administration.PayElement", "fa fa-circle", "/app/payroll/admin/payelements"),
            new SideBarMenuItem("Payroll Regions", "Payroll.Administration.Region", "fa fa-circle-o", "/app/payroll/admin/payrollregions"),
            new SideBarMenuItem("Customers", "Payroll.Administration.Customer", "icon-people", "/app/admin/organization-units"),
            new SideBarMenuItem("Personnel Group", "Payroll.Administration.PersonnelGroup", "fa fa-users", "/app/admin/organization-units"),
            new SideBarMenuItem("Pension Administrators", "Payroll.Administration.PensionAdministrator", "icon-settings", "/app/payroll/admin/pension-admins"),
            new SideBarMenuItem("Personnel Data", "Payroll.Administration.Personnel", "icon-people", "/app/admin/organization-units")
        ]),
        new SideBarMenuItem("Media Buying", "", "icon-briefcase", "", [
            new SideBarMenuItem("Roles", "Common.Administration.Roles", "icon-briefcase", "/app/admin/roles"),
            new SideBarMenuItem("Users", "Common.Administration.Users", "icon-people", "/app/admin/users"),
            new SideBarMenuItem("Languages", "Common.Administration.Languages", "icon-flag", "/app/admin/languages"),
            new SideBarMenuItem("AuditLogs", "Common.Administration.AuditLogs", "icon-lock", "/app/admin/auditLogs"),
            new SideBarMenuItem("Maintenance", "Common.Administration.Host.Maintenance", "icon-wrench", "/app/admin/maintenance"),
            new SideBarMenuItem("Settings", "Common.Administration.Tenant.Settings", "icon-settings", "/app/admin/tenantSettings")
        ]),
    ]);
}
