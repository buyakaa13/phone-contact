import { Star } from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { Contact } from '@/Model/Contact';

interface NarrowCardProps {
    dataItem: Contact,
    updateBookmark: (id: string, contact: Contact) => void
}

  const NarrowCard: React.FC<NarrowCardProps> = ({dataItem, updateBookmark}) => {
    function handleChangeItem(dataItem: Contact){
      dataItem.bookmarked = !dataItem.bookmarked;
      updateBookmark(dataItem.id, dataItem);
    }
    return (
            <div className="border border-gray-200 p-3 rounded-xl shadow-md bg-white">
                <div className='flex justify-between items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>{dataItem.name.substring(0,2)}</AvatarFallback>
                        </Avatar>
                    </div>
                    <Star className='text-yellow-300 fill-yellow-300' onClick={()=>handleChangeItem(dataItem)}/>
                </div>
              <div>
                <h3 className="font-semibold">{dataItem.name}</h3>
                <p className="text-sm text-gray-600">{dataItem.email}</p>
                <p className="text-sm text-gray-500">{dataItem.phone}</p>
              </div>
            </div>
    )
}

export default NarrowCard;
