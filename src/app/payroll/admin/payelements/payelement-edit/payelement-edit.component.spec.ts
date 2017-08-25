import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayelementEditComponent } from './payelement-edit.component';

describe('PayelementEditComponent', () => {
  let component: PayelementEditComponent;
  let fixture: ComponentFixture<PayelementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayelementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayelementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
