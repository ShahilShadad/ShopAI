import { CheckIcon } from "@heroicons/react/24/outline"

type CardProps = {
    recomendations1: string
    recomendations2: string
    recomendations3: string
    recomendations4: string
}
const SummaryAI = ({recomendations1, recomendations2, recomendations3, recomendations4}:CardProps) => {
    return(
        <>
        <div className="bg-white shadow-md rounded-2xl text-black w-full border border-gray-100" >
            <div className="p-5">
                <h1 className="font-bold text-[15px] lg:text-[22px]">Recomendaciones IA</h1>
            </div>
            
            <div className="flex flex-col gap-3 px-5 pb-5">
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendations1}</p>

                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendations2}</p>

                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendations3}</p>

                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendations4}</p>

                </div>
            </div>
        </div>
        </>
    )
}

export default SummaryAI