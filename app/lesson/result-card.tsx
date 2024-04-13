import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    value: number;
    variant: "points" | "hearts";
}

const ResultCard = ({ variant, value }: Props) => {

    const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg"

    return (
        <div className={cn(
            "rounded-2xl border-2 w-full",
            variant === "points" && "bg-orange-400 border-orange-400",
            variant === "hearts" && "bg-indigo-500 border-indigo-500"
        )}>
            <div className={cn(
                "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                variant === "hearts" && "bg-indigo-500",
                variant === "points" && "bg-orange-500"
            )}>
                {variant === "hearts" ? "Hearts Left" : "Total XP"}
            </div>

            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                variant === "points" && "text-orange-500",
                variant === "hearts" && "text-indigo-500"
            )}>
                <Image alt={'Icon'} src={imageSrc} width={30} height={30} className="mr-1.5" style={variant === "hearts" ? { filter: 'hue-rotate(240deg)' } : null} />
                {value}
            </div>
        </div>
    )
}

export default ResultCard
