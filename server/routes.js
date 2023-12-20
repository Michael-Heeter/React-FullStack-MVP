const express = require("express");
const cors = require("cors");

const {Pool} = require("pg")

const pool = new Pool({
  connectionString: `postgres://taskez_vehq_user:${encodeURI(`8T7qe55os2pUYZ6jBcAVUybPqawTA8iu`)}@dpg-cm0vhtda73kc73ec6ei0-a.oregon-postgres.render.com/taskez_vehq?ssl=true`
});

const app = express();

app.use(express.json());
app.use(cors());

//Get all Users
app.get("/api/users", async (req, res) => {
  try{
    const { rows } = await pool.query('SELECT * FROM users;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//Get all tasks for user pertaining to fk_user
app.get("/api/usertasks/:id", async (req, res) => {
  try{
    const id = req.params.id
    const {rows} = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [id])
    res.status(200).json(rows)
  }catch(err){
    console.error(err)
    res.status(500).send('Server Error')
  }
})

//Create new user
app.post("/api/users", async (req, res) => {    
  try {
      const {name} = req.body
      if (!name) {
          return res.status(400).send('Bad request')
      }

      const newUser = {name}
      const user = await pool.query(`INSERT INTO users(name) VALUES($1) RETURNING id`, [name])
      newUser.id = user.rows[0].id
      res.status(201).json(newUser)
  } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
  }
})

//patch user at id
app.patch('/api/users/:id', async (req,res, next) => {
  try{
      const id = req.params.id;
      const current = req.body
      const users = await pool.query('SELECT * FROM users WHERE id = $1', [id])
      const existing = users.rows[0]
      if (users.rowCount === 0) {
          res.status(404).send('User not found')
      }
      for (const key in req.body){
          existing[key] = req.body[key]
      }
      const update = await pool.query(`UPDATE users SET name = $1,  WHERE id = $2`,
      [existing.name, id])
      if(update.rowCount === 1){
          res.status(200).json(existing)
      }else{
          res.status(500).send('Failed to update user')
      }
  }catch (error){
      console.log(error)
      res.status(500).send('Internal Server Error')
  }
})

//Delete user at id
app.delete("/api/users/:id", async (req,res, next) => {
  try{
      const id = parseInt(req.params.id)
      if (isNaN(id)){
          return res.status(400).send('Bad Request: Invalid user index')
      }
      const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
      if(user.rowCount === 0){
          res.status(404).send('No task found at this location')
      }
      const deleteUser = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
      if(deleteUser.rowCount === 1){
          res.status(200).json(user[id])
      }else{
          res.status(500).send('failed to delete task')
      }
  }catch (error) {
      console.log('delete path')
      next(error)
  }
})

//Create task for user
app.post("/api/task", async (req, res) => {    
  try {
      const {due_date, start_date, name, description, user_id} = req.body
      if (!due_date || !start_date || !name || !description || !user_id) {
          return res.status(400).send('Bad request')
      }

      const newTask = {due_date, start_date, name, description, user_id}
      const task = await pool.query(`INSERT INTO tasks(due_date, start_date, name, description, user_id) VALUES($1, $2, $3, $4, $5) RETURNING id`, [due_date, start_date, name, description, user_id])
      newTask.id = task.rows[0].id
      res.status(201).json(newTask)
  } catch (error) {
      console.error(error)
      res.status(500).send('Internal Server Error')
  }
})

//edit task for user
app.patch('/api/task/:id', async (req,res, next) => {
  try{
      const id = req.params.id;
      const current = req.body
      const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
      const existing = task.rows[0]
      if (task.rowCount === 0) {
          res.status(404).send('Task not found')
      }
      for (const key in req.body){
          existing[key] = req.body[key]
      }
      const update = await pool.query(`UPDATE tasks SET due_date = $1, start_date = $2, name = $3, description = $4 WHERE id = $5`,
      [existing.due_date, existing.start_date, existing.name, existing.description, id])
      if(update.rowCount === 1){
          res.status(200).json(existing)
      }else{
          res.status(500).send('Failed to update task')
      }
  }catch (error){
      console.log(error)
      res.status(500).send('Internal Server Error')
  }
})

//delete task of user
app.delete('/api/task/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Bad Request: Invalid task ID' });
    }

    const task = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (task.rowCount === 0) {
      return res.status(404).json({ error: 'No task found at this location' });
    }

    res.status(200).json(task.rows[0]);
  } catch (error) {
    console.error('Error during task deletion:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server running");
});

module.exports=app