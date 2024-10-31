"use client";

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
            quantity: product.productQuantity, // Capture productQuantity
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
            <PopoverContent className="w-full p-0">
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
                                        // Only allow selection if quantity is greater than 0
                                        if (product.quantity > 0) {
                                            setOpen(false);
                                            onChange(product.value, product.price);
                                        }
                                    }}
                                    className={product.quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}
                                >
                                    <FaCheck
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === product.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex justify-between w-full gap-1">
                                        <span className={product.quantity === 0 ? "line-through text-gray-500" : ""}>
                                            {product.label} {product.quantity > 0 ? <span className="text-gray-500">({product.quantity})</span>:<span className="text-gray-500">(0)</span>}
                                        </span>
                                        <span className="text-gray-500 ms-2">${product.price}</span>
                                        {product.quantity === 0 && (
                                            <span className="text-red-500 text-xs ml-2">Out of stock</span>
                                        )}
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
