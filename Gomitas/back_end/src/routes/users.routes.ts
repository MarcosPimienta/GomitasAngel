import express from 'express';
import { createUser, getUserById, getUsers, updateUser, deleteUser} from '../models/user.model';

const router = express.Router();

// Create (POST)
router.post('/users', async (req, res) => {
  try {
    const userData = req.body;
    const result = await createUser(userData);
    res.status(201).json({ message: 'User created successfully!', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.', error });
  }
});

// Read (GET)
router.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user.', error });
  }
});

router.get('/users', async (req, res) => {
  try {
    const userId = req.params;
    const user = await getUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error });
  }
});

// Update (PUT)
router.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    await updateUser(userId, updatedData);
    res.status(200).json({ message: 'User updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user.', error });
  }
});

// Delete (DELETE)

router.delete('/users/:username', async (req, res) => {
  try {
      const userName = req.params.username;
      const affectedRows = await deleteUser(userName);  // Get the number of rows that were deleted

      if (affectedRows === 0) {
          res.status(404).json({ message: 'User not found!' });  // No rows were deleted, so the user was not found
      } else {
          res.status(200).json({ message: 'User deleted successfully!' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error deleting user.', error });
  }
});

export default router;