import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grades = db.grades;

const create = async (req, res) => {
  const grade = new Grades({
    name: req.body.name,
    subject: req.body.subject,
    type: req.body.type,
    value: req.body.value,
    lastModified: new Date(),
  });

  try {
    await grade.save();

    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  try {
    //condicao para o filtro no findAll
    var condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};
    const data = await Grades.find(condition, {
      _id: 1,
      name: 1,
      subject: 1,
      type: 1,
      value: 1,
    });
    res.send(data);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  logger.info(id);
  try {
    const data = await Grades.findById({ _id: id });
    if (!data) {
      logger.info(`GET /grade - id: ${id} não encontrado`);
      res.status(404).send('Não encontrado o id: ' + id);
    } else {
      res.send(data);
      logger.info(`GET /grade - solicitado busca do id: ${id}`);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Grades.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!data) {
      logger.info(
        `PUT /grade - Não encontrado o id: ${id} - ${JSON.stringify(req.body)}`
      );
      res.status(404).send('Não encontrado o id ' + id);
    } else {
      logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
      res.send(data);
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await Grades.findByIdAndDelete({ _id: id });
    logger.info(`DELETE /grade - ${id}`);
    res.send('Excluído com sucesso!');
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    await Grades.deleteMany({});
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
