import { X, User, AtSign } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps{
    closeConfirmTripModal: () => void,
    createTrip: (event: FormEvent<HTMLFormElement>) => void,
    setOwnerName: (name: string) => void 
    setOwnerEmail: (email: string) => void 
}

export function ConfirmTripModal({
    closeConfirmTripModal,
    createTrip,
    setOwnerName,
    setOwnerEmail
} :ConfirmTripModalProps){
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> {/*Desfoque no fundo*/}
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5"> {/*Conteiner do Modal de Confirmação*/}
          <div className="space-y-2">

            {/*Parte Superior do Modal (titulo e botao de fechar)*/}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Confirmar Criação de Viagem</h2> 
              <button>
                <X onClick={closeConfirmTripModal} className="size-5 text-zinc-400" />
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">...</span> nas datas de <span className="text-zinc-100 font-semibold">...</span> preencha os dados abaixo:
            </p>

          </div>
          
          {/*Formulário de dados de confirmação do usuário*/}
          <form onSubmit={createTrip} className="space-y-3">

            <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <User className=" size-4 text-zinc-400"/>
              <input onChange={event=> setOwnerName(event.target.value)} type="text" name="name" placeholder="Seu nome completo" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>

            <div className="h-14 px-4 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">
              <AtSign className=" size-4 text-zinc-400"/>
              <input onChange={event=> setOwnerEmail(event.target.value)} type="email" name="email" placeholder="Seu email pessoal" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>


            <Button type="submit" variant='primary' size='full'>
              Confirmar viagem
            </Button>
          </form>

        </div>
      </div>
    )
}