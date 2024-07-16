export class MarcacoesPonto {
  entrada: Date | null;
  saida: Date | null;

  constructor(entrada: Date | null = null, saida: Date | null = null) { // Aceita Date | null
    this.entrada = entrada;
    this.saida = saida;
  }
}

