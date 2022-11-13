import db, { RowDataPacket, ResultSetHeader } from '@/db';
import { UserCreateDto, User } from '@/models/user';

class UsersRepository {
  async findById(id: number): Promise<User | null> {
    const queryString = 'SELECT * FROM user WHERE id = ?';
    const [rows] = await db.pool.query<RowDataPacket[]>(queryString, [id]);

    if (!rows.length) {
      return null;
    }

    return rows[0] as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const queryString = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await db.pool.query<RowDataPacket[]>(queryString, [email]);

    if (!rows.length) {
      return null;
    }

    return rows[0] as User;
  }

  async create(user: UserCreateDto): Promise<number> {
    const queryString = `
      INSERT INTO user (
        email,
        password,
        firstName,
        lastName
      )
      VALUES (?, ?, ?, ?)
    `;
    const fields = [user.email, user.password, user.firstName, user.lastName];
    const [result] = await db.pool.query<ResultSetHeader>(queryString, fields);
    return result.insertId;
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
