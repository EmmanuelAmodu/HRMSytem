import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.AuditLogServiceProxy,
        ApiServiceProxies.CachingServiceProxy,
        ApiServiceProxies.ChatServiceProxy,
        ApiServiceProxies.CommonLookupServiceProxy,
        ApiServiceProxies.EditionServiceProxy,
        ApiServiceProxies.FriendshipServiceProxy,
        ApiServiceProxies.HostSettingsServiceProxy,
        ApiServiceProxies.LanguageServiceProxy,
        ApiServiceProxies.NotificationServiceProxy,
        ApiServiceProxies.OrganizationUnitServiceProxy,
        ApiServiceProxies.PermissionServiceProxy,
        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.TenantDashboardServiceProxy,
        ApiServiceProxies.TenantSettingsServiceProxy,
        ApiServiceProxies.TimingServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.UserLinkServiceProxy,
        ApiServiceProxies.UserLoginServiceProxy,
        ApiServiceProxies.WebLogServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.TenantRegistrationServiceProxy,
        ApiServiceProxies.HostDashboardServiceProxy,
        ApiServiceProxies.PaymentServiceProxy,
        ApiServiceProxies.CountryServiceProxy,
        ApiServiceProxies.StateServiceProxy,
        ApiServiceProxies.CityServiceProxy,
        ApiServiceProxies.SalaryBankServiceProxy,
        ApiServiceProxies.BusinessSectorServiceProxy,
        ApiServiceProxies.GLAccountServiceProxy,
        ApiServiceProxies.CostCenterServiceProxy,
        ApiServiceProxies.PayElementServiceProxy,
        ApiServiceProxies.PensionAdminServiceProxy,
        ApiServiceProxies.PayrollRegionServiceProxy,
        ApiServiceProxies.PayrollReportGroupServiceProxy,
        ApiServiceProxies.PayrollReportItemServiceProxy,
        ApiServiceProxies.CustomerServiceProxy



    ]
})
export class ServiceProxyModule { }
