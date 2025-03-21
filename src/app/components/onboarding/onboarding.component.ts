import { Component } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  dados = [
    {
      codigo: '1672989784868',
      portfolio: 'Nome do portfólio detalhado aqui',
      'Orçamento 2026': '00,00',
      'Orçamento 2027': '00,00',
      'Orçamento 2028': '00,00',
      detalhes: {
        'Orçamento 2026': [
          { nome: 'Detalhe 1', valor: '10,00' },
          { nome: 'Detalhe 2', valor: '20,00' }
        ],
        'Orçamento 2027': [
          { nome: 'Detalhe 1', valor: '15,00' },
          { nome: 'Detalhe 2', valor: '25,00' }
        ],
        'Orçamento 2028': [
          { nome: 'Detalhe 1', valor: '18,00' },
          { nome: 'Detalhe 2', valor: '30,00' }
        ]
      }
    }
  ];

  anos = ['Orçamento 2026', 'Orçamento 2027', 'Orçamento 2028'];
  colunasExpandidas: string[] = [];

  toggleExpand(ano: string) {
    const index = this.colunasExpandidas.indexOf(ano);
    if (index === -1) {
      this.colunasExpandidas.push(ano);
    } else {
      this.colunasExpandidas.splice(index, 1);
    }
  }
}
