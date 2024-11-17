const express = require("express");
const { PrismaClient } = require('@prisma/client');
const cors = require("cors");
const zod=require('zod');
const app=express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

const contactBody=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string().email(),
    phone:zod.string(),
    company:zod.string().optional(),
    jobTitle:zod.string().optional()
})


app.post("/contacts", async (req,res)=>{
    const body= await req.body;
    const Validation =contactBody.safeParse(body);

    if (!Validation.success) {
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    
    const email = body.email.toLowerCase();

    const existingUser = await prisma.contact.findUnique({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        return res.status(400).json({ message: "Email already taken" });
    }

    const contact = await prisma.contact.create({
        data:{
            firstName:body.firstName,
            lastName:body.lastName,
            email:email,
            phone:body.phone,
            company:body.company,
            jobTitle:body.jobTitle
        }
    })
    res.status(201).json({contact});
})

app.get("/contacts/:id", async (req,res)=>{

    const { id } = req.params;
    const contacts= await prisma.contact.findUnique({
        where:{
            id:Number(id),
        }
    });
    res.json(contacts);
})

app.get("/contacts", async (req,res)=>{

    const contacts= await prisma.contact.findMany();
    res.json(contacts);
})


const updateContact= zod.object({
    id: zod.number().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    email:zod.string().email().optional(),
    phone:zod.string().optional(),
    company:zod.string().optional(),
    jobTitle:zod.string().optional()
})
app.put("/contacts/:id", async (req,res)=>{

    const body= await req.body;
    const { id } = req.params;
    const Validation =updateContact.safeParse(body);

    if (!Validation.success) {
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const contact = await prisma.contact.update({
        where:{
            id:Number(id),
        },
        data:{
            firstName:body.firstName,
            lastName:body.lastName,
            email:body.email,
            phone:body.phone,
            company:body.company,
            jobTitle:body.jobTitle
        }
    })
    
    res.json({
        msg:"Updated",
        contact:contact
    })
})

app.delete("/contacts/:id", async (req, res) => {

    const { id } = req.params;

    await prisma.contact.delete({
        where:{
            id:Number(id),
        }
    });
    
    res.json({
        msg:"Deleted",
    });

})



app.listen(3000,()=>{console.log("Server listening on port 3000")})
module.exports = app;