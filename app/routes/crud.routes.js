module.exports = (app) => {
    const crud = require('../controllers/db.controller.js');

    app.post('/db', crud.create);

    app.get('/db', crud.findAll);

    app.get('/db/:obId', crud.findOne);

    app.put('/db/:obId', crud.update);

    
    app.delete('/db/:obId', crud.delete);

    app.post('/uri', crud.uri);

    app.post('/data', crud.data);
}