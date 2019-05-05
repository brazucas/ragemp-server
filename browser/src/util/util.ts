export class Util {

  static validaCNS(vlrCNS: string) {
    let soma: number;
    let resto: number;
    let dv: number;
    let pis: string;
    let resultado: string;
    const tamCNS = vlrCNS.length;
    if ((tamCNS) !== 15) {
      return false;
    }
    pis = vlrCNS.substring(0, 11);
    soma = (((Number(pis.substring(0, 1))) * 15) +
      ((Number(pis.substring(1, 2))) * 14) +
      ((Number(pis.substring(2, 3))) * 13) +
      ((Number(pis.substring(3, 4))) * 12) +
      ((Number(pis.substring(4, 5))) * 11) +
      ((Number(pis.substring(5, 6))) * 10) +
      ((Number(pis.substring(6, 7))) * 9) +
      ((Number(pis.substring(7, 8))) * 8) +
      ((Number(pis.substring(8, 9))) * 7) +
      ((Number(pis.substring(9, 10))) * 6) +
      ((Number(pis.substring(10, 11))) * 5));
    resto = soma % 11;
    dv = 11 - resto;
    if (dv === 11) {
      dv = 0;
    }
    if (dv === 10) {
      soma = (((Number(pis.substring(0, 1))) * 15) +
        ((Number(pis.substring(1, 2))) * 14) +
        ((Number(pis.substring(2, 3))) * 13) +
        ((Number(pis.substring(3, 4))) * 12) +
        ((Number(pis.substring(4, 5))) * 11) +
        ((Number(pis.substring(5, 6))) * 10) +
        ((Number(pis.substring(6, 7))) * 9) +
        ((Number(pis.substring(7, 8))) * 8) +
        ((Number(pis.substring(8, 9))) * 7) +
        ((Number(pis.substring(9, 10))) * 6) +
        ((Number(pis.substring(10, 11))) * 5) + 2);
      resto = soma % 11;
      dv = 11 - resto;
      resultado = pis + '001' + String(dv);
    } else {
      resultado = pis + '000' + String(dv);
    }
    return (vlrCNS === resultado);
  }

  static validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') {
      return false;
    }

    if (cnpj.length !== 14) {
      return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === '00000000000000' ||
      cnpj === '11111111111111' ||
      cnpj === '22222222222222' ||
      cnpj === '33333333333333' ||
      cnpj === '44444444444444' ||
      cnpj === '55555555555555' ||
      cnpj === '66666666666666' ||
      cnpj === '77777777777777' ||
      cnpj === '88888888888888' ||
      cnpj === '99999999999999') {
      return false;
    }

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado !== parseInt(digitos.charAt(0), 10)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    return (resultado === parseInt(digitos.charAt(1), 10));
  }

  static validarCPF(strCPF: string) {
    let soma = 0;
    let resto;

    if (strCPF === '00000000000') {
      return false;
    }

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }
    if (resto !== parseInt(strCPF.substring(9, 10), 10)) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }
    return (resto === parseInt(strCPF.substring(10, 11), 10));
  }

  static validarSenha(senha: string) {
    return senha.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/g) !== null;
  }

  static getDistancia(latitudeOrigem, longitudeOrigem, latitude, longitude) {
    if (latitudeOrigem !== null && longitudeOrigem !== null && latitude !== null && longitude) {
      return this.getDistanceFromLatLonInKm(latitudeOrigem, longitudeOrigem, latitude, longitude).toFixed(0) + ' km';
    }
    return '';
  }

  static getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  static deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

}

export let UM_DIA = 1000 * 60 * 60 * 24;
