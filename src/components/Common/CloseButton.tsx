import { IoClose } from 'react-icons/io5'

type CloseButtonProps = {
  onClick: () => void
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Đóng video quảng cáo"
      className="flex h-4 w-4 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
    >
      <IoClose size={16} />
    </button>
  )
}
