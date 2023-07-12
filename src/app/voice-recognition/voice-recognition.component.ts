import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voice-recognition',
  templateUrl: './voice-recognition.component.html',
  styleUrls: ['./voice-recognition.component.css']
})
export class VoiceRecognitionComponent implements OnInit {
  p(p: any) {
    throw new Error('Method not implemented.');
  }
  texts!: HTMLElement;
  recognition!: any; // Use 'any' type for recognition

  ngOnInit() {
    this.texts = document.querySelector('.texts')!;
    this.recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
    this.recognition.interimResults = true;

    this.recognition.onresult = (e: any) => {
      const text = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      const p = document.createElement('p');
      this.texts.appendChild(p);
      p.innerText = text;

      if (e.results[0].isFinal) {
        if (text.includes('How are You')) {
          const replayP = document.createElement('p');
          replayP.classList.add('replay');
          replayP.innerText = 'I am fine';
          this.texts.appendChild(replayP);
        }

        // Handle other recognized phrases and generate responses
      }
    };

    this.recognition.onend = () => {
      this.recognition.start();
    };

    this.recognition.start();
  }
}
