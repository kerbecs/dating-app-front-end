import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEventComponent } from './menu-event.component';

describe('MenuEventComponent', () => {
  let component: MenuEventComponent;
  let fixture: ComponentFixture<MenuEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
