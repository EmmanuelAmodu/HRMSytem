import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Route } from '@angular/router';
import { PayrollDashboardComponent } from './dashboard/payroll-dashboard.component';
import { DemoGridComponent } from './demogrid/demo-grid.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'dashboard', component: PayrollDashboardComponent, data: { permission: 'Common.Tenant.Dashboard' } },
                    { path: 'demogrid', component: DemoGridComponent, data: { permission: 'Common.Tenant.Dashboard' } },
                    {
                        path: 'admin',
                        loadChildren: 'app/payroll/admin/payroll-admin.module#PayrollAdminModule', //Lazy load admin module
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
export class PayrollRoutingModule { }