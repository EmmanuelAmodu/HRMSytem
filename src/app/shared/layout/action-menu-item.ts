export class ActionMenuItem {
    name: string = '';
    permissionName: string = '';
    icon: string = '';
    route: string = '';
    items: ActionMenuItem[];

    constructor(name: string, permissionName: string, icon: string, route: string, items?: ActionMenuItem[]) {
        this.name = name;
        this.permissionName = permissionName;
        this.icon = icon;
        this.route = route;

        if (items === undefined) {
            this.items = [];    
        } else {
            this.items = items;
        }        
    }
}