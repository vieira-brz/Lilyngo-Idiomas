import FeedWrapper from "@/components/feed-wrapper"
import StickyWrapper from "@/components/sticky-wrapper"
import UserProgress from "@/components/user-progress"
import { getUserProgress, getUserSubs } from "@/db/queries"
import Image from "next/image"
import { redirect } from "next/navigation"
import Items from "./items"

const ShopPage = async () => {
  
    const userProgressData = getUserProgress()
    const userSubsData = getUserSubs()

    const [userProgress, userSubs] = await Promise.all([userProgressData, userSubsData])

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses')
    }

    const isPro = !!userSubs?.isActive

    return (
    <div className="flex fle-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={isPro} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
            <Image src={'/shop.svg'} alt="Shop" height={90} width={90} />
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Shop
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                Spend your points on cool stuff.
            </p>
            <Items hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={isPro} />
        </div>
      </FeedWrapper>
    </div>
  )
}

export default ShopPage
