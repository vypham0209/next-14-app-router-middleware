export function removeUnusedField(obj: Object) {
  return Object.entries(obj).reduce((data, field) => {
    if (field[1]) return { ...data, [field[0]]: field[1] };
    return data;
  }, {});
}
