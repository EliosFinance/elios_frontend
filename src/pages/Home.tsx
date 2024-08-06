import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion.tsx";
import {columns} from "@/components/columnsTransaction.tsx";
import {DataTable} from "@/components/DataTable.tsx";
import {useGetConnection, useGetTransactions} from "@/api/allCall.tsx";

const Home = () => {
    const listTransaction = useGetTransactions()
    const listConnection = useGetConnection()

    console.log(listConnection.data)

    return (
        <div className="w-[100%]">
            <Card>
                <CardHeader>
                    <CardTitle>Information du compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="p-4 rounded-sm bg-blue-50">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Comptes</AccordionTrigger>
                            <AccordionContent>
                                {listConnection.data ? (
                                    listConnection.data.map((connection: any, index) => {
                                        const value = parseFloat(connection.balance)
                                        const formatted = new Intl.NumberFormat('fr-FR', {
                                            style: 'currency',
                                            currency: "EUR",
                                        }).format(value)
                                        return (
                                            <div key={index} className="flex items-center rounded bg-slate-400 text-white p-2 gap-2 justify-between">
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        src={`https://lperrenot-sandbox.biapi.pro/2.0/logos/${connection.connector_uuid}-thumbnail.webp`}
                                                        alt=""/>
                                                    <p className="font-bold text-lg">{connection.connector.name}</p>
                                                </div>
                                                <p>{formatted}</p>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>Vos comptes</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Transactions</AccordionTrigger>
                            <AccordionContent>
                                <DataTable columns={columns} data={listTransaction.data ?? []} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home;
