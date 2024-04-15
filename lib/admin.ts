import { auth } from "@clerk/nextjs"

const adminIds = [
    "user_2f0n5EVSbSF44AhGM42Zo1gBeJ2"
]

export const isAdmin = () => {
    const { userId } = auth()

    if (!userId) return false

    return adminIds.indexOf(userId) !== -1
}