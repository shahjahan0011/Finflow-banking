import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatAmount, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils'
  

const TransactionsTable = ({transactions}: TransactionTableProps) => {
  return (
    <div>
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className="bg-[#f9fafb]">
                <TableRow>
                <TableHead className="px-2">Transaction</TableHead>
                <TableHead className="px-2">Amount</TableHead>
                <TableHead className="px-2">Stauts</TableHead>
                <TableHead className="px-2">Date</TableHead>
                <TableHead className="px-2 max-md:hidden">Channel</TableHead>
                <TableHead className="px-2 max-md:hidden">Category</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
               {transactions.map((t: Transaction)=> {
                  const status = getTransactionStatus(new Date(t.date))
                  const amount = formatAmount(t.amount)

                  const isDebit = t.type === 'debit';
                  const isCredit = t.type === 'credit';
               
                  return(
                     <TableRow key={t.id}>
                        <TableCell>
                          <div>
                            <h1>
                              {t.name}
                            </h1>
                          </div>
                        </TableCell>
                          
                        <TableCell>
                        {isDebit ? `-${amount}` : isCredit ? amount : amount}
                        </TableCell>
                     </TableRow> 
                  )
               })} 

            </TableBody>
        </Table>
            
    </div>
  )
}

export default TransactionsTable