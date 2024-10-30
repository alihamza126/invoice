"use client"

import React, { useEffect, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function Comboboxproducts({ products, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        setProductsData(products.map((product) => ({
            value: product.productName,
            label: product.productName,
            price: product.salePrice,
        })));
    }, [products]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-green-600"
                >
                    {value
                        ? productsData.find((product) => product.value === value)?.label
                        : "Select product..."}
                    <FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0"> {/* Increased width for price */}
                <Command>
                    <CommandInput placeholder="Search product..." />
                    <CommandList>
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                            {productsData.map((product) => (
                                <CommandItem
                                    key={product.value}
                                    value={product.value}
                                    onSelect={() => {
                                        setOpen(false);
                                        // Pass both product name and price
                                        onChange(product.value, product.price);
                                    }}
                                >
                                    <FaCheck
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === product.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex justify-between w-full">
                                        <span>{product.label}</span>
                                        <span className="text-gray-500">${product.price}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
