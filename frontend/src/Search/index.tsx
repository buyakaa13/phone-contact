import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

function SearchComponent(){
    return(
        <div className="grid grid-cols-3 justify-end">
            <div></div>
            <div></div>
            <div className="flex w-full max-w-sm m-3">
                <Input type="name" placeholder="Search ..." />
                <Button type="submit"><Search/></Button>
            </div>
        </div>
        
    )
}

export default SearchComponent;