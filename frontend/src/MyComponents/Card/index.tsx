import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Mail, Phone, Ellipsis, Trash2, Pencil, Star} from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Contact} from '../../Model/Contact';
import { useNavigate } from "react-router-dom";

type CardComponentProps = {
    data: Contact;
    updateBookmark: (id: string, contact: Contact) => void,
    deleteContact: (id: string) => void,
  };

const CardComponent: React.FC<CardComponentProps> = ({data, updateBookmark, deleteContact}) => {
    function handleChange(id: string, data: Contact){
        data.bookmarked = !data.bookmarked;
        updateBookmark(id, data);
    }
    const navigate = useNavigate();
    return(
            <Card className="w-[280px] border border-gray-200 shadow-md text-gray-600 bg-white mb-3">
                <CardHeader>
                    <div className="grid grid-cols-4 pb-3 border-b border-gray-200">
                        <div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>{data.name.substring(0,2) ?? 'UN'}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='col-span-2 content-center justify-items-start'>
                            <CardTitle>{data.name}</CardTitle>
                        </div>
                        <div className='content-center justify-items-end'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Ellipsis/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 text-gray-600 bg-white border-gray-200 ">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="hover:bg-gray-200" onClick={()=> navigate('/update', {state: data})}>
                                        <Pencil className="fill-green-400"/>Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-200" onClick={()=>{deleteContact(data.id)}}>
                                        <Trash2 className="fill-red-500"/>Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-200" onClick={()=>{handleChange(data.id, data)}}>
                                        <Star className="fill-yellow-300"/>Bookmark
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <Mail className='w-4 h-4'/>
                            <p className='text-sm'>test@email.com</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Phone className='w-4 h-4'/>
                            <p className='text-sm'>1234567890</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
    )
}

export default CardComponent;