"use client"

import Button from '@/components/Button'
import Input from '@/components/Input'
import { Formik } from 'formik'
import * as Yup from 'yup';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Register() {
  const [error,setError] = React.useState("");
  const [isFormSubmitting, setFormSubmitting] = React.useState(false);


  const router = useRouter();
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

  async function handleSubmit(values,{resetForm}) {
    setFormSubmitting(true)
    try {
      await fetch("/api/auth/register", {
        method:"POST",
        headers: {
          "Content-Type" : "application/json",

        },
        body: JSON.stringify({
          name:values.name,
          email:values.email,
          password:values.password,
        }),
      }).then(async (res) => {
        const result = await res.json()
        if(result.status == 201){
          alert(result.message)
          router.push("/login")
        }else{
          renderError(result.message);
          resetForm();
        }

        setFormSubmitting(false)
      })
    } catch (error) {
      setFormSubmitting(false)
      renderError("Erro ao criar conta,tente mais tarde")
    }
  }

  function renderError(msg) {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000)
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
              <Button 
              type="submit" 
              text={isFormSubmitting ? "Carregando..." : "Inscrever-se"}
              disabled={isFormSubmitting}
              className=" bg-red-200 rounded border border-solid p-2 text-black-500" />
              {!values.name && !values.email && !values.password && error && (
                <span className=' text-red-500 text-center text-sm'>{error}</span>
              )}
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
