import { Context, Telegraf } from "telegraf";
import { ChatUser, Menu, Plate } from "@hackathon/types";
import { OrderEntity } from "../entities/order";
import { MenuEntity } from "../entities/menu";
import { ChatUserEntity } from "../entities/chatUser";

export interface MyContext extends Context {
  chatUser?: ChatUser;
}

const configureBot = () => {
  const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

  bot.use(async (ctx,next)=>{

    const chat = await ctx.getChat()

    let chatUser = await ChatUserEntity.findOne({chatId:chat.id}).exec();

    if (!chatUser){
        const newUserObject = {chatId:chat.id, name:chat.username}
        chatUser = new ChatUserEntity(newUserObject)
        await chatUser.save()
    }
    ctx.chatUser = chatUser

    next()

  })
  bot.start(async (ctx) => {


    const user = ctx.chatUser
    await ctx.replyWithMarkdown(`Welcome ${user.name} to HackBot`);
  });
  

  bot.command('menu', async (ctx) => {
    
    const menus = await MenuEntity.find().exec()

    const menuString = menus && menus.reduce((acc,menu)=>{
       return acc+= `Este es nuestro excelente menú:
        ${menu.name}: ${menu.price} €,
        ${menu.plates.reduce((accPlate,plate)=>{return accPlate += 
            `${plate.name}: ${plate.description} || `}, '')}`

  },'')

    console.log("menuString",menuString)

    await ctx.reply(menuString, {reply_markup:{
        inline_keyboard:[menus.map((e)=>{
            return ({text:e.name, callback_data:e._id})
        })]
    }});
  })

  bot.command('order', async (ctx) => {

    const orderUser = await OrderEntity.find({chatUser:ctx.chatUser.id}).exec()
    
    if(!orderUser){
        await ctx.reply('No orders yet!! Buy some food!!!')

    }else {

        const orderString = orderUser.reduce((acc, order)=>{
            return(
                acc += `Tienes esta ${order._id} que está ${order.completed ? `completado`: `pendiente`} \n`
            )
        },'')
    
        await ctx.reply(orderString);
    
      }
    })

bot.on('callback_query', async (ctx)=>{

    const menuId = ctx.callbackQuery.data

    const order = new OrderEntity({menu:menuId, chatUser: ctx.chatUser._id, completed:false})

    await order.save()

    ctx.replyWithMarkdown(`Your delicius food is in progress! Keed your ID order: ${order._id}`)
})

//   bot.help(async (ctx) => {
//     await ctx.reply("Send me a sticker");
//   });

//   bot.on("sticker", async (ctx) => {
//     await ctx.reply("👍");
//   });

//   bot.hears("hi", async (ctx) => {
//     await ctx.reply("Hey there");
//   });

  bot.launch();

  
  return bot;
};

export default configureBot;
