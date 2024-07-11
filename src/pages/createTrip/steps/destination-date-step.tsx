import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { format } from "date-fns"
import "react-day-picker/dist/style.css";

interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean,
    openGuestInput: () => void,
    closeGuestInput: () => void,
    setDestination: (destination: string) => void 
    setEventSatrtAndEndDates: (dates: DateRange | undefined) => void
    eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
    isGuestInputOpen,
    eventStartAndEndDates,
    openGuestInput,
    closeGuestInput,
    setDestination,
    setEventSatrtAndEndDates
} : DestinationAndDateStepProps){
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
        ? format(eventStartAndEndDates.from, "d' de 'LLL") + " até " + format(eventStartAndEndDates.to, "d' de 'LLL")
        : null

    function openDatePicker(){
        setIsDatePickerOpen(true)
    }

    function closeDatePicker(){
        setIsDatePickerOpen(false)
    }
    
    return(
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">

        {/* Input de Lugar */}
        <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input onChange={event=>{setDestination(event.target.value)}} disabled={isGuestInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
        </div>

        {/*Data */}
        <button onClick={openDatePicker} disabled={isGuestInputOpen}className="flex items-center gap-2 outline-none text-left w-[240px]">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 w-40 flex-1">
                {displayedDate || 'Quando?'}
            </span>
        </button>

        {/* Modal de seleção de data */}
        {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> {/*Desfoque no fundo*/}
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5"> {/*Conteiner do Modal de Confirmação*/}
            <div className="space-y-2">

                {/*Parte Superior do Modal (titulo e botao de fechar)*/}
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2> 
                <button>
                    <X onClick={closeDatePicker} className="size-5 text-zinc-400" />
                </button>
                </div>
            </div>
                <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventSatrtAndEndDates}/>     
            </div>
        </div>
        )}


        {/* Sepadardor */}
        <div className="w-px h-6 bg-zinc-800" />

        { isGuestInputOpen ? (
        /*Botão de Alterar Local e Data */
        <Button onClick={closeGuestInput} variant="secundary">
            Alterar local/data
            <Settings2 className="size-5"/>
        </Button>
        ) : (
        /* Botão de Continuar */
        <Button onClick={openGuestInput} variant="primary">
            Continuar
            <ArrowRight className="size-5"/>
        </Button>
        )}

    </div>
    )
}
