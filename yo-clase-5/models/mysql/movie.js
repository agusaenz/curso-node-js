import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config)



export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase()

            const [genres] = await connection.query(
                'SELECT id FROM genre WHERE LOWER(name) = ?;',
                [lowerCaseGenre]
            )

            if (!genres.length) return []
            const [{ id }] = genres

            const [movies] = await connection.query(
                `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate 
                FROM movie m 
                JOIN movie_genre mg ON m.id = mg.movie_id 
                JOIN genre g ON mg.genre_id = g.id 
                WHERE g.id = ?;`,
                [id]
            )

            return movies
        }

        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )

        return movies
    }

    static async getById({ id }) {
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie
            WHERE id = UUID_TO_BIN(?);`,
            [id]
        )

        if (!movies.length) return []
        return movies
    }

    static async create({ input }) {
        const {
            genre: genreInput, // todavia no va
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, duration, director, rate, poster)
                VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, year, duration, director, rate, poster]
            )
        } catch (error) {
            throw new Error(error)
        }

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
            FROM movie
            WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return movies[0]
    }

    static async delete({ id }) {
        try {
            await connection.query(
                `DELETE FROM movie
                WHERE id = UUID_TO_BIN(?);`,
                [id]
            )
        } catch (error) {
            throw new Error('Movie not found')
        }
    }

    static async update({ id, input }) {

    }
}
