import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageToSendComponent } from './image-to-send.component';

describe('ImageToSendComponent', () => {
  let component: ImageToSendComponent;
  let fixture: ComponentFixture<ImageToSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageToSendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageToSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
