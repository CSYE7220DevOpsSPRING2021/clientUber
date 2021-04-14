import React from "react";
import {
    Divider,
    Grid,
    Segment,
  } from 'semantic-ui-react'
import MyMapComponent from "../mapview/MyMapComponent"

import DataForm from "../Dataform/DataForm"

export default function BookingPage(){
  const [pathCoordinates, setpathCoordinates] = React.useState([{ lat: 42.3600825, lng: -71.0588801 },
    { lat: 42.3600825, lng: -71.0588801 }]);

    return(
        <Segment placeholder raised>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical></Divider>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
          <DataForm
          setpathCoordinates={setpathCoordinates}/>
        </Grid.Column>

        <Grid.Column>
        <MyMapComponent
         isMarkerShown={false}
         pathCoordinates={pathCoordinates}
         />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
    );
}