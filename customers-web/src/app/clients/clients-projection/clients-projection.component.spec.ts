import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsProjectionComponent } from './clients-projection.component';

describe('ClientsProjectionComponent', () => {
  let component: ClientsProjectionComponent;
  let fixture: ComponentFixture<ClientsProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
