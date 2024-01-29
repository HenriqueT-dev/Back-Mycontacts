const db = require('../../database/index');

class categoryRepository{
	async findAll(){
		const rows = await db.query('SELECT * FROM categories ORDER BY name');
		return rows;

	}
	async create({ name }){
		const [row] = await db.query('INSERT INTO categories(name) VALUES($1) RETURNING *',[name]);
		return row;
	}
	async findById(id){
		const [row] = await db.query('SELECT * FROM categories WHERE id = $1',[id]);
		return row;
	}
	async update(name, id){
		const [row] = await db.query(`
    UPDATE categories
    SET name = $1
    WHERE id = $2
    RETURNING *
    `,[name, id]);

		return row;
	}
	async delete(id){
		const deleteCategory = await db.query('DELETE FROM categories WHERE id = $1', [id]);
		return deleteCategory;
	}
}
module.exports = new categoryRepository;
