import { CheckIcon } from "@heroicons/react/24/outline"
type CardProps = {
    recomendation1: string,
    recomendation2: string,
    recomendation3: string,
    recomendation4: string,
    recomendation5: string
}
const AIRecomendations = ({recomendation1, recomendation2,recomendation3,recomendation4,recomendation5}: CardProps) => {
    return(
        <>
        <div className="bg-white shadow-md rounded-2xl text-black w-full border border-gray-100" >
            <div className="p-5">
                <h1 className="font-bold text-[15px] lg:text-[22px]">Recomendaciones IA</h1>
            </div>
            
            <div className="flex flex-col gap-3 px-5 pb-5">
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendation1}</p>

                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendation2}</p>

                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendation3}</p>

                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendation4}</p>

                </div>
                <div className="hidden xl:flex gap-4 p-4 rounded-xl bg-gray-50">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{recomendation5}</p>
                </div>
            
            </div>
        </div>
        </>
    )
}

export default AIRecomendations