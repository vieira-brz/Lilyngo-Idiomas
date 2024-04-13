"use client"

import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

const POINTS_TO_REFILL = 10;

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {

    const [pending, startTransition] = useTransition()

    const onrefillHearts = () => {
        if (pending || hearts == 5 || points < POINTS_TO_REFILL) {
            return
        }

        startTransition(() => {
            refillHearts().catch(() => toast('Something went wrong.'))
        })
    }

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src='/heart.svg' height={60} width={60} alt="Hearts" style={{ filter: 'hue-rotate(240deg)' }} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refil hearts
                    </p>
                </div>
                <Button disabled={hearts === 5 || points < POINTS_TO_REFILL || pending} onClick={onrefillHearts}>
                    {
                        hearts === 5 ? 'full' : (
                            <div className="flex items-center">
                                <Image src={'/points.svg'} alt="Points" width={20} height={20} />
                                <p>50</p>
                            </div>
                        )
                    }
                </Button>
            </div>
        </ul>
    )
}

export default Items
