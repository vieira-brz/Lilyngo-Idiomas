import { redirect } from "next/navigation"
import FeedWrapper from "@/components/feed-wrapper"
import StickyWrapper from "@/components/sticky-wrapper"
import Header from "./header"
import UserProgress from "@/components/user-progress"
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries"
import Unit from "./unit"

const LearnPage = async () => {

    const userProgressData = getUserProgress()
    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage()
    const unitsData = getUnits()

    const [userProgress, courseProgress, lessonPercentage, units] = await Promise.all([userProgressData, courseProgressData, lessonPercentageData, unitsData])

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses')
    }

    if (!courseProgress) {
        redirect('/courses')
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} hasActiveSubscription={false} />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {
                    units.map((unit) => (
                        <div key={unit.id} className="mb-10">
                            <Unit id={unit.id} order={unit.order} description={unit.description} lessons={unit.lessons} title={unit.title} activeLesson={courseProgress.activeLesson} activeLessonPercentage={lessonPercentage} />
                        </div>
                    ))
                }
            </FeedWrapper>
        </div>
    )
}

export default LearnPage
