import CardComponent from '../Card';
import { PageComponent } from '../PageComponent';
export type DataItem = { name: string };

const data: DataItem[] = [
    { name: "Alice" },
    { name: "Adam" },
    { name: "Bob" },
    { name: "Charlie" },
    { name: "Catherine" },
];

const groupedData = data.reduce<Record<string, DataItem[]>>((acc, item) => {
    const firstLetter = item.name[0].toUpperCase();
    acc[firstLetter] = acc[firstLetter] || [];
    acc[firstLetter].push(item);
    return acc;
}, {});

const Panel: React.FC = ()=>{
    return (
        <div className='bg-gray-100 rounded-lg p-3 max-w-screen-xl'>
            <h1 className="mb-5 text-left text-gray-600">Group</h1>
            <div className="grid grid-cols-1 md:grid-cols-4">
                { Object.entries(groupedData).map(([key, data]) =>(
                    <CardComponent key={key} data = {data}/>
                ))}
            </div>
            <PageComponent/>
        </div>
    )
}

export default Panel;