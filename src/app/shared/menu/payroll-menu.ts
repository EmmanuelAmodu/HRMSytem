import { SideBarMenu } from '@app/shared/layout/side-bar-menu';
import { SideBarMenuItem } from '@app/shared/layout/side-bar-menu-item';

export class PayrollMenu {

     static readonly menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [
        new SideBarMenuItem("Payroll Dashboard", "Common.Tenant.Dashboard", "icon-home", "/app/payroll/dashboard"),
        new SideBarMenuItem("Payroll Demo Grid", "Common.Tenant.Dashboard", "icon-home", "/app/payroll/demogrid"),
        new SideBarMenuItem("Post Variables", "Common.Tenant.Dashboard", "icon-globe", "/app/payroll/demogrid"),
        new SideBarMenuItem("Loan Adjustment", "Common.Tenant.Dashboard", "icon-grid", "/app/payroll/demogrid"),
        new SideBarMenuItem("Administration", "", "icon-wrench", "app/payroll/admin", [
            new SideBarMenuItem("Business Sectors", "Payroll.Administration.BusinessSector", "fa fa-asterisk", "/app/payroll/admin/sectors"),
            new SideBarMenuItem("Salary Banks", "Payroll.Administration.SalaryBank", "fa fa-bank", "/app/payroll/admin/banks"),
            new SideBarMenuItem("GL Accounts", "Payroll.Administration.GLAccount", "fa fa-asterisk", "/app/payroll/admin/glaccounts"),
            new SideBarMenuItem("Cost Centers", "Payroll.Administration.CostCenter", "fa fa-asterisk", "/app/payroll/admin/costcenters"),
            new SideBarMenuItem("Pay Elements", "Payroll.Administration.PayElement", "fa fa-circle", "/app/payroll/admin/payelements"),
            new SideBarMenuItem("Payroll Regions", "Payroll.Administration.Region", "fa fa-circle-o", "/app/admin/organization-units"),
            new SideBarMenuItem("Customers", "Payroll.Administration.Customer", "icon-people", "/app/admin/organization-units"),
            new SideBarMenuItem("Personnel Group", "Payroll.Administration.PersonnelGroup", "fa fa-users", "/app/admin/organization-units"),
            new SideBarMenuItem("Pension Administrators", "Payroll.Administration.PensionAdministrator", "icon-settings", "/app/payroll/admin/pension-admins"),
            new SideBarMenuItem("Personnel Data", "Payroll.Administration.Personnel", "icon-people", "/app/admin/organization-units")
        ])
    ]);
}
