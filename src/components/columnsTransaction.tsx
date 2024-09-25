'use client';

import { Button } from '@/components/ui/button.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export type Payment = {
    id: number;
    value: string;
    type: string;
    wording: string;
    date: string;
    simplified_wording: string;
    original_wording: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Date
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
    },
    {
        accessorKey: 'wording',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Titre
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div>
                    {row.getValue('wording')
                        ? row.getValue('wording')
                        : row.getValue('simplified_wording')
                          ? row.getValue('simplified_wording')
                          : row.getValue('original_wording')}
                </div>
            );
        },
    },
    {
        accessorKey: 'value',
        header: () => <div className='text-right'>Value</div>,
        cell: ({ row }) => {
            const value = parseFloat(row.getValue('value'));
            const formatted = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
            }).format(value);

            return <div className='text-right font-medium'>{formatted}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const payment = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id.toString())}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
