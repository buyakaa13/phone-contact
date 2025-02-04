import NarrowCard from '@/MyComponents/NarrowCard';
export type DataItem = { name: string };
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import logo from '../../assets/img2.png';

const data: DataItem[] = [
    { name: "Alice" },
    { name: "Adam" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Catherine" },
    { name: "Dlice" },
    { name: "Edam" },
    { name: "Fob" },
    { name: "Lharlie" },
    { name: "Iatherine" },
     { name: "Edam" },
    { name: "Fob" },
    { name: "Lharlie" },
    { name: "Iatherine" },
];

const HorizontalPanel: React.FC = ()=>{
    return (
        <div className='flex justify-between items-center'>
            <ScrollArea className="max-w-screen-lg whitespace-nowrap rounded-md mb-1">
                <div className="flex space-x-4 p-4 bg-gray-100">
                    {Object.entries(data).map(([key, data]) => (
                    <figure key={key} className="shrink-0">
                        <div className="overflow-hidden rounded-md">
                            <NarrowCard dataItem={data}/>
                        </div>
                    </figure>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <img src={logo} alt='Logo' className='w-40'/>
        </div>
        
    )
}

export default HorizontalPanel;