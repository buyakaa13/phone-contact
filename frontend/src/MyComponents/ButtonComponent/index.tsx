import { Button } from "@/components/ui/button";
import { UserRoundPlus } from 'lucide-react';

function ButtonComponent(){
    return(
        <div className="text-start mt-3">
            <Button type="submit"><UserRoundPlus/></Button>
        </div>
    )
}

export default ButtonComponent;