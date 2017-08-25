import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'grid-action-menu',
    styleUrls: ["./grid-action-menu.component.css"],
    //template: `
    //    <input type="text" id="dropdown1" ej-dropdownlist [width]="width" [dataSource]="values" 
    //        [fields]="fieldsvalues" [watermarkText]="watermark" />`
//  //  template: `
//  //  <ul>
//  //    <li *ngFor="let item of values" (click)="selectItem(item.value)">{{item.text}}</li>
//  //  </ul>
//  //`
    template:
`
      <div class="btn-group">
          <a class="btn green btn-circle btn-sm" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> Actions
              <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu" role="menu">
            <li *ngFor="let item of values" (click)="selectItem(item.value)">{{item.text}}</li>
          </ul>
      </div>
`
})
export class GridRowActionMenuComponent {
    @Input()
    values: Object[];

    @Input() itemId: number = 0;

    @Output()
    select: EventEmitter<any>;

    fieldsvalues: Object;
    watermark: string;
    width: number;

    constructor() {
        this.select = new EventEmitter();
        this.values = [
            { text: "Edit", value: "Edit" },
            { text: "Delete", value: "Delete" }
        ];
        this.fieldsvalues = { text: "text", value: "value" };
        this.watermark = "action";
        this.width = 80;
    }

    selectItem(value) {
        this.select.emit(value);
    }
}

//export class GridRowActionMenuItem {
//    value: string;
//    label: string;

//    constructor(value: string, label: string) {
//        this.value = value;
//        this.label = label;
//    }
//}