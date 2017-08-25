import { Injectable, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { SideBarMenu } from '@app/shared/layout/side-bar-menu';
import { SideBarMenuItem } from '@app/shared/layout/side-bar-menu-item';
import { AdminMenu } from 'app/shared/menu/admin-menu';
import { PayrollMenu } from 'app/shared/menu/payroll-menu';
import { MediaBuyingMenu } from 'app/shared/menu/media-buying-menu';
import { HRMenu } from "app/shared/menu/hr-menu";

@Injectable()
export class SidebarMenuService implements OnInit {

    private subject: BehaviorSubject<SideBarMenu> = new BehaviorSubject<SideBarMenu>(AdminMenu.menu);
    menu: SideBarMenu;

    ngOnInit() {
        this.menu = AdminMenu.menu;
    }
    
    getActiveMenu(): Observable<SideBarMenu>  {
        return this.subject.asObservable();
    }

    setActiveMenu(module: string): void {
        var newmenu: SideBarMenu;
        if (module === "Human Resource")
            newmenu = HRMenu.menu;
        else if (module === "Payroll")
            newmenu = PayrollMenu.menu;
        else if (module === "Media Buying")
            newmenu = MediaBuyingMenu.menu;
        else
            newmenu = AdminMenu.menu;
        this.menu = newmenu;
        this.subject.next(newmenu);
    }
}

