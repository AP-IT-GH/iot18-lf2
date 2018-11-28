import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttDashboardComponent } from './mqtt-dashboard.component';

describe('MqttDashboardComponent', () => {
  let component: MqttDashboardComponent;
  let fixture: ComponentFixture<MqttDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MqttDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
