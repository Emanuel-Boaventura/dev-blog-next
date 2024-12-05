import * as yup from 'yup'

export const updateProfileSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório').max(100),
  email: yup
    .string()
    .required('Campo obrigatório')
    .email('E-mail inválido')
    .max(191),
})

export type TUpdateProfileSchema = yup.InferType<typeof updateProfileSchema>
