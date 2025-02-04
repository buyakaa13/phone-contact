import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

function SearchComponent(){
    return(
        <div className="flex w-full max-w-sm mb-3 mt-3 justify-items-end">
            <Input type="name" placeholder="Search ..." />
            <Button type="submit" onClick={()=>{console.log("Hello it is Submit button")}}><Search/></Button>
        </div>
    )
}

export default SearchComponent;