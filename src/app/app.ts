import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RefComponent } from '../ref/ref.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RefComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ref');
}
