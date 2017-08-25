import { SideBarMenu } from '@app/shared/layout/side-bar-menu';
import { SideBarMenuItem } from '@app/shared/layout/side-bar-menu-item';

export class MediaBuyingMenu {

    static readonly menu: SideBarMenu = new SideBarMenu("MainMenu", "MainMenu", [
        new SideBarMenuItem("Media Dashboard", "Common.Tenant.Dashboard", "icon-home", "/app/main/dashboard"),
        new SideBarMenuItem("Tenants", "Common.Tenants", "icon-globe", "/app/admin/tenants"),
        new SideBarMenuItem("Editions", "Common.Editions", "icon-grid", "/app/admin/editions"),
        new SideBarMenuItem("Administration", "", "icon-wrench", "", [
            new SideBarMenuItem("OrganizationUnits", "Common.Administration.OrganizationUnits", "icon-layers", "/app/admin/organization-units"),
            new SideBarMenuItem("Roles", "Common.Administration.Roles", "icon-briefcase", "/app/admin/roles"),
            new SideBarMenuItem("Users", "Common.Administration.Users", "icon-people", "/app/admin/users"),
            new SideBarMenuItem("Languages", "Common.Administration.Languages", "icon-flag", "/app/admin/languages"),
            new SideBarMenuItem("AuditLogs", "Common.Administration.AuditLogs", "icon-lock", "/app/admin/auditLogs"),
            new SideBarMenuItem("Maintenance", "Common.Administration.Host.Maintenance", "icon-wrench", "/app/admin/maintenance"),
            new SideBarMenuItem("Settings", "Common.Administration.Host.Settings", "icon-settings", "/app/admin/hostSettings"),
            new SideBarMenuItem("Settings", "Common.Administration.Tenant.Settings", "icon-settings", "/app/admin/tenantSettings")
        ])
    ]);

}