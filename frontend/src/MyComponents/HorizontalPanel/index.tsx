import NarrowCard from '@/MyComponents/NarrowCard';
export type DataItem = { name: string };
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import logo from '../../assets/img2.png';
import { Contact } from '../../Model/Contact';

type HorizontalPanelProps = {
    data: Contact[],
    updateBookmark: (id: string, contact: Contact) => void
}

const HorizontalPanel: React.FC<HorizontalPanelProps> = ({data, updateBookmark})=>{
    return (
        <>
            <h1 className="mb-5 text-left text-gray-600 font-poppins text-xl font-bold">Favourite</h1>
            <div className='flex justify-between items-center'>
                <ScrollArea className="max-w-screen-lg whitespace-nowrap rounded-md mb-1">
                    <div className="flex space-x-4 p-4 bg-gray-100">
                        {data ? Object.entries(data).map(([key, item]) => (
                            <figure key={key} className="shrink-0">
                                <div className="overflow-hidden rounded-md">
                                    <NarrowCard key={item.id+item.name} dataItem={item} updateBookmark={updateBookmark}/>
                                </div>
                            </figure>
                        )) : 'Loading...' }
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <img src={logo} alt='Logo' className='w-40 block sm:hidden md:block'/>
            </div>
        </>
        
    )
}

export default HorizontalPanel;