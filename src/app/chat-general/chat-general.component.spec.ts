import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatGeneralComponent } from './chat-general.component';

describe('ChatGeneralComponent', () => {
  let component: ChatGeneralComponent;
  let fixture: ComponentFixture<ChatGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
