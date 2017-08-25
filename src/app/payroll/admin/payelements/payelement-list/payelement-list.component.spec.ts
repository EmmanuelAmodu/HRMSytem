import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayelementListComponent } from './payelement-list.component';

describe('PayelementListComponent', () => {
  let component: PayelementListComponent;
  let fixture: ComponentFixture<PayelementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayelementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayelementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
