import Sequelize from 'sequelize';

// const sequelize = new Sequelize(
//     process.env.POSTGRES_DB,
//     process.env.POSTGRES_USER,
//     process.env.POSTGRES_PASSWORD,
//     {
//         dialect: 'postgres',
//     },
// );

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres'
    }
)

sequelize.authenticate().then(() => {
    console.log("Success!");
  }).catch((err) => {
    console.log(err);
  });

const models = {
    User: sequelize.import('./user'),
    Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;