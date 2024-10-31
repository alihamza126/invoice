"use client"

import React, { useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export function Comboboxtax({ products, value, onChange }) {
    const [open, setOpen] = useState(false)
    const [productsData, setProductsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

    useEffect(() => {
        setProductsData(products)
    }, [products])

    // Filtered products based on the search term
    const filteredProducts = productsData.filter((product) =>
        product.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-blue-600"
                >
                    {value
                        ? productsData.find((product) => product.value === value)?.label
                        : "Select State..."}
                    <FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Search state..."
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                    />
                    <CommandList>
                        {filteredProducts.length === 0 ? (
                            <CommandEmpty>No matches found.</CommandEmpty> // Show message when no matches
                        ) : (
                            <CommandGroup>
                                {filteredProducts.map((product) => (
                                    <CommandItem
                                        key={product.value}
                                        value={product.value}
                                        onSelect={(currentValue) => {
                                            setOpen(false);
                                            onChange(currentValue);
                                        }}
                                    >
                                        <FaCheck
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === product.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {product.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
