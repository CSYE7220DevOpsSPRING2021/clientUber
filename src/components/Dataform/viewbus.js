import { Button, Form, Dropdown, Table } from 'semantic-ui-react'
export default function Viewbus({busNumber,CheckBook}){
    console.log('rendering with busNumber',busNumber)
    return(
        <Table singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Bus No</Table.HeaderCell>
                            <Table.HeaderCell>Source</Table.HeaderCell>
                            <Table.HeaderCell>destination</Table.HeaderCell>
                            <Table.HeaderCell>Book</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                   <Table.Body>
                      {busNumber.map((row)=>(
                            <Table.Row>                               
                                <Table.Cell>{row.Number}</Table.Cell>
                                    <Table.Cell>{row.Depart}</Table.Cell>
                                    <Table.Cell>{row.Arrive}</Table.Cell>
                                    <Table.Cell><Button onClick={(row)=>CheckBook(row)} value={row.Number}>book</Button></Table.Cell>
                            </Table.Row>
                      ))} 
                       
                   </Table.Body>
                </Table>
    )
}