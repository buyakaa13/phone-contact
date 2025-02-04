import { Star } from 'lucide-react';

interface NarrowCardProps {
    dataItem: any;
  }

  const NarrowCard: React.FC<NarrowCardProps> = ({ dataItem }) => {
    return (
            <div className="border border-gray-200 p-3 rounded-xl shadow-md bg-white">
                <div className='flex justify-between items-center'>
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <Star className='text-yellow-300 fill-yellow-300'/>
                </div>
              <div>
                <h3 className="font-semibold">Hello</h3>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-sm text-gray-500">San Francisco, USA</p>
              </div>
            </div>
    )
}

export default NarrowCard;
