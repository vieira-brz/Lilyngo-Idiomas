"use client"

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

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

    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl().then((response) => {
                if (response.data) {
                    window.location.href = response.data
                }
            }).catch(() => toast.error('Something went wrong.'))
        })
    }

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src='/heart.svg' height={60} width={60} alt="Hearts" style={{ filter: 'hue-rotate(240deg)' }} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
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
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image src={'/unlimited.svg'} alt="'Unlimited" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited Hearts
                    </p>
                </div>
                <Button disabled={pending} onClick={onUpgrade}>
                    {hasActiveSubscription ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    )
}

export default Items
