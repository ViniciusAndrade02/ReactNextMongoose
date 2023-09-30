import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";

export async function POST(req){
  try{
    const {name,email,password} = await req.json()

    await connect(); // connectar

    const emailExist = await User.findOne({email})

    if (emailExist){
      return NextResponse.json({
        message: "E-mail já cadastrado",
        status:409,
      });
    } 

    const hashedPassword = await bcrypt.hash(password,5)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    await newUser.save()

    return NextResponse.json({
      message: "Usuario criado com sucesso",
      status: 201,
    });
  } catch (error){
    return NextResponse.json({
      error: "Erro ao cadastrar usuario",
      status:500
    })
  }
}