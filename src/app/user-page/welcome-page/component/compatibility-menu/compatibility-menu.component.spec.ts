import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilityMenuComponent } from './compatibility-menu.component';

describe('CompatibilityMenuComponent', () => {
  let component: CompatibilityMenuComponent;
  let fixture: ComponentFixture<CompatibilityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompatibilityMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompatibilityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
