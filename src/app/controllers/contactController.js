const ContactRepository = require('../repository/ContactRepository');

class contactController {
	async index(request, response){
		//listar todos os registros
		const { orderBy } = request.query;
		const contacts = await ContactRepository.findAll(orderBy);
		// response.setHeader('Access-Control-Allow-Origin', '*'); requisição coringa
		// control + shift + R para limpar o cash
		response.json(contacts);
	}
	async show(request, response){
		//Obter UM registro
		const { id } = request.params;
		const contact = await ContactRepository.findById(id);

		if (!contact){
			return response.status(404).json({error : 'User Not Found'});
		}
		response.json(contact);
	}
	async store(request, response){
		//criar um registro
		const {name, email, phone, category_id} = request.body;

		if(!name){
			return response.status(400).json({error:'name is required'});
		}

		const contactExists = await ContactRepository.findByEmail(email);
		if(contactExists){
			return response.status(400).json({error: 'this email its already in Use'});
		}
		const contact = await ContactRepository.create({name, email, phone, category_id});

		response.status(201).json(contact);
	}
	async update(request, response){
		//Editar um registro
		const { id } = request.params;
		const { name, email, phone, category_id } = request.body;

		const contactExists = await ContactRepository.findById(id);
		if(!contactExists){
			return response.status(404).json({error : 'User not found'});
		}
		if(!name){
			return response.status(400).json({error:'name is required'});
		}
		const contactByEmail = await ContactRepository.findByEmail(email);
		if(contactByEmail && contactByEmail.id !== id){
			return response.status(400).json({error: 'this email its already in Use'});
		}
		const contact = await ContactRepository.update(id, { name, email, phone, category_id });

		response.json(contact);
	}
	async delete(request, response){
		//deletar um registro
		const { id } = request.params;

		await ContactRepository.delete(id);
		//204 : no-content
		response.sendStatus(204);
	}
}

module.exports = new contactController();
