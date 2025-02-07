import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {XMarkIcon} from "@heroicons/react/24/outline";

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (onSearch) {
            onSearch(query);
        }
    }, [query, onSearch]);

    return (
        <div className="flex w-full gap-2">
            <Input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border border-gray-300 !rounded-3 py-2 pl-3 pr-10 focus:outline-none focus:!ring-offset-0 focus:!ring-transparent"
            />
            <Button
                onClick={() => setQuery('')}
                className={`
                    text-sm !rounded-3 !text-black !bg-white border-2
                    transition-all duration-300 ease-in-out
                    ${query ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'} 
                `}
            >
                <XMarkIcon className="size-6 text-black" />
            </Button>
        </div>
    );
}

export default SearchInput;
