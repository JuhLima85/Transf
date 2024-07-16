import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioMockadoService {


  unidadesPorPerfilMockados = [
    {
      perfil:'Gestor de sistema',
      unidades:['CESOA','CESOB','CESOC','CESOD']
    },
    {
      perfil:'Gestor de sistema sob Demanda',
      unidades:['CESOA','CESOB','CESOC']
    },
    {
      perfil:'Gestor de Ata',
      unidades:['CESOA','CESOB']
    },
    {
      perfil:'Auditor',
      unidades:['CESOA']
    },
]

  usuariosMockadosSistema = [
    {
    matricula:'c891553',
    perfil:'Gestor de sistema',
    nome:'Marcos',
    senha:'Caixa123',

   },
   {
    matricula:'c891567',
    perfil:'Gestor de sistema',
    nome:'Clara',
    senha:'Caixa123',

   },
   {
    matricula:'c891202',
    perfil:'Gestor de sistema sob Demanda',
    nome:'Eduardo',
    senha:'Caixa123',

   },
   {
    matricula:'c891565',
    perfil:'Gestor de Ata',
    nome:'Clara',
    senha:'Caixa123',

   },
   {
    matricula:'c891566',
    perfil:'Auditor',
    nome:'Eduardo',
    senha:'Caixa123',

   },
]
usuarioLogado:any
setUsuarioLogado(usuarioInfos:any){
console.log("🚀 ~ UsuarioMockadoService ~ usuarioInfos:", usuarioInfos)
this.usuarioLogado = usuarioInfos
return this.usuarioLogado

}

getUsuarioLogado(){
  return this.usuarioLogado
}

}
