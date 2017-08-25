import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
//import { HRDashboardComponent } from "app/hr/dashboard/hr-dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    //{ path: 'dashboard', component: HRDashboardComponent, data: { permission: 'Common.Tenant.Dashboard' } },
                    {
                        path: 'admin',
                        loadChildren: 'app/hr/admin/hr-admin.module#HRAdminModule', //Lazy load admin module
                        data: { preload: true }
                    },

                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class HRRoutingModule { }