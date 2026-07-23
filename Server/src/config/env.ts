type config = {
    MONGO_URI: string,
    JWT_SECRET: string
}



export const apiConfig:config={
    MONGO_URI:process.env.MONGO_URI!,
    JWT_SECRET:process.env.JWT_SECRET!
}