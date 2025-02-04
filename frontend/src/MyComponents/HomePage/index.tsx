import Panel from '../Panel';
import SearchComponent from '../Search';
import {ScrollComponent} from '../ScrollComponent';
import ButtonComponent from '@/MyComponents/ButtonComponent';
import "./style.css";
import HorizontalPanel from '@/MyComponents/HorizontalPanel';

function HomePage(){
    return (
        <div className='container grid '>
            <div className='title font-poppins text-4xl font-bold'>
                <h1 className='mb-3 text-left'>CONTACTS</h1>
            </div>
            <div className='searchComp'>
                <SearchComponent/>
            </div>
            <div className='addBtn'>
                <ButtonComponent/>
            </div>
            <div className='narrowCard'>
                <HorizontalPanel/>
            </div>
            <div className='relative panel'>
                <Panel/>
                <ScrollComponent/>
            </div>
        </div>
    )
}

export default HomePage;