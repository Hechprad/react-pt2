import validador from "validator";

class FormValidator {
  constructor(validacoes) {
    this.validacoes = validacoes;
  }
  valida(state) {
    let validacao = this.valido();

    this.validacoes.forEach(regra => {
      /*pegando o valor do campo no state e transformando
      em string. A biblioteca validator só trabalha com 
      string, por isso convertemos */
      const campoValor = state[regra.campo.toString()];
      const args = regra.args || [];

      /*pegando o método que será utilizado para validar */
      /* validando se é string com typeof ===.
      se alguém importar o validador, este método está 
      pronto para lidar com isso*/
      const metodoValidacao = typeof regra.metodo === "string" ?
        validador[regra.metodo]:
        regra.metodo;

      /*array vazio ou '...args' é de configurações opcionais 
      de métodos de validação do validator, 
      exp: no isItn min:0, max:9999 */
      if (metodoValidacao(campoValor, ...args, state) !== regra.validoQuando) {
        validacao[regra.campo] = {
          isInvalid: true,
          message: regra.mensagem
        }
        validacao.isValid = false;
      }
    });
    return validacao;
  }

  valido() {
    const validacao = {};

    /*para cada regra faça isso: */
    this.validacoes.map(regra => {
      validacao[regra.campo] = { inInvalid: false, message: "" };
    });
    return { isValid: true, ...validacao };
  }
}

export default FormValidator;
