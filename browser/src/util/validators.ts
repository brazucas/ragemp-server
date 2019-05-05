import { AbstractControl } from '@angular/forms';
import { soDigitos } from './string-util';
import { Util } from './util';

export function ValidarCpf(control: AbstractControl) {
  if (!control.value || !Util.validarCPF(soDigitos(control.value))) {
    return {validCpf: true};
  }

  return null;
}


export function ValidarCpfCnpj(control: AbstractControl) {
  if (!control.value || (!Util.validarCNPJ(soDigitos(control.value)) && !Util.validarCPF(soDigitos(control.value)))) {
    return {validCnpj: true};
  }

  return null;
}
