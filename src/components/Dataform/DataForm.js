import React from 'react';
import { Button, Form, Dropdown, Checkbox } from 'semantic-ui-react'
import cities from "../../dataValues/cities"

const citiesmap = cities.map((city) => ({
    key: city.rank,
    text: city.city,
    value: { name: city.city, long: city.longitude, lati: city.latitude }
}))
export default function DataForm({setpathCoordinates}) {
    const [destbool, setdestbool] = React.useState(true);
    const [source, setsource] = React.useState({});
    const [desination, setdestination] = React.useState({});
    const changeSource= (e,{value})=>{
        setsource(value);
        setdestbool(false);
    }
    const changeDestination= (e,{value})=>{
        
        let data= [
            { lat: source.lati, lng: source.long },
            { lat: value.lati, lng: value.long }
          ];
          setpathCoordinates(data);
          setdestination(value);
    }


    return (
        <Form>
            <Form.Field>
                <label>First Name</label>
                <Dropdown
                    placeholder='Source'
                    fluid
                    search
                    selection
                    options={citiesmap}
                    onChange={changeSource}
                    value={source}
                />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <Dropdown
                    placeholder='destination'
                    fluid
                    search
                    selection
                    disabled={destbool}
                    options={citiesmap}
                    value={desination}
                    onChange={changeDestination}
                />
            </Form.Field>
            <Form.Field>
                <label>date</label>
                <input placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}