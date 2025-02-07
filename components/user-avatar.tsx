import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
  image?: string
}

export function UserAvatar({ name, image }: UserAvatarProps) {
  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  )
}

