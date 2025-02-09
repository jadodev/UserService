import { UserInterfacePortOut } from "../../domain/port/out/UserInterfacePortOut";
import { User } from "../../domain/entity/User";
import { UserBuilder } from "../../domain/builder/UserBuilder";
import { UserRole } from "../../domain/enum/UserRole";
import { Database } from "../config/DataBase";
import { PoolConnection } from "mysql2/promise";

export class UserRepository implements UserInterfacePortOut {
  
  async save(user: User): Promise<User> {
    const connection: PoolConnection = await Database.getConnection();
    
    const userData = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
      phone: user.getPhone()
    };

    try {
      await connection.execute(
        `INSERT INTO users (id, name, role, phone) 
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         name = VALUES(name), 
         role = VALUES(role), 
         phone = VALUES(phone)`,
        [userData.id, userData.name, userData.role, userData.phone]
      );
    } catch (err) {
      console.error("Error saving user:", err);
    } finally {
      connection.release(); 
    }

    return user;
  }

  async getById(id: string): Promise<User | null> {
    const connection: PoolConnection = await Database.getConnection();
    let user: User | null = null;
  
    try {  
      const [rows]: any[] = await connection.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
  
      if (rows.length > 0) {
        const userData = rows[0];
        const builder = new UserBuilder()
          .setId(userData.id)
          .setName(userData.name)
          .setRole(userData.role as UserRole)
          .setPhone(userData.phone);
  
        user = builder.build();
      }
    } catch (err) {
      console.error("Error retrieving user:", err);
    } finally {
      connection.release();
    }
  
    return user;
  }
}
