const { User } = require('../models');
const bcrypt = require('bcryptjs');

const userController = {
   
    async createUser(req, res)
    {
        try {
            const { nome, email, senha, cpf, telefone, endereco, dataNascimento, tipoUsuario } = req.body;
            
            // Verifica se o e-mail já existe
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: 'E-mail já cadastrado' });
            }
            //cria usuário
            const newUser = await User.create({nome, email, senha, cpf, telefone, endereco, dataNascimento, tipoUsuario});
            res.status(201).json(newUser);

            // Remove a senha antes de retornar a resposta
            const { senha: _, ...userWithoutPassword } = newUser.toJSON();
            res.status(201).json(userWithoutPassword);
            
        } catch (error) {
            res.status(500).json({error: 'Erro ao criar usuário', details: error.message});
            
        }
    },

    //Listar todos os usuários
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['senha'] } // Exclui a senha da resposta
            });
            res.status(200).json(users);

        } catch (error) {
            res.status(500).json({error: 'Erro ao buscar usuários', details: error.message});
            
        }
    },

    //Buscar usuário por Id
    async getUserById(req,res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id {
                attributes: { exclude: ['senha'] } // Exclui a senha da resposta
            });
            if (!user) return res.status(404).json({error: 'Usuário não encontrado'});
            res.status(200).json(user); 

        } catch (error) { 
            res.status(500).json({error: 'Erro ao buscar usuário', details: error.message});
        }

    },
    //Atualizar usuário
    async updateUser(req,res) { 
        try {
            const { id } = req.params;
            const { nome, email, senha, cpf, telefone, endereco, dataNascimento, tipoUsuario, status } = req.body;
            
            const user = await User.findByPk(id);
            if ('!user') return res.status(404).json({ error: 'Usuário não encontrado'});

            
            // Se estiver atualizando a senha, criptografa antes de salvar
            const updatedData = { nome, email, telefone, endereco, dataNascimento, tipoUsuario, status };
            if (senha) {
                const salt = await bcrypt.genSalt(10);
                updatedData.senha = await bcrypt.hash(senha, salt);
            }

            await user.update(updatedData);
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
            
            } catch (error) {
            res.status(500).json({error: 'Erro ao atualizar usuário', details: error.message});
            
        }
    },

    //Deletar usuário
    async deleteUser (req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if(!user) return res.status(404).json({error: 'Usuário não encontrado'});

            await user.destroy();
            res.status(204).send();

        } catch (error) {
            res.status(500).json({error: 'Erro ao deletar usuário', details:error.message});
            
        }
    }

};

module.exports = userController;