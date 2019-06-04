import * as bcrypt from 'bcrypt-nodejs';

const StringIsNumber = value => isNaN(Number(value)) === false;

export function EnumToArray(enumme) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

export function soNumeros(texto: string) {
  return texto.replace(/\D/g, '');
}

export function bcryptHash(texto: string) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(texto, null, null, (err, resultado: string) => {
      if (err) {
        reject(err);
      } else {
        resolve(resultado);
      }
    });
  });
}

export function bcryptCompare(data: string, hash: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, (err, resultado: boolean) => {
      if (err) {
        reject(err);
      } else {
        resolve(resultado);
      }
    });
  });
}

export function hexToRgb(hex): {
  r: number,
  g: number,
  b: number,
} {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
