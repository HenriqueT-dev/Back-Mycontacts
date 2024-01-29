const categoriesRepository = require('../repository/categoryRepository');

class categoryController {
	async index(resquest, response){
		//listar todos os registros
		const categories = await categoriesRepository.findAll();
		response.json(categories);
	}
	async show(request, response){
		//Obter UM registro
		const { id } = request.params;
		const contact = await categoriesRepository.findById(id);

		if (!contact){
			return response.status(404).json({error : 'User Not Found'});
		}
		response.json(contact);
	}
	async store(request, response){
		//criar um registro
		const { name } = request.body;
		if(!name){
			return response.status(400).json({ error : 'Name is required'});
		}
		const category = await categoriesRepository.create({name});
		response.status(201).json(category);
	}
	async update(request, response){
		//Editar um registro
		const { id } = request.params;
		const {name} = request.body;

		const categoryExists = await categoriesRepository.findById(id);
		if(!categoryExists){
			return response.status(404).json({error : 'Category not found'});
		}
		if(!name){
			return response.status(400).json({error:'name is required'});
		}
		const updatedCategory = await categoriesRepository.update(name, id);

		response.json(updatedCategory);
	}
	async delete(request, response){
		//deletar um registro
		const { id } = request.params;

		await categoriesRepository.delete(id);
		//204 : no-content
		response.sendStatus(204);
	}
}
module.exports = new categoryController();
