import CardComponent from '../Card';
import { PageComponent } from '../PageComponent';

function Panel(){
    return (
        <div className="bg-gray-100 rounded-lg p-3">
            <h1 className="mb-5 text-left text-gray-600">Group</h1>
            <CardComponent/>
            <PageComponent/>
        </div>
    )
}

export default Panel;