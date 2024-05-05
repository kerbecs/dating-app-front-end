import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendMessageComponent } from './friend-message.component';

describe('FriendMessageComponent', () => {
  let component: FriendMessageComponent;
  let fixture: ComponentFixture<FriendMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FriendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
