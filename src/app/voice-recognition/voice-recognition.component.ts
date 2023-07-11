import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css']
})
export class VoiceRecognitionComponent implements OnInit {
  texts!: HTMLElement;
  recognition!: SpeechRecognition;
  p!: HTMLElement;

  ngOnInit() {
    this.texts = document.querySelector('.texts') as HTMLElement;
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.p = document.createElement('p');

    this.recognition.addEventListener('result', (e: any) => {
      this.texts.appendChild(this.p);
      const text = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      this.p.innerText = text;
      if (e.results[0].isFinal) {
        if (text.includes('How are You')) {
          this.p = document.createElement('p');
          this.p.classList.add('replay');
          this.p.innerText = 'I am fine';
          this.texts.appendChild(this.p);
        }

        // Handle other recognized phrases and generate responses

        this.p = document.createElement('p');
      }
    });

    this.recognition.addEventListener('end', () => {
      this.recognition.start();
    });

    this.recognition.start();
  }
}
