import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Mail, Phone, Ellipsis, Trash2, Pencil} from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
  
function CardComponent(){
    return(
            <Card className="w-[300px] border border-gray-200 shadow-md text-gray-600 bg-white">
                <CardHeader>
                    <div className="grid grid-cols-4 pb-3 border-b border-gray-200">
                        <div>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='col-span-2 content-center justify-items-start'>
                            <CardTitle>John Doe</CardTitle>
                        </div>
                        <div className='content-center justify-items-end'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Ellipsis/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 text-gray-600">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Pencil/>Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Trash2/>Delete
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