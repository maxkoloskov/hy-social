import db, { RowDataPacket, ResultSetHeader } from '@/db';
import { Profile } from '@/models/profile';
import { PaginationOpts } from '@/types';

class ProfilesRepository {
  private profileFields = ['id', 'email', 'firstName', 'lastName', 'gender', 'birthdate', 'bio'].join(', ');

  async findById(id: number): Promise<Profile | null> {
    const queryString = `SELECT ${this.profileFields} FROM user WHERE id = ?`;
    const [rows] = await db.pool.query<RowDataPacket[]>(queryString, [id]);

    if (!rows.length) {
      return null;
    }

    return rows[0] as Profile;
  }

  async findByAnthroponym(
    params: { anthroponym: string; excludeUserId?: number } & PaginationOpts,
  ): Promise<Profile[]> {
    const values = {
      str: params.anthroponym + '%',
      uid: params.excludeUserId,
      limit: params?.limit || 10,
      offset: params?.offset || 0,
    };

    const sql = `
      SELECT ${this.profileFields} FROM user
      WHERE (firstName LIKE :str OR lastName LIKE :str)
      ${values.uid ? 'AND id != :uid' : ''}
      ORDER BY lastName
      LIMIT :limit
      OFFSET :offset
    `;

    const [rows] = await db.pool.query<RowDataPacket[]>(sql, values);

    return rows as Profile[];
  }
}

const profilesRepository = new ProfilesRepository();
export { profilesRepository };
