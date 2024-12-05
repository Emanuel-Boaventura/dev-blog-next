import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório').max(100),
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('E-mail inválido')
    .max(191),
})

export type TRegisterSchema = yup.InferType<typeof registerSchema>
