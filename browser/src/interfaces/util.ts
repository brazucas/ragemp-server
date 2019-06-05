const StringIsNumber = value => isNaN(Number(value)) === false;

export function EnumToArray(enumme) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

export function dinheiroPad(valor) {
  return ('000000000' + valor).substr(valor.toString().length);
}
