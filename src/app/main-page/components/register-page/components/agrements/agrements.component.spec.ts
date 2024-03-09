import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrementsComponent } from './agrements.component';

describe('AgrementsComponent', () => {
  let component: AgrementsComponent;
  let fixture: ComponentFixture<AgrementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgrementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
