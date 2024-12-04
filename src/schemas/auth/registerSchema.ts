import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('E-mail inválido'),
})

export type TRegisterSchema = yup.InferType<typeof registerSchema>
