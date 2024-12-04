import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
})

export type TLoginSchema = yup.InferType<typeof loginSchema>
