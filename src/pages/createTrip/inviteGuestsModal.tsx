import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
    closeGuestModal: () => void,
    emailToInvite: string[],
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void,
    removeEmailFromInvites: (emial: string) => void

}

export function InviteGuestsModal({
    closeGuestModal, 
    addNewEmailToInvite, 
    emailToInvite, 
    removeEmailFromInvites
}: InviteGuestsModalProps){
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center"> {/*Desfoque no fundo*/}
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5"> {/*Conteiner do Modal de Convidados*/}
            <div className="space-y-2">

              {/*Parte Superior do Modal (titulo e botao de fechar)*/}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar Convidados:</h2> 
                <button>
                  <X onClick={closeGuestModal} className="size-5 text-zinc-400" />
                </button>
              </div>
  
              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mail para confirmar participação na viagem
              </p>

            </div>

            {/*Conteiner com emails */}
            <div className="flex flex-wrap gap-2">
              {
                emailToInvite.map( (email) => {
                  return (
                    <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                      <span className="text-zinc-300">{email}</span>
                      <button onClick={() => removeEmailFromInvites(email)}>
                        <X  className="size-4 text-zinc-400"/>
                    </button>
                    </div>
                )})
              }
            
            </div>

            {/* Separador */}
            <div className="w-full h-px bg-zinc-800" />
            
            {/*Input de inserção de convidado*/}
            <form onSubmit={addNewEmailToInvite} className=" p-2.5 bg-zinc-950 border-zinc-800 rounded-lg flex items-center gap-2">

              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className=" size-4 text-zinc-400"/>
                <input type="email" name="email" placeholder="Digite o email do convidado" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
              </div>

              <Button type="submit" variant='primary'>
                Convidar
                <Plus className="size-5"/>
              </Button>
            </form>

          </div>
        </div>
    )
}