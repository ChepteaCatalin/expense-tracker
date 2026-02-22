export function validIdParam(id: string): boolean {
  if (id == null || id === '') return false;

  const idNum = +id;

  if (Number.isNaN(idNum) || idNum <= 0 || !Number.isInteger(idNum))
    return false;

  return true;
}
