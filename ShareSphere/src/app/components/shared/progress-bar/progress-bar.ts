import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {
  @Input() percentuale: number = 0;
  @Input() colore: string = '#6c3ff5';
  @Input() altezza: number = 14;

  get percentualeClampata(): number {
    return Math.min(Math.max(this.percentuale, 0), 100);
  }
}
