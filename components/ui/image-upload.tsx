'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (!isMounted) return null

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="rigth-2 absolute top-2 z-10">
              <Button
                onClick={() => onRemove(url)}
                type="button"
                size="icon"
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="qidvd6ke">
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              disabled={disabled}
              onClick={onClick}
              variant="secondary"
              type="button"
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
