import {React, useState} from 'react'
import {Button, Checkbox, Icon, Table} from 'semantic-ui-react';
import axios from 'axios';
import './operate.css'
import './FileUploader'
import FileUploader from './FileUploader';

const Operate = () => {
 
   const [inventory, setInventory] = useState([]); //make sure you to import useState from react

   //store the api in a variable
   const apiLink = "http://localhost:3001";
   //create a function to fetch the data
   axios.defaults.withCredentials = true;

   const handleFile = async (file) => {
    axios.defaults.withCredentials = true;
    const res = await axios.post("https://aggiereuse-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ead7772c-83e6-4822-8073-86f344fb25d4/detect/iterations/Iteration2/image", { headers: { "Access-Control-Allow-Origin": ["http://localhost:3000", "https://aggiereuse-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ead7772c-83e6-4822-8073-86f344fb25d4/detect/iterations/Iteration2/image"], "Prediction-Key": "f9fcfb6bee454710942721de1cde51b0", "Content-Type": "application/octet-stream"}, body: {file}})
    console.log(res);
   }

   const fetchData = async () => {
       const res = await axios.get(`${apiLink}/inventory`);
       console.log(res);
       setInventory(res.data.data.rows);
   }

//    const createData = async () => {
//        await axios.post(`${apiLink}/`, { headers: { Accept: "application/json", "Access-Control-Allow-Origin": "*" } });
//    }

//    const dropTable = async () => {
//        await axios.post(`${apiLink}/drop`, { headers: { Accept: "application/json", "Access-Control-Allow-Origin": "*" } });
//    }

   return (
       <div className='operate-container'>
           {/*Fetch data from url*/}

           {/*data from api goes here*/}
           <Table celled compact definition className='custom-table'>
               <Table.Header fullWidth>
               <Table.Row>
                   <Table.HeaderCell />
                   <Table.HeaderCell>Week</Table.HeaderCell>
                   <Table.HeaderCell>Day</Table.HeaderCell>
                   <Table.HeaderCell>Date</Table.HeaderCell>
                   <Table.HeaderCell>Timestamp</Table.HeaderCell>
                   <Table.HeaderCell>Dress</Table.HeaderCell>
                   <Table.HeaderCell>Cap</Table.HeaderCell>
                   <Table.HeaderCell>Pants</Table.HeaderCell>
                   <Table.HeaderCell>Shirt</Table.HeaderCell>
                   <Table.HeaderCell>Shoes</Table.HeaderCell>
                   <Table.HeaderCell>Shorts</Table.HeaderCell>
                   <Table.HeaderCell>T-shirt</Table.HeaderCell>
               </Table.Row>
               </Table.Header>

               <Table.Body>
               {
                   inventory.map((data,i) => (
                       <Table.Row key={i}>
                           <Table.Cell collapsing>
                               <Checkbox slider />
                           </Table.Cell>
                           <Table.Cell>{data.Week}</Table.Cell>
                           <Table.Cell>{data.Day}</Table.Cell>
                           <Table.Cell>{data.Date}</Table.Cell>
                           <Table.Cell>{data.Timestamp}</Table.Cell>
                           <Table.Cell>{data.Dress}</Table.Cell>
                           <Table.Cell>{data.Cap}</Table.Cell>
                           <Table.Cell>{data.Pants}</Table.Cell>
                           <Table.Cell>{data.Shirt}</Table.Cell>
                           <Table.Cell>{data.Shoes}</Table.Cell>
                           <Table.Cell>{data.Shorts}</Table.Cell>
                           <Table.Cell>{data["T-Shirt"]}</Table.Cell>
                       </Table.Row>
                   ))
               }
               </Table.Body>

               <Table.Footer fullWidth>
               <Table.Row>
                   <Table.HeaderCell>
                   </Table.HeaderCell>
                   <Table.HeaderCell colSpan='5'>
                   <Button
                       floated='left'
                       icon
                       labelPosition='right'
                       primary
                       size='small'
                   >
                       <Icon name='user' /> Add Item
                   </Button>

                <Button size='small' onClick={fetchData}>Load</Button>
                {/* <Button size='medium' floated='right'>Upload</Button> */}
                <FileUploader handleFile={handleFile}/>
                   {/* <Button size='small' disabled>
                       Delete Selected
                   </Button>  */}
                   {/* <Button floated='right' size='small' color='red' onClick={dropTable}>
                       Delete All
                   </Button> */}
                   </Table.HeaderCell>
               </Table.Row>
               </Table.Footer>
           </Table>
       </div>
   );
}

export default Operate;