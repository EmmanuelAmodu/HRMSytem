import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsgroupEditComponent } from './pmsgroup-edit.component';

describe('PmsgroupEditComponent', () => {
  let component: PmsgroupEditComponent;
  let fixture: ComponentFixture<PmsgroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsgroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsgroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
