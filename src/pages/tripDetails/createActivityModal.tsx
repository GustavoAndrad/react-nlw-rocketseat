import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CrateAticityModalProps{
    closeActivityModal: ()=> void
}

export function CreateActivityModal({
    closeActivityModal
}: CrateAticityModalProps){

    const { tripId } = useParams();

    
    async function createActivity(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        
        const data = new FormData(event.currentTarget)
        const title = data.get('title')?.toString()
        const occurs_at = data.get('occurs_at')?.toString()

        const response = await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at
          })
      
        console.log(response.data);

        window.document.location.reload()
    }


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> {/*Desfoque no fundo*/}
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5"> {/*Conteiner do Modal de Confirmação*/}
            <div className="space-y-2">
    
                {/*Parte Superior do Modal (titulo e botao de fechar)*/}
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Cadastrar Atividades</h2> 
                <button>
                    <X onClick={closeActivityModal} className="size-5 text-zinc-400" />
                </button>
                </div>
    
                <p className="text-sm text-zinc-400">
                Todos os convidados podem ver as atividades.
                </p>
    
            </div>
            
            {/*Formulário de dados de confirmação do usuário*/}
            <form onSubmit={createActivity} className="space-y-3">
    
                <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className=" size-4 text-zinc-400"/>
                <input type="text" name="title" placeholder="Qual a atividade?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
                </div>

                <div className="flex items-center gap-2">

                <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
                    <Calendar className=" size-4 text-zinc-400"/>
                    <input type="datetime-local" name="occurs_at" placeholder="Data e Horário" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 [color-scheme:dark]"/>
                </div>
                </div>

                <Button variant="primary" size="full">
                    Salvar Atividade
                </Button>
            </form>
    
            </div>
        </div>
    )
}