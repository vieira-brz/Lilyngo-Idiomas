import { getLesson, getUserProgress, getUserSubs } from "@/db/queries"
import { redirect } from "next/navigation"
import Quiz from "../quiz"

type Props = {
    params: {
        lessonId: number;
    }
}

const LessonIdPage = async ({ params }: Props) => {

    const lessonData = getLesson(params.lessonId)
    const userProgressData = getUserProgress()
    const userSubsData  = getUserSubs()

    const [lesson, userProgress, userSubs] = await Promise.all([
        lessonData,
        userProgressData,
        userSubsData
    ])

    if (!lesson || !userProgress) {
        redirect('/learn')
    }

    const initialPercentage = lesson.challenges.filter((challenge) => challenge.completed).length / lesson.challenges.length * 100

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userSubs}
        />
    )
}

export default LessonIdPage
