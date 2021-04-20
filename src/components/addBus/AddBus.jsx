import cities from "../../dataValues/cities"
import { Button, Form, Dropdown, Checkbox,Segment } from 'semantic-ui-react'
import React,{ Component } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import varibale from '../../dataValues/const'
const citiesmap = cities.map((city) => ({
    key: city.rank,
    text: city.city,
    value: { name: city.city, long: city.longitude, lati: city.latitude }
}))
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
      // No web storage Support :-(
  }
}

  export default function AddBus(){
    const [source, setsource] = React.useState({name: 'Boston', long: -71.0588801, lati: 42.3600825 });
    const [desination, setdestination] = React.useState({name: 'Boston', long: -71.0588801, lati: 42.3600825 });
    const [busNumber, setbusNumber] = React.useState('');
    const [busdate, setbusdate] = React.useState(new Date());
    const [busType, setbusType] = React.useState('');
    const clear=()=>{
        setsource({name: 'Boston', long: -71.0588801, lati: 42.3600825 })
        setdestination({name: 'Boston', long: -71.0588801, lati: 42.3600825 })
        setbusNumber('')
        setbusType('')
        setbusdate(new Date())
    }
    const submitvalue=async()=>{
        
        
        const access_token = getAccessToken();
        //console.log('source ', source.name,' destination ',desination.name,' busNumber ',busNumber,' busdate ',busdate,' busType ',busType,' token ',access_token);
        let data={
            "Departtime":busdate.getUTCFullYear() +"/"+ (busdate.getUTCMonth()+1) +"/"+ busdate.getUTCDate() + " " + busdate.getUTCHours() + ":" + busdate.getUTCMinutes(),
            "Number":busNumber,
            "Depart":source.name,
            "Arrive":desination.name,
            "BusType":busType
        }
        console.log("data   ",data);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+access_token
            },
            body: JSON.stringify(data)
          }

          const response = await fetch(varibale.backEndApi+`/bus/insertone`, config);
          console.log("responce---->",response)
          if(response.status==200){
            clear()
          }
    }
    
    
    return(<>
            <Segment >
            <Form>
                    <Form.Group widths='equal'>
                    <Form.Input fluid label='Bus Number' placeholder='Bus Number' value={busNumber} onChange={(e,{value})=>{setbusNumber(value)}}/>
                    <SemanticDatepicker 
                    fluid 
                    label='Bus date' 
                    size='large' 
                    value={busdate} 
                    format={'YYYY/MM/DD'}
                    onChange={(e,{value})=>{setbusdate(value)}}/>
                    <Form.Input fluid label='Bus type' placeholder='Bus type' value={busType}  onChange={(e,{value})=>{setbusType(value)}}/>
                    </Form.Group>
                    <br/>
                    <Form.Group inline>
                    <Form.Select
                        label='source'
                        options={citiesmap}
                        value={source}
                        placeholder='Gender'
                        onChange={(e,{value})=>setsource(value)}
                    />
                    <Form.Select
                        label='destination'
                        value={desination}                        
                        options={citiesmap}
                        placeholder='Gender'
                        onChange={(e,{value})=>setdestination(value)}
                    />
                    </Form.Group>
                    <Form.Button onClick={()=>submitvalue()}>Submit</Form.Button>
                </Form>
            </Segment>
    </>)
    
}

