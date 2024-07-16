import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem-feedback',
  templateUrl: './mensagem-feedback.component.html',
  styleUrls: ['./mensagem-feedback.component.css']
})
export class MensagemFeedbackComponent implements OnInit {
  @Input() mensagem!: string;
  @Input() titulo!: string;
  @Input() tipo: 'success' = 'success'; 

  classeCss: string = '';
   icone: string = '';

  ngOnInit(): void {
    this.classeCss = this.getEstilo();
    this.icone = this.getIcone();    
  }

  getEstilo(): string {
    const classeBase = 'alerta';
    return `${classeBase} success`;
  }

  getIcone(): string {
    return 'assets/images/novo_web/icon-sucess.png';
  }  
}
