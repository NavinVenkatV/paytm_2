import db from "@repo/db"
import express from "express"
const app = express();

app.use(express.json());

app.get('/bankHook', async(req,res)=>{
    const paymentInfo = {
        token : req.body.token,
        amount : req.body.amount,
        userId : req.body.user_identifier
    }
    await db.balance.update({
        where : {
            userId : paymentInfo.userId
        },
        data : {
            amount : {
                increment : paymentInfo.amount
            }
        }
    })

    await db.onRampTransaction.update({
        where : {
            token : paymentInfo.token
        },
        data : {
            status : "Success"
        }
    })

    res.json({
        message  :"captured"
    })
})