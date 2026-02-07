import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnConstruccionComponent as EnConstruccionSharedComponent } from '../../../components/shared/en-construccion/en-construccion.component';

@Component({
  selector: 'app-en-construccion-view',
  standalone: true,
  imports: [CommonModule, EnConstruccionSharedComponent],
  templateUrl: './en-construccion.component.html',
  styleUrls: ['./en-construccion.component.scss']
})
export class EnConstruccionViewComponent {
}