import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { SegurancaKeycloakService } from './shared/services/seguranca/keycloak/seguranca-keycloak.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './utils/app-init';
import { HomeComponent } from './pages/home/home.component';
import { PaginaNaoEncontradaComponent } from './shared/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DadosDoFuncionarioComponent } from './pages/dados-do-funcionario/dados-do-funcionario.component';
import { AbonoFuncionarioComponent } from './pages/abono-funcionario/abono-funcionario.component';
import { ComprovanteRendimentoComponent } from './pages/comprovante-rendimento/comprovante-rendimento.component';
import { ContraChequeComponent } from './pages/contra-cheque/contra-cheque.component';
import { AvisoFeriasComponent } from './pages/aviso-ferias/aviso-ferias.component';
import { AvisoFeriasGestaoComponent } from './pages/aviso-ferias-gestao/aviso-ferias-gestao.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AccordionMenuComponent } from './shared/components/accordion-menu/accordion-menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BannerCarouselComponent } from './shared/components/carousels/banner-carousel/banner-carousel.component';
import { ContentCarouselComponent } from './shared/components/carousels/content-carousel/content-carousel.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { RegistroDePontoComponent } from './pages/registro-de-ponto/registro-de-ponto.component';
import { NavbarSiponComponent } from './shared/components/navbar-sipon/navbar-sipon.component';
import { LayoutSiponComponent } from './shared/components/layout-sipon/layout-sipon.component';
import { FooterSiponComponent } from './shared/components/footer-sipon/footer-sipon.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { MensagemFeedbackComponent } from './shared/components/mensagem-feedback/mensagem-feedback.component';
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    DadosDoFuncionarioComponent,
    AbonoFuncionarioComponent,
    ComprovanteRendimentoComponent,
    ContraChequeComponent,
    AvisoFeriasComponent,
    AvisoFeriasGestaoComponent,
    NavbarComponent,
    FooterComponent,
    AccordionMenuComponent,
    BannerCarouselComponent,
    ContentCarouselComponent,    
    LayoutComponent,
    ModalComponent,
    RegistroDePontoComponent,
    NavbarSiponComponent,
    LayoutSiponComponent,
    FooterSiponComponent,    
    MensagemFeedbackComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],  
  providers: [
    /*KeycloakService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [ KeycloakService, SegurancaKeycloakService, Router ]
    },*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
