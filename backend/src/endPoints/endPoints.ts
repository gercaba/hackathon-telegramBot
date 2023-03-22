import * as express from 'express';
import {MenuEntity} from '../entities/menu';
import {OrderEntity} from '../entities/order';
import { ChatUserEntity } from '../entities/chatUser';
import {Menu, Order} from '../../../types/src/index';
import { chatBot } from '..';
export const Router = express.Router();


Router.get('/menus', async (req, res) =>{
    const menus = await MenuEntity.find();
    console.log(menus);
    res.json(menus);
});


Router.post('/menus', async (req, res) =>{
    const body = req.body;
    console.log(body);
    const receivedMenu={
        name: body.name,
        plates: body.plates,
        price: body.price
    };

    try{
        console.log(receivedMenu)
        const newMenu= new MenuEntity(receivedMenu);
        console.log(newMenu);
        await newMenu.save();     
        res.status(201).json({message:"Menu creado con éxito"});       
    }
    catch{
        res.status(400).send({message:"Error"})
    };
});

Router.get('/order', async (req, res)=>{
    const orders = await OrderEntity.find().populate('chatUser').populate('menu');
    console.log(orders);
    res.status(200).json(orders);
});

Router.post('/order', async (req, res) =>{
    const body = req.body;
    console.log(body);
    const receivedOrder={
        chatUser: body.chatUser,
        menu: body.menu,
        completed: body.completed
    };
    try{
        const newOrder= new OrderEntity(receivedOrder);
        console.log(newOrder);
        await newOrder.save();     
        res.status(201).json({message:"Comanda creada con éxito"});   
    }
    catch(e){
        res.status(400).send({message:e})
    };
});

Router.patch('/order/:id', async(req, res)=>{
    const updateOrder=await OrderEntity.findByIdAndUpdate(req.params.id,req.body)
    console.log("CompletedOrder: ",updateOrder)

    const chatUser = await ChatUserEntity.findById(updateOrder.chatUser).exec()

    chatBot.telegram.sendMessage(chatUser.chatId,`Enjoy your fucking delicius meal ${updateOrder._id}`)

    res.json(updateOrder);
});

Router.post('/chatUser', async(req, res)=>{
    const body = req.body;
    console.log(body);
    const receivedUser={
        name: body.name,
        chatId: body.chatId
    };
    try{
        const newUser= new ChatUserEntity(receivedUser);
        console.log(newUser);
        await newUser.save();     
        res.status(201).json({message:"Usuario creado con éxito"});   
    }
    catch(e){
        res.status(400).send({message:e})
    };
})
