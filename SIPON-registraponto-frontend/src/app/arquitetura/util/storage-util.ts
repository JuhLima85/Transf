export class StorageUtil {
  static get(chave: string): any {
    const valor = window.localStorage.getItem(chave);
    if (valor) {
      return JSON.parse(valor);
    }
  }

  static set(chave: string, valor: any): void {
    if (valor) {
      window.localStorage.setItem(chave, JSON.stringify(valor, ));
    } else {
      this.remove(chave);
    }
  }

  static remove(chave: string): void {
    window.localStorage.removeItem(chave);
  }
}
