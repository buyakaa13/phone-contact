import Panel from '../Panel';
import './style.css';
import SearchComponent from '../Search';

function HomePage(){
    return (
        <>
        <div>
            <h1 className='mb-3 text-left'>CONTACTS</h1>
        </div>
        <div>
            <SearchComponent/>
        </div>
        <div className='grid grid-cols-3 gap-3'>
            <div className='col-span-2'>
                <Panel/>
            </div>
            <Panel/>
        </div>
        </>
    )
}

export default HomePage;