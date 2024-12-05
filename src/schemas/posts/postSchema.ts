import * as yup from 'yup'

export const postSchema = yup.object().shape({
  title: yup.string().required('Campo obrigatório').max(100),
  description: yup.string().required('Campo obrigatório'),
})

export type TPostSchema = yup.InferType<typeof postSchema>
