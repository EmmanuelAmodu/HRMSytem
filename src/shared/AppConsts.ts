export class AppConsts {

    static readonly tenancyNamePlaceHolderInUrl = "{TENANCY_NAME}";

    static remoteServiceBaseUrl: string;
    static remoteServiceBaseUrlFormat: string;
    static appBaseUrl: string;
    static appBaseUrlFormat: string;
    static recaptchaSiteKey: string;
    static subscriptionExpireNootifyDayCount: number;

    static readonly userManagement = {
        defaultAdminUserName: 'admin'
    };

    static readonly localization = {
        defaultLocalizationSourceName: 'DTrack'
    };

    static readonly authorization = {
        encrptedAuthTokenName: 'enc_auth_token'
    };

    static readonly userSettings = {
        defaultCountrySortName: 'NG'
    };

    static readonly grid = {
        defaultPageSize: 10
    }
}
