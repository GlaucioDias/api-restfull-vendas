import { validate } from "uuid"

export const validateId = (id: string): boolean => {
  return validate(id) ? true : false
}
