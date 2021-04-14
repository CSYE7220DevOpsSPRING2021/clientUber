import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
  } from 'semantic-ui-react'
import MyMapComponent from "../mapview/MyMapComponent"

import DataForm from "../Dataform/DataForm"

export default function BookingPage(){
    return(
        <Segment placeholder raised>
    <Grid columns={2} stackable textAlign='center'>
      <Divider vertical></Divider>

      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
          <DataForm/>
        </Grid.Column>

        <Grid.Column>
        <MyMapComponent isMarkerShown={false}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
    );
}