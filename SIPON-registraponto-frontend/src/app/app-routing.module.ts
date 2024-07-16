import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaginaNaoEncontradaComponent } from './shared/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DadosDoFuncionarioComponent } from './pages/dados-do-funcionario/dados-do-funcionario.component';
import { AbonoFuncionarioComponent } from './pages/abono-funcionario/abono-funcionario.component';
import { ComprovanteRendimentoComponent } from './pages/comprovante-rendimento/comprovante-rendimento.component';
import { ContraChequeComponent } from './pages/contra-cheque/contra-cheque.component';
import { AvisoFeriasComponent } from './pages/aviso-ferias/aviso-ferias.component';
import { AvisoFeriasGestaoComponent } from './pages/aviso-ferias-gestao/aviso-ferias-gestao.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LayoutSiponComponent } from './shared/components/layout-sipon/layout-sipon.component';
import { RegistroDePontoComponent } from './pages/registro-de-ponto/registro-de-ponto.component';
import { AuthGuard } from './shared/guards/auth.guard'; 

const routes: Routes = [   
  {
     path: 'sipon', component: LayoutSiponComponent,  children: [
    { path: '', redirectTo: 'registroDePonto', pathMatch: 'full' },
      { path: 'registroDePonto', component: RegistroDePontoComponent },      
  ]
},
  { 
    path: 'sigpm', component: LayoutComponent, children:[ 
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },     
      { path: 'dadosDoFuncionario', component: DadosDoFuncionarioComponent },
      { path: 'abonoFuncionario', component: AbonoFuncionarioComponent },
      { path: 'comprovanteRendimento', component: ComprovanteRendimentoComponent },
      { path: 'contraCheque', component: ContraChequeComponent },
      { path: 'avisoFerias', component: AvisoFeriasComponent },
      { path: 'avisoFeriasGestao', component: AvisoFeriasGestaoComponent },	    
  ]
},  
{ path: '', redirectTo: '/sipon/registroDePonto', pathMatch: 'full' }, //redireciona para o Sipon após login
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
