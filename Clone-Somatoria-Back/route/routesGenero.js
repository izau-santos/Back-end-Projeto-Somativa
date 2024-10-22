const express = require('express');

/* IMPORTA O MODEL DE LIVRO */
const modelGenero = require('../model/modelGenero');

/* GERECIADOR DE ROTAS */
const router = express.Router();

/* ROTA DE INSERÇÃO DE CATEGORIA */
router.post('/inserirGenero', (req, res)=>{

    let { nome_Genero} = req.body;

    modelGenero.create(
        {
            nome_Genero,
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'GENERO INSERIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR O GENERO',
                errorObject:error
            }
        );
    });

});

/* ROTA DE LISTAGEM GERAL DE CATEGORIAS */
router.get('/listagemGeneros', (req, res)=>{

    modelGenero.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'GENEROS LISTADOS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR OS GENEROS',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE LISTAGEM DE LIVROS!'});

});

/* ROTA DE LISTAGEM DE LIVRO POR CÓDIGO DE LIVRO*/
router.get('/listagemGenero/:cod_genero', (req, res)=>{

    let { cod_genero } = req.params;

    modelGenero.findByPk(cod_genero)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'GENERO RECUPERADO COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR O GENERO',
                errorObject:error
            }
        );
    });

});

/* ROTA DE EXCLUSÃO DE CATEGORIA */
router.delete('/excluirGenero/:cod_genero', (req, res)=>{

    let { cod_genero } = req.params;

    modelGenero.destroy(
        {where:{cod_genero}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'GENERO EXCLUIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR O GENERO',
                errorObject:error
            }
        );
    });

});

/* ROTA DE ALTERAÇÃO DE CATEORIA */
router.put('/alterarGenero', (req, res)=>{

    let { cod_genero, nome_genero } = req.body;

    modelGenero.update(
        {
            nome_genero
        },
        {where:{cod_genero}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'GENERO ALTERADA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR O GENERO',
                errorObject:error
            }
        );
    });

});

module.exports = router;