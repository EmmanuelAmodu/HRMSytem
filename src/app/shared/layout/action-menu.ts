import {ActionMenuItem} from './action-menu-item';

export class ActionMenu {
    name: string = '';
    displayName: string = '';
    items: ActionMenuItem[];

    constructor(name: string, displayName: string, items: ActionMenuItem[]) {
        this.name = name;
        this.displayName = displayName;
        this.items = items;
    }
}