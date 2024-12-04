import * as yup from 'yup'

export const createPostSchema = yup.object().shape({
  title: yup.string().required('Campo obrigatório').max(100),
  description: yup.string().required('Campo obrigatório'),
})

export type TCreatePostSchema = yup.InferType<typeof createPostSchema>
