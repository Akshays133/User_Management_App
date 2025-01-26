export type User = {
  _id: string
  user: string
  interest: string[]
  age: number
  mobile: string
  email: string
}

export type UserFormData = Omit<User, "_id">

