import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhValueComponent } from './ph-value.component';

describe('PhValueComponent', () => {
  let component: PhValueComponent;
  let fixture: ComponentFixture<PhValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
