import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

type SearchComponentProps = {
    setSearch: (query:string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({setSearch}) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setSearch(event.currentTarget.value);
    }

    return(
        <div className="flex w-full max-w-sm mb-3 mt-3 justify-items-end">
            <Input type="name" placeholder="Search ..." onChange={handleChange} />
            <Button type="submit" onClick={()=>handleChange}><Search/></Button>
        </div>
    )
}

export default SearchComponent;