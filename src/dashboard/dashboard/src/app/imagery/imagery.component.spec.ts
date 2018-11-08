import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageryComponent } from './imagery.component';

describe('ImageryComponent', () => {
  let component: ImageryComponent;
  let fixture: ComponentFixture<ImageryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
