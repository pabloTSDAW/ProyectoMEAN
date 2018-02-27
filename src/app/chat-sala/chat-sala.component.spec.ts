import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSalaComponent } from './chat-sala.component';

describe('ChatSalaComponent', () => {
  let component: ChatSalaComponent;
  let fixture: ComponentFixture<ChatSalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
