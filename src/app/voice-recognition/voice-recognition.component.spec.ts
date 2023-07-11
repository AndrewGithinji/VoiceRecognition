import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecognitionComponent } from './voice-recognition.component';

describe('VoiceRecognitionComponent', () => {
  let component: VoiceRecognitionComponent;
  let fixture: ComponentFixture<VoiceRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoiceRecognitionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VoiceRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize texts, recognition, and p properties', () => {
    expect(component.texts).toBeDefined();
    expect(component.recognition).toBeDefined();
    expect(component.p).toBeDefined();
  });

  it('should append p element to texts element when there is a recognized result', () => {
    const mockResult = {
      results: [
        {
          0: { transcript: 'Hello' },
          isFinal: true,
        },
      ],
    } as SpeechRecognitionEvent;

    spyOn(document, 'querySelector').and.returnValue({} as HTMLElement);
    component.recognition.dispatchEvent(new Event('result', mockResult));
    fixture.detectChanges();

    const appendedPElement = component.texts.querySelector('p');
    expect(appendedPElement).toBeTruthy();
  });

  it('should handle recognized phrases and generate responses correctly', () => {
    const mockResult = {
      results: [
        {
          0: { transcript: 'How are You?' },
          isFinal: true,
        },
      ],
    } as SpeechRecognitionEvent;

    spyOn(document, 'querySelector').and.returnValue({} as HTMLElement);
    component.recognition.dispatchEvent(new Event('result', mockResult));
    fixture.detectChanges();

    const appendedPElement = component.texts.querySelector('.replay');
    expect(appendedPElement).toBeTruthy();
    expect(appendedPElement?.innerText).toBe('I am fine');
  });
});
