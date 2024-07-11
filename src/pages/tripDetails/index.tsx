import { Plus} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./createActivityModal";
import { ImportantLinks } from "./importantLinks";
import { Guests } from "./guest";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destinationAndDateHeader";

export function TripDetailsPage(){

    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen ] = useState(false)

    function openActivityModal(){
        setIsCreateActivityModalOpen(true)
    }

    function closeActivityModal(){
        setIsCreateActivityModalOpen(false)
    }


    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            {/*Cabeçalho */}
            <DestinationAndDateHeader />

            <main className="flex gap-16 px-4">
                {/*Conteiner de Atividades */}
                <div className="flex-1 space-y-6">

                    {/*Cabeçalho */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>

                        <button onClick={openActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                            Cadastrar Atividade
                            <Plus className="size-5"/>
                        </button>  
                    </div>

                    {/*Conteiner de Dias*/}
                    <Activities />

                </div>

                {/*Conteiner de Links e Convidados */}
                <div className="w-80 space-y-6">

                    {/*Conteiner de Links */}
                    <ImportantLinks />
                    
                    {/*Separador*/}
                    <div className="w-full h-px bg-zinc-800" />

                    {/*Conteiner de Convidados */}
                    <Guests />


                </div>
            </main>

            {/* Modal de Criação de Atividade */}    
            {isCreateActivityModalOpen && (
                 <CreateActivityModal
                    closeActivityModal={closeActivityModal}
                 />
            )

            }
        </div>
    )
}