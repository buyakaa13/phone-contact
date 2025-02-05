import "./style.css";

type ScrollComponentProps={
  setSearch: (query:string, filterType: string) => void
}

const ScrollComponent: React.FC<ScrollComponentProps> = ({setSearch}) => {
  function handleChange(i: number){
    setSearch(String.fromCharCode(65 + i), 'startsWith');
  }

  return (
        <div className="h-full w-10 overflow-y-scroll scroll-smooth absolute right-0 top-0 text-gray-600 ">
            {Array.from({ length: 26 }, (_, i) => (
        <p key={i} className="py-2 hover-text" onClick={()=> handleChange(i)}>{String.fromCharCode(65 + i)}</p>
        ))}
        </div>
  );
}

export default ScrollComponent;
