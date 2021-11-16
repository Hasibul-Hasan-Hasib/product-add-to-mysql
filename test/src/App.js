/* eslint-disable no-unused-expressions */
import './App.css';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Axios from 'axios';

function App() {
  const { register, handleSubmit,reset } = useForm();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);

  const onSubmit = data => {
    setName(data.name);
    setDescription(data.description);
    reset();
  };
  
  useEffect(() => {
    
    if (name && description) {
      Axios.post('http://localhost:3100/add', {
        name: name,
        description: description
      }).then(console.log("added"));
      console.log('clicked')
    }
    
    Axios.get('http://localhost:3100/products').then(response => {
      console.log(response)
      setTableData(response.data);
    });

  }, [description]);


  return (
    <div className="App">
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              tableData.map(product => <tr key={product.ID}>
                <td>{product.ID}</td>
                <td>{product.Name}</td>
                <td>{product.Description}</td>
              </tr>)
            }
          </tbody>
        </Table>
      </div>
      <div className="input-field">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control {...register("name", { required: true })} placeholder='Name' />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Description</Form.Label>
            <Form.Control type="text" {...register("description", { required: true })} placeholder='Description' as="textarea" rows={3} />
          </Form.Group>
          <input type="submit" />
        </Form>
      </div>
    </div>
  );
}

export default App;
