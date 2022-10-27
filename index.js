
const express = require('express');
const cors = require('cors')
const app = express();
const axios = require('axios')

app.use(express.json())
app.use(cors())
require('dotenv').config();
const {validate} = require('./helpers/validate');




const {connection} = require('./database/connection');
const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send(
        {mensaje:'app funcionando!'}
    )
})

app.post('/nuevo', (req, res)=>{

    const {escrito, autor, contacto, contra, titulo} = req.body;

    if(validate(contra)){
        connection.query('INSERT INTO propios (escrito, autor, contacto, titulo) VALUES (?,?,?,?)', [escrito, autor, contacto, titulo] ,(error, results, fields)=>{
            if(!error){
                res.send({data: results});
                //res.send({data: results.length > 0 ? results : []});
    
                const datos = {data: {
                    app_id: process.env.ONE_SIGNAL_APP,
                    included_segments: ["Subscribed Users"],
                    data: {mensaje: `Titulo: ${titulo}`},
                    contents: {en: escrito.substring(0, 25) + '...'},
                    url: `https://escritos-f9d8d.web.app/escritos/${results.insertId}`,//.insertId
                    headings:{en: `Nuevo escrito de: ${autor}`}
                }}
                try {
                    const instance = axios.create({
                        baseURL: 'https://onesignal.com/api/v1/notifications',
                        timeout: 1000,
                        method: 'POST',
                        headers: {
                            'Content-Type':'application/json',
                            'Authorization':'Basic '+process.env.ONE_SIGNAL_KEY
                        }
                    });   
                    
                    instance.request(datos).then(res=>console.log)
            
                } catch (error) {
                    console.log('EERROR: ',error)
                }
    
            }else{
                throw error;
            } 
            
        });
    }else{
        res.status(401).send({
            data:[],
            error:true,
            message: 'Sin autorización'
        })
    }
})

app.get('/escritos', (req, res)=>{
    //res.send({mensaje:'hola'})
    connection.query('SELECT * FROM propios', (error, results, fields)=>{
        if (error) throw error;
        res.send({data: results.length > 0 ? results : []});
    });
})

app.get('/escritos/:id', (req, res)=>{
    connection.query('SELECT * FROM propios WHERE id_escrito = ?', [req.params.id], (error, results, fields)=>{ 
        if (error) throw error;
        res.send({data: results.length > 0 ? results : []});
    });
})

app.listen(port, ()=>{
    console.log(`Corriendo en puerto :${port}`)
})