import { Text } from '@mantine/core'
import {
  Dropzone,
  FileRejection,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from '@mantine/dropzone'
import { showNotification } from '@mantine/notifications'
import { CloudArrowUp, Image as ImageIcon, X } from '@phosphor-icons/react'
import Image from 'next/image'
import { useState } from 'react'
import s from './styles.module.scss'

interface IDropzoneArea {
  setFile: (file: File | null) => void
  imageUrl?: string
}

export function DropzoneArea({ setFile, imageUrl }: IDropzoneArea) {
  const [image, setImage] = useState<string>('')

  function handleDrop(files: FileWithPath[]) {
    setFile(files[0])
    setImage(URL.createObjectURL(files[0]))

    showNotification({
      title: 'Imagem carregada!',
      message: 'Agora é só enviar o formulário!',
      color: 'teal',
    })
  }
  function handleReject(files: FileRejection[]) {
    const error = files[0].errors[0].message ?? 'Erro ao processar o Imagem'
    showNotification({
      title: 'Arquivo não processado',
      message: error,
      color: 'red',
    })
  }

  return (
    <>
      <Dropzone
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={5 * 1024 ** 2}
        multiple={false}
        accept={IMAGE_MIME_TYPE}
      >
        <div className={s.box}>
          {image ?? imageUrl ? (
            <Image
              src={image ?? imageUrl}
              width={480}
              height={480}
              alt=''
              onError={() => {
                setImage('/assets/placeholder-image.jpg')
              }}
              objectFit='cover'
              quality={100}
            />
          ) : (
            <>
              <Dropzone.Accept>
                <CloudArrowUp weight='duotone' size={48} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <X size={48} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <ImageIcon weight='duotone' size={48} />
              </Dropzone.Idle>

              <div>
                <Text>
                  Arraste uma imagem aqui ou clique para selecionar o arquivo
                </Text>
                <Text size='sm' c='dimmed' inline mt={7}>
                  A imagem não deve exceder 5mb
                </Text>
              </div>
            </>
          )}
        </div>
      </Dropzone>
    </>
  )
}
