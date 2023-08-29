import { pool } from '../utils/database';

import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const createUser = async (userData: any): Promise<ResultSetHeader> => {
    const [result] = await pool.execute<ResultSetHeader>(
        'INSERT INTO Users (username, email, password, shippingAddress, phoneNumber) VALUES (?, ?, ?, ?, ?)',
        [userData.username, userData.email, userData.password, userData.shippingAddress, userData.phoneNumber]
    );
    return result;
    };

const updateUser = async (userId: string, updatedData: any): Promise<ResultSetHeader> => {
    const [result] = await pool.execute<ResultSetHeader>(
        'UPDATE Users SET email = ?, username = ?, password = ?, shippingAddress = ?, phoneNumber = ? WHERE id = ?',
        [updatedData.email, updatedData.username, updatedData.password, updatedData.shippingAddress, updatedData.phoneNumber, userId]
    );
    return result;
};

const updateUserEmail = async (username: string, newEmail: string): Promise<ResultSetHeader> => {
    const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE Users SET email = ? WHERE username = ?',
    [newEmail, username]
);
    return result;
};

const getUserByUsername = async (username: string): Promise<RowDataPacket | null> => {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM Users WHERE username = ?', [username]);
    return rows[0] || null;
};

const getUserById = async (userId: number | string): Promise<RowDataPacket[]> => {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM Users WHERE id = ?', [userId]);
    return rows;
};

const deleteUser = async (username: string) => {
    const [result] = await pool.execute('DELETE FROM Users WHERE username = ?', [username]);
    return result;
};

export { createUser, updateUserEmail, updateUser, getUserByUsername, getUserById, deleteUser };