import { createConnection, Connection } from "typeorm";

export async function connectToDb(): Promise<void> {
    await createConnection({
        name: 'default',
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: true,
        entities: ['src/models/**/*.*'],
        synchronize: true,
    });
}