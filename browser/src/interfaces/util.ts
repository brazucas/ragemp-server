const StringIsNumber = value => isNaN(Number(value)) === false;

export function EnumToArray(enumme) {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}
