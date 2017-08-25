import { Component, ViewEncapsulation } from '@angular/core';
import { NorthwindService } from './northwind.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    selector: 'demo-grid',
    templateUrl: './demo-grid.component.html',
    animations: [appModuleAnimation()],
    providers: [NorthwindService]
})
export class DemoGridComponent {
    public gridData: any;
    public filterType;
    public editSettings;
    public toolbarItems;
    //public groupedColumns: Array<string>;
    constructor(private service: NorthwindService) {
        //this.groupedColumns = ['CustomerID'];
        this.gridData = service.getOrders();
        //this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
        //this.toolbarItems = { showToolbar: true, toolbarItems: ["add", "edit", "delete", "update", "cancel"] };
        //this.filterType = { filterType: "menu" };
        this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, editMode: "dialog" };
        this.toolbarItems = { showToolbar: true, toolbarItems: ["add", "edit", "delete", "update", "cancel"] };
    }
}