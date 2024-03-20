//THIRD PARTY MODULES
import { cookies } from 'next/headers'
import { SiteContentComponent } from '@prisma/client'
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators'
//SHARED
import { apiServer } from '_@shared/utils/apiServer'
//RELATIVE MODULES
import Auth from './comps/Auth'

const components = [SiteContentComponent.AUTH_SLIDE]

const getPageContentAuth = async () => {
  try {
    const locale = cookies().get('NEXT_LOCALE')?.value || 'en'
    const data = await apiServer.siteContent.getSiteContentByComponent.query({
      language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
      components,
    })

    if (!data.status) {
      throw new Error('Failed to fetch data')
    }

    const sortData = data.data
      ?.map((item) => {
        if (!item) return null
        return {
          title: item.title,
          mediaUrl: item.mediaUrl,
          description: item.description,
        }
      })
      .filter(Boolean)

    return {
      isError: false,
      data: sortData,
    }
  } catch (e) {
    return {
      isError: true,
      data: dataMockupWhenFailed,
    }
  }
}

export type PageContent = Awaited<ReturnType<typeof getPageContentAuth>>

export default async function AuthPage() {
  const data = await getPageContentAuth()
  return <Auth pageContent={data} />
}

const dataMockupWhenFailed = [
  {
    title: 'Slide 1',
    mediaUrl: '/img/auth/1.jpg',
    description:
      'Our coverage will allow our Internet users and consumers to discover and order authentic, diversified West African food & drinks - a wonderful representation of gastronomy and culinary arts. We will expand the geographical reach that will start from the Ivory Coast and go through other countries of the ECOWAS zone such as Ghana, Cameroon, Senegal, Nigeria, Guinea (Conakry), and Sierra Leone.',
  },
  {
    title: 'Slide 2',
    mediaUrl: '/img/auth/2.jpg',
    description:
      'Our goal is to develop and make known the gastronomic culinary art of the Ivory Coast and its four great ethnic groups (The Mande in the North-West, The Voltaïques or the Gour in the North-East, The Krou in the South-West, The Akan in the South-East), as well as some countries of the ECOWAS region such as Ghana (Gas, Akyems, Konkombas, and Dagaris), Nigeria (Yoruba, Hausa, Igbo, and Fulani), Senegal (Wolofs, Lebous, Fulani, and Toucouleurs), Cameroon (Bamileke), Guinea Conakry (Malinke and Soussou), Sierra Leone (Mende, Temne, and Krio).',
  },
  {
    title: 'Slide 3',
    mediaUrl: '/img/auth/3.jpg',
    description:
      'We use food and more specifically gourmet culinary arts as a common denominator to present a yet-to-be-discovered side of Africa to the world. We believe that learning, exploring other cultures, and sharing culinary experiences can help people build bridges while indulging in new sensory journeys. We learn more about our common humanity by bonding around the subtleties and flavors of great food.',
  },
  {
    title: 'Slide 4',
    mediaUrl: '/img/auth/4.jpg',
    description:
      'West Africa is home to many different ethnic and social groups. This refined cultural diversity is at the service of complementary culinary wealth we want to promote and share with the world.',
  },
]
