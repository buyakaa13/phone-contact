import { Button } from "@/components/ui/button";
import { UserRoundPlus } from 'lucide-react';
import Modal from "../Modal";
import {Contact} from '../../Model/Contact';

type ButtonComponentProps = {
    isModalOpen: boolean,
    setIsModalOpen: (open: boolean) => void,
    addContact: (newContact: Contact) => void
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({isModalOpen, setIsModalOpen, addContact}) => {
    return(
        <div className="text-start mt-3" onClick={()=> setIsModalOpen(true)}>
            <Button type="submit"><UserRoundPlus/></Button>
            { isModalOpen && <Modal setIsModalOpen={setIsModalOpen} addContact={addContact}/>}
        </div>
    )
}

export default ButtonComponent;