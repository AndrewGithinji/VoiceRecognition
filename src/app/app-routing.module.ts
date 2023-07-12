import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoiceRecognitionComponent } from './voice-recognition/voice-recognition.component';

const routes: Routes = [
  { path: 'dashboard', component: VoiceRecognitionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
