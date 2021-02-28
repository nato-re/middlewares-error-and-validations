const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return await connection().then(db => db.collection('peep').find().toArray())
};

const create = async (name, cartoon) => {
  const { insertedId } = await connection().then(db => db.collection('peep').insertOne({ name, cartoon }));

  return {
    id: insertedId,
    name
  }
}

const findById = async (id) => {
  return await connection().then(db => db.collection('peep').findOne(ObjectId(id)));
};

const update = async (id, name, cartoon) => {
  return await connection().then(db => db.collection('peep').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, cartoon } }
  ));
}

const remove = async (id, name) => {
  return await connection().then(db => db.collection('peep').deleteOne(
    { _id: ObjectId(id) }
  ));
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}