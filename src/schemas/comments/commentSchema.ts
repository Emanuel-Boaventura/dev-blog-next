import * as yup from 'yup'

export const commentSchema = yup.object().shape({
  description: yup.string().required('Campo obrigatório'),
})

export type TCommentSchema = yup.InferType<typeof commentSchema>
