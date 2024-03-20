//THIRD PARTY MODULES
import type { Prisma } from '@prisma/client'

export type SocialWall = Prisma.SocialWallGetPayload<{ include: { platformUser: true } }>
