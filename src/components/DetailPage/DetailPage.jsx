import datapoint from "../../dataValues/datapoints"
import { Table } from 'semantic-ui-react'

export default function DetailPage(){
    return(
    <Table singleLine>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Registration Date</Table.HeaderCell>
            <Table.HeaderCell>Route No</Table.HeaderCell>
            <Table.HeaderCell>Source</Table.HeaderCell>
            <Table.HeaderCell>destination</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
            {datapoint.map((row)=>(
                <Table.Row>
                        <Table.Cell>{row.username}</Table.Cell>
                        <Table.Cell>{row.date}</Table.Cell>
                        <Table.Cell>{row.routeno}</Table.Cell>
                        <Table.Cell>{row.starttime}</Table.Cell>
                        <Table.Cell>{row.endtime}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>


    </Table>);
}