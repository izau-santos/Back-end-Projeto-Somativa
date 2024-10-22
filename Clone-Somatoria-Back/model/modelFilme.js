const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelGenero = require('./modelGenero')

const modelFilme = connection.define(
    'tbl_Filme',
    {
        cod_Filme:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cod_genero:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nome_Filme:{
            type:Sequelize.STRING(100),
            allowNull:true
        },
        diretor_Filme:{
            type:Sequelize.STRING(100),
            allowNull:true
        },
        descricao_Filme:{
            type:Sequelize.STRING(500),
            allowNull:true
        },
    }
);

/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/
modelGenero.hasMany(modelFilme, {
    foreignKey: 'cod_genero',
    sourceKey: 'cod_genero'
});

/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/
modelFilme.belongsTo(modelGenero, {
    foreignKey: 'cod_genero',
    sourceKey: 'cod_genero'
});

modelFilme.sync({force:true});

module.exports = modelFilme;