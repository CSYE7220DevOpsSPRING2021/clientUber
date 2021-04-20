import React, {useEffect}from 'react';
import { Button, Form, Dropdown, Table } from 'semantic-ui-react'
import cities from "../../dataValues/cities"
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import varibale from '../../dataValues/const'
import { CheckBoxOutlineBlank } from '@material-ui/icons';
import Viewbus from './viewbus';

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
function getusernameToken() {
    if (typeof Storage !== 'undefined') {
        try {
            var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
            return keys.username;
            // the refresh token is keys.refresh

        } catch (ex) {
            console.log(ex);
        }
    } else {
        // No web storage Support :-(
    }
}
export default function DataForm({ setpathCoordinates }) {
    const [destbool, setdestbool] = React.useState(true);
    const [source, setsource] = React.useState({ name: 'Boston', long: -71.0588801, lati: 42.3600825 });
    const [desination, setdestination] = React.useState({ name: 'Boston', long: -71.0588801, lati: 42.3600825 });
    const [busstartdate, setbusstartdate] = React.useState(new Date());
    const [busenddate, setbusenddate] = React.useState(new Date());
    const [contactno, setcontactnumber] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [buslist, setBusList] = React.useState(false);
    const [busNumber, setbusNumber] = React.useState([]);
    
    const clear = () => {
        setdestbool(true);
        setsource({ name: 'Boston', long: -71.0588801, lati: 42.3600825 })
        setdestination({ name: 'Boston', long: -71.0588801, lati: 42.3600825 })
        setbusstartdate(new Date())
        setbusenddate(new Date())
        setcontactnumber('')
        setbusNumber([])
    }
    const changeSource = (e, { value }) => {
        setsource(value);
        setdestbool(false);
    }
    const changeDestination = (e, { value }) => {

        let data = [
            { lat: source.lati, lng: source.long },
            { lat: value.lati, lng: value.long }
        ];
        setpathCoordinates(data);
        setdestination(value);
    }
    const getBusList = async () => {
        const access_token = getAccessToken();
        const data = {
            "EndTime": busenddate.getUTCFullYear() + "/" + (busenddate.getUTCMonth() + 1) + "/" + busenddate.getUTCDate() + " " + busenddate.getUTCHours() + ":" + busenddate.getUTCMinutes(),
            "StartTime": busstartdate.getUTCFullYear() + "/" + (busstartdate.getUTCMonth() + 1) + "/" + busstartdate.getUTCDate() + " " + busstartdate.getUTCHours() + ":" + busstartdate.getUTCMinutes(),
            "Depart": source.name,
            "Arrive": desination.name
        }

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + access_token
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(varibale.backEndApi + `/bus/searchbus`, config);
        const results = await response.json();
        console.log("res bus list-->", results)
        setbusNumber(()=>results.data)
        
        setTimeout(function() {
            setBusList(true);
          }, 2000);
    }
    

    const submitValue = async (v) => {
        const access_token = getAccessToken();
        const username = getusernameToken();
        const data = {
            "Number": v,
            "contactinfo": {
                "phone": contactno,
                "name": username
            },
            "Departtime": busstartdate.getUTCFullYear() + "/" + (busstartdate.getUTCMonth() + 1) + "/" + busstartdate.getUTCDate() + " " + busstartdate.getUTCHours() + ":" + busstartdate.getUTCMinutes(),
            "Depart": source.name,
            "Arrive": desination.name
        }
        console.log("data--->", data);
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + access_token
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(varibale.backEndApi + `/booking/createbooking`, config);
        console.log("res-->", response)
        if (response.status == 201) {
            clear();
        }
    }
    const CheckBook = (val) => {
        console.log("variable we got" , val.target.value)
        setNumber(val.target.value)
        
        setTimeout(function() {
            submitValue(val.target.value)
          }, 2000);

    }

    return (
        <Form>
            <Form.Field>
                <SemanticDatepicker
                    fluid
                    label='start date'
                    size='large'
                    value={busstartdate}
                    format={'YYYY/MM/DD'}
                    onChange={(e, { value }) => { setbusstartdate(value) }} />
                <SemanticDatepicker
                    fluid
                    label='end date'
                    size='large'
                    value={busenddate}
                    format={'YYYY/MM/DD'}
                    onChange={(e, { value }) => { setbusenddate(value) }} />
                <label>source</label>
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
                <label>destination</label>
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
                <label>contact no</label>
                <Form.Input placeholder='contact no' value={contactno} onChange={(e, { value }) => { setcontactnumber(value) }} />
            </Form.Field>
            <Button type='submit' onClick={getBusList}>get bus</Button>
            {buslist?
                <Viewbus
                busNumber={busNumber}
                CheckBook={CheckBook}/>
                :<></>
                }

        </Form>
    )
}