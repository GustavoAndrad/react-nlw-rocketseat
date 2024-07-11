import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./inviteGuestsModal";
import { ConfirmTripModal } from "./confirmTripModal";
import { DestinationAndDateStep } from "./steps/destination-date-step";
import { InviteGuestStep } from "./steps/invite-guest-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {

  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailToInvite, setEmailToInvite] = useState([
    'convidado_obrigatorio@gmail.com'
  ])
  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventSatrtAndEndDates] = useState<DateRange | undefined>()


  function openGuestInput(){
    setIsGuestInputOpen(true);
  }
  function closeGuestInput(){
    setIsGuestInputOpen(false);
  }

  function openGuestModal(){
    setIsGuestModalOpen(true)
  }
  function closeGuestModal(){
    setIsGuestModalOpen(false)
  }

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if(!email){
      throw new Error("O email deve ser informado")
      return
    }

    if(emailToInvite.includes(email)){
      throw new Error("O emial já foi informado")
      return
    }

    console.log(`Adicionando e-mail: ${email}`)

    setEmailToInvite([
      ...emailToInvite, 
      email
    ])

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(email_to_remove: string){
    const new_email_list = emailToInvite.filter(email => email !== email_to_remove);
    setEmailToInvite(new_email_list);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailToInvite.length === 0) {
      return
    }

    if (!ownerName || !ownerEmail) {
      return
    }
    
    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      emails_to_invite: emailToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)

  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      {/* Conteiner Principal */}
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg space-y-10">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">

            {/* Conteniner de Local e Data */}
            <DestinationAndDateStep 
                isGuestInputOpen={isGuestInputOpen}
                closeGuestInput={closeGuestInput}
                openGuestInput={openGuestInput}
                setDestination={setDestination}
                setEventSatrtAndEndDates={setEventSatrtAndEndDates}
                eventStartAndEndDates={eventStartAndEndDates}
            />

            {/* Conteiner de Convidados na Viagem*/}
            { isGuestInputOpen ? (
            <InviteGuestStep 
                    emailToInvite={emailToInvite}
                    openConfirmTripModal={openConfirmTripModal}
                    openGuestModal={openGuestModal}
            />
            ): null }
          
        </div>

        {/* Aviso de rodapé */}
        <p className="text-zinc-500 text-sm">
          Ao planejar sua viagem pela plann.er você automaticamente concorda 
        <br/>
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline"  href="#">políticas de privacidade</a>.</p>
      </div>
      
      {/** Modal de Convidados */}
      {isGuestModalOpen && (
        <InviteGuestsModal 
            emailToInvite={emailToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestModal={closeGuestModal}
            removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {/*Modal de Confirmação de Viagem*/}
      {isConfirmTripModalOpen && (
      <ConfirmTripModal 
        closeConfirmTripModal={closeConfirmTripModal}
        createTrip={createTrip}
        setOwnerName={setOwnerName}
        setOwnerEmail={setOwnerEmail}
      />

      )}

    </div>
  )
}