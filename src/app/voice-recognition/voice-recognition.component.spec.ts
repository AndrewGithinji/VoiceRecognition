import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecognitionComponent } from './voice-recognition.component';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList extends Array<SpeechRecognitionResult> {
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

class MockSpeechRecognition extends EventTarget {
  constructor() {
    super();
  }

  public start() {
    // Mock implementation
  }

  public stop() {
    // Mock implementation
  }
}

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
    const mockResult: SpeechRecognitionEvent = {
      results: [
        {
          item(index: number): SpeechRecognitionAlternative {
            return this[index];
          },
          0: { transcript: 'Hello', confidence: 1 },
          length: 1,
        } as SpeechRecognitionResult,
      ] as SpeechRecognitionResultList,
      type: 'result',
      target: new MockSpeechRecognition(),
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      timeStamp: 0,
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      NONE: 0,
      CAPTURING_PHASE: 1,
      AT_TARGET: 2,
      BUBBLING_PHASE: 3
    };

    spyOn(document, 'querySelector').and.returnValue({} as HTMLElement);
    component.recognition.dispatchEvent(new Event('result', mockResult));
    fixture.detectChanges();

    const appendedPElement = component.texts.querySelector('p');
    expect(appendedPElement).toBeTruthy();
  });

  it('should handle recognized phrases and generate responses correctly', () => {
    const mockResult: SpeechRecognitionEvent = {
      results: [
        {
          item(index: number): SpeechRecognitionAlternative {
            return this[index];
          },
          0: { transcript: 'How are you?', confidence: 1 },
          length: 1,
        } as SpeechRecognitionResult,
      ] as SpeechRecognitionResultList,
      type: 'result',
      target: new MockSpeechRecognition(),
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      defaultPrevented: false,
      eventPhase: 0,
      isTrusted: false,
      returnValue: false,
      srcElement: null,
      timeStamp: 0,
      composedPath: function (): EventTarget[] {
        throw new Error('Function not implemented.');
      },
      initEvent: function (type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void {
        throw new Error('Function not implemented.');
      },
      preventDefault: function (): void {
        throw new Error('Function not implemented.');
      },
      stopImmediatePropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      stopPropagation: function (): void {
        throw new Error('Function not implemented.');
      },
      NONE: 0,
      CAPTURING_PHASE: 1,
      AT_TARGET: 2,
      BUBBLING_PHASE: 3
    };

    spyOn(document, 'querySelector').and.returnValue({} as HTMLElement);
    component.recognition.dispatchEvent(new Event('result', mockResult));
    fixture.detectChanges();

    const appendedPElement = component.texts.querySelector('.replay');
    expect(appendedPElement).toBeTruthy();
    expect(appendedPElement?.textContent).toBe('I am fine');
  });
});
