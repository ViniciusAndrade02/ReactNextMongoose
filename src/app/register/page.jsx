"use client"

import Button from '@/components/Button'
import Input from '@/components/Input'
import { Formik } from 'formik'
import * as Yup from 'yup';
import React from 'react'

export default function Register() {

  const initialValues = {
    name: "",
    email: "",
    password: "",
  } 

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um email válido")
      .required("O campo e-mail é obrigatório"),
      password: Yup.string().required("O campo senha é obrigatorio"),
  });

  async function handleSubmit() {
    
  }

  return (
    <div>
      <main className='min-h-screen flex items-center justify-center'>
        <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
          {({values}) => (
            <form className=' flex flex-col border border-blue-500 gap-2 p-4 rounded'
            noValidate>
              <Input name='email' type='email' required/>
              <Input name='password' type='password' required autoComplete="off" />
              <Input name='password' type='password' required autoComplete="off" />
              <Button type="submit" text="Entrar" className=" bg-red-200 rounded border border-solid p-2 text-black-500" />
              <span>
                Já cadastrou?
                <strong className=' pl-1'>
                  <a href="/login">VOLTAR</a>
                </strong>
              </span>
            </form>
          )}
        </Formik>
      </main>

    </div>
  )
}
