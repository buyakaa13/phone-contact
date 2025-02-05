import CardComponent from '../Card';
import PageComponent from '../PageComponent';
import {Contact} from '../../Model/Contact';

type PanelProps={
    dataItem: Contact[],
    updateBookmark: (id: string, contact:Contact) => void,
    deleteContact: (id: string) => void,
}

const Panel: React.FC<PanelProps> = ({dataItem, updateBookmark, deleteContact})=>{
    return (
        <div className='bg-gray-100 rounded-lg p-3 max-w-screen-xl'>
            <h1 className="mb-5 text-left text-gray-600 font-poppins text-xl font-bold">List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                { dataItem.map((item)=><CardComponent key={item.id ?? 0} data = {item} updateBookmark={updateBookmark} deleteContact={deleteContact}/>)}
            </div>
            <PageComponent/>
        </div>
    )
}

export default Panel;