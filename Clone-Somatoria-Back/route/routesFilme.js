const express = require('express');

/* IMPORTA O MODEL DE Filme */
const modelFilme = require('../model/modelFilme');


/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE TESTE DE CONEXÃO COM A API */
router.get('/', (req, res)=>{

    return res.status(200).json({status:'TESTE DE CONEXÃO COM A API!'});

});

/* ROTA DE INSERÇÃO DE Filme */
router.post('/inserirFilme', (req, res)=>{

    let { cod_genero, nome_Filme, diretor_Filme, descricao_Filme } = req.body;

    modelFilme.create(
        {

            cod_genero,
            nome_Filme,
            diretor_Filme,
            descricao_Filme
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'Filme INSERIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR O Filme',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE INSERÇÃO DE Filme!'});

});

/* ROTA DE LISTAGEM GERAL DE FilmeS */
router.get('/listagemFilmes', (req, res)=>{

    modelFilme.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'FilmeS LISTADOS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR OS FilmeS',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE LISTAGEM DE FilmeS!'});

});

/* ROTA DE LISTAGEM DE Filme POR CÓDIGO DE Filme*/
router.get('/listagemFilme/:cod_Filme', (req, res)=>{

    let { cod_Filme } = req.params;

    modelFilme.findByPk(cod_Filme)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'Filme RECUPERADO COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR O Filme',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE LISTAGEM DE Filme COM BUSCA POR CÓDIGO DE Filme!'});

});

/* ROTA DE EXCLUSÃO DE Filme */
router.delete('/excluirFilme/:cod_Filme', (req, res)=>{

    let { cod_Filme } = req.params;

    modelFilme.destroy(
        {where:{cod_Filme}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'Filme EXCLUIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR O Filme',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE EXCLUSÃO DE Filme!'});

});

/* ROTA DE ALTERAÇÃO DE Filme */
router.put('/alterarFilme', (req, res)=>{

    let { cod_Filme, nome_Filme, autor_Filme, descricao_Filme } = req.body;

    modelFilme.update(
        {
            nome_Filme,
            autor_Filme,
            descricao_Filme
        },
        {where:{cod_Filme}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'Filme ALTERADO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR O Filme',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE ALTERAÇÃO DE Filme!'});

});

module.exports = router;