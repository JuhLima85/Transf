import { Component, OnInit } from '@angular/core';
import { UsuarioMockadoService } from 'src/app/shared/services/usuario-mockado.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  

	//constructor(public usuarioMockadoService:UsuarioMockadoService,public usuariosServices:UsuarioService){  }
  
 //usuarioAtual:any
  ngOnInit(): void {
    // this.usuarioAtual = this.usuarioMockadoService.getUsuarioLogado()
    // this.usuarioAtual = this.usuarioMockadoService.usuariosMockadosSistema[0]
    /*this.usuariosServices.usuarioLogado$.subscribe((user:any) => {
      if(!user)
      return
      console.log("🚀 ~ AvisoFeriasComponent ~ this.usuariosService.usuarioAtual$.subscribe ~ user:", user)
      this.usuarioAtual = user

    })*/
  }

	/* Dashboard */
	salarioLiquidoVisibilidade:boolean = false

	/* fim */
}
