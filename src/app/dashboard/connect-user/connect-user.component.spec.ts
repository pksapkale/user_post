import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectUserComponent } from './connect-user.component';

describe('ConnectUserComponent', () => {
  let component: ConnectUserComponent;
  let fixture: ComponentFixture<ConnectUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
