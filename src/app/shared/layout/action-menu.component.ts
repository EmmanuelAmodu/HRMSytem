import { Component, Injector, OnInit } from '@angular/core';
import { ActionMenu } from './action-menu';
import { ActionMenuItem } from './action-menu-item';
import { SidebarMenuService } from '@app/shared/menu/sidebar-menu-service';

import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    templateUrl: './action-menu.component.html',
    selector: 'action-menu'
})
export class ActionMenuComponent extends AppComponentBase implements OnInit {

    public selectedItem: string;
    actionTitle: string;

    ngOnInit() {
        this.actionTitle = "General Admin";
    }

    constructor(injector: Injector, public permission: PermissionCheckerService, private sidebarMenuService: SidebarMenuService) {
        super(injector);
    }
    
    menu: ActionMenu = new ActionMenu("ActionMenu", "ActionMenu", [
        new ActionMenuItem("General Admin", "Modules.Common", "icon-home", ""),
        //new ActionMenuItem("Financial", "Modules.Financial", "icon-home", ""),
        //new ActionMenuItem("Human Resource", "Modules.HR", "icon-home", ""),
        new ActionMenuItem("Payroll", "Modules.Payroll", "icon-home", ""),
        new ActionMenuItem("Media Buying", "Modules.MediaBuying", "icon-grid", "")
    ]);

    selectModule(module: string) {
        this.actionTitle = module;
        this.sidebarMenuService.setActiveMenu(module);
    }
    checkChildMenuItemPermission(menuItem): boolean {

        for (var i = 0; i < menuItem.items.length; i++) {
            var subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName && this.permission.isGranted(subMenuItem.permissionName)) {
                return true;
            }
            
            if (subMenuItem.items && subMenuItem.items.length) {
                return this.checkChildMenuItemPermission(subMenuItem);
            } else if (!subMenuItem.permissionName) {
                return true;
            }
        }

        return false;
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            //return this.permission.isGranted(menuItem.permissionName);
            return true;
        }

        if (menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return true;
    }

}