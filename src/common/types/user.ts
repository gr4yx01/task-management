interface IUser {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    hashedPassword: string
    name: string
}

export default IUser