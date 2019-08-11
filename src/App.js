import React, { Component } from 'react';
import './App.css';
import { getList, additem, updateitem, deleteitem } from './ListFunctions';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'React Crud Application',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount() {
    // this.refs.name.focus();
    this.getAll();
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          datas: [...data],
          act: 0
        },
        () => {
          // console.log(this.state.datas)
        }
      )
    })
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fSubmit = (e) => {
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    if(this.state.act === 0){
      let data = {
        name, address
      }
      additem(name,address).then(()=>{
        datas.push(data);
        this.getAll();
      })
    }else{
      updateitem(name, address, datas[this.state.index].id).then(()=>{
        datas[this.state.index].name = name;
        datas[this.state.index].address = address;
        this.getAll();
      })
    }
  }

  fRemove = (i) =>{
    let datas = this.state.datas;
    deleteitem(datas[i].id);
    datas.splice(i,1);
    this.getAll();
  }

  fEdit = (i) =>{
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
     this.setState({
      act : 1,
      index :i
    });
    this.refs.name.focus();
  }

  render() {
      let datas =this.state.datas;

    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form ref="myForm" className="myForm">
          <input type='text' className="formField" ref="name" placeholder="your name"/>
          <input type='text' className="formField" ref="address" placeholder="your address"/>
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit</button>
        </form>
        { datas.length >0 &&
        <pre>
            <table className="greenTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  datas.map((data , i) =>
                    <tr key ={i} className="myList">
                      <td>{i+1}</td>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td><button onClick={()=>this.fRemove(i)} className="myTableButton">Remove</button>&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={()=>this.fEdit(i)} className="myTableButton">Edit</button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
        </pre>
        }
      </div>
    );
  }
}

export default App;
