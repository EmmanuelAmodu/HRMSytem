import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsgroupListComponent } from './pmsgroup-list.component';

describe('PmsgroupListComponent', () => {
  let component: PmsgroupListComponent;
  let fixture: ComponentFixture<PmsgroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsgroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
