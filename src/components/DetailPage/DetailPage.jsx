import datapoint from "../../dataValues/datapoints"
import { Table } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import variable from "../../dataValues/const"
const localStorageAuthKey = 'twtr:auth';
function getAccessToken() {
  if (typeof Storage !== 'undefined') {
      try {
        var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
        return keys.access;
        // the refresh token is keys.refresh

      } catch (ex) {
          console.log(ex);
      }
  } else {
      // No web storage Support :-
  }
}
export default function DetailPage(){
    const [busList, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);   
  
  useEffect(() => {
    const fetchData = async () => {
        const access_token = getAccessToken();
        const config = {
            method: 'GET',
            headers: {
                'Authorization': "Bearer "+access_token
            },
          }
	  const res = await fetch(variable.backEndApi+'/booking/getlist',config);
      const results  = await res.json();
      console.log(results);
      setTweets(results.confirmed);
	  setLoading(false);
    };
 
    fetchData();
  }, []);
    return(
    <Table singleLine>
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>contact no</Table.HeaderCell>
            <Table.HeaderCell>Route No</Table.HeaderCell>
            <Table.HeaderCell>Source</Table.HeaderCell>
            <Table.HeaderCell>destination</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
            {busList.map((row)=>(
                <Table.Row>
                        <Table.Cell>{row.contactinfo.name}</Table.Cell>
                        <Table.Cell>{row.contactinfo.phone}</Table.Cell>
                        <Table.Cell>{row.Number}</Table.Cell>
                        <Table.Cell>{row.Depart}</Table.Cell>
                        <Table.Cell>{row.Arrive}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>


    </Table>);
}