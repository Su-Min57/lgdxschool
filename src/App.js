import './App.css';
import React from "react";

import {Paper, List, Container} from "@material-ui/core"
//위처럼 {}중괄호가 있으면 불러오려는 것과 이름이 같아야함(부분은 이름이 같아야함) 

import ToDo from './ToDo';
import AddToDo from './AddToDo';
import { call } from './service/ApiService';
//import {}중괄호가 없으면 이름이 달라도 된다.(전체는 이름이 달라도 된다)
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {items:[]};
  }


  componentDidMount(){
    call("/todotodotodo","GET", null)
    .then((response) => this.setState({items:response.list}))
    //console.log("컴포넌트가 메모리 할당을 받음");
    //요청 옵션을 생성
    //const requestoptions = {
    //   method:"GET",
    //   headers:{"Content-Type":"application/json"}
    // };
    
    // fetch("http://localhost:8000/todotodotodo", requestoptions)
    // .then((response) => response.json())
    // .then((response) => {
    //   this.setState({items:response.list})
    // },
    // (error) => {
    //   console.log(error)
    // })
  }


  //데이터 추가를 위한 함수
  //Item 1개를 받아서 items에 추가하는 함수
  add = (item) => {
    item.userid="hera";
    call("/todotodotodo", "POST", item)
    .then((response) => this.setState({items:response.list}))
  }
  
  //데이터를 삭제하는 함수
  delete = (item) => {
    item.userid="hera";
    call("/todotodotodo", "DELETE", item)
    .then((response) => this.setState({items:response.list}))

    //state를 변경해서 데이터를 재출력
    //this.setState({items:newItems}, ()=> {
     // console.log(item.id + "가 제거되었습니다.") ;
    //})

  }

  //데이터를 수정하는 함수
  update = (item) => {
    item.userid="hera"
    call("/todotodotodo", "PUT", item)
    .then((response) => this.setState({items:response.list}))
  }

  render(){
    //map: 데이터의 모임을 순회하며 함수를 적용해 함수의 리턴값을 가지고 
    //데이터의 모임을 만들어주는 함수
    //데이터 변환에 활용
    //데이터 개수에 따라 다르게 반응하도록 작성
    var todoItems = this.state.items.length > 0 && (
      <Paper style = {{margin:16}}>
        <List>{this.state.items.map((item, idx) => (
          <ToDo item={item} key={item.id} delete={this.delete} 
          update={this.update} />
        ))}
        </List>
      </Paper>
    )

    return(
      <div className="App">
        <Container maxWidth="md">
          <AddToDo add={this.add}/>
          {todoItems}
        </Container>
      </div>
    )
  }
}

export default App;
