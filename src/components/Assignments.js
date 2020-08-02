import React, {Component} from 'react'
import './Assignments.css'
//import {Link, RichText, Date} from 'prismic-reactjs';
import { Form } from 'semantic-ui-react'
import {add_assignments} from "./UserFunction";
import jwt_decode from 'jwt-decode'
import logo from "./Logopit.png";
import List from "./List";
import paper_plane from "./paper_plane.png";
import {create_todos, get_data, deleteTodo} from './UserFunction'
  



var colors = ['#58D3F7', '#F781F3', '#8000FF', '#A9F5D0', '#F5BCA9', '#8af'];

    var min = 0;
    var max = 4;


    // const todo = [
    //     {id:1, text:'Learn React', isCompleted: false},
    //     {id:2, text: 'Work on project', isCompleted: false}
    // ]

class Assignments extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            todolist: [],
            newtodo: '',
            deletetodolist: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const token2 = localStorage.todotoken
        const decoded2 = jwt_decode(token2)
        const token3 = localStorage.usertoken
        const decoded3 = jwt_decode(token3)
        this.setState({
            username: decoded.identity.username,
            studyprogram: decoded.identity.studyprogram,
            email: decoded.identity.email,
            notes: decoded.identity.notes,
            favoriteNote: decoded.identity.favoriteNote,
            todolist: decoded2.identity.todolist,
            tt: decoded.identity.timetable,
            deletetodolist: decoded3.identity.deletetodolist
        })
    }

    handleChange(e){
        this.setState({newtodo: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        const newTodo = {
            newtodo: this.state.newtodo,
            username: this.state.username
        }
        create_todos(newTodo).then(res => {
            window.location.reload()
        })
            .catch(err => {
                console.log(err)
            })
    }

    onDelete = (val, e) => {
        e.preventDefault()
        var data = [...this.state.todolist]
        data.filter((todo, index) =>{
            if (todo === val){
                data.splice(index, 1)
                const deleteTodoItem ={
                    deletetodo: todo,
                    username: this.state.username
                }
                deleteTodo(deleteTodoItem).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            return true
        })
        this.setState({todolist: [...data]})
    }

    renderTodoList(){
        return this.state.todolist.map((todo, index ) => {
            const {tasks} = todo
            return (
                <div key={index}>
                    <span className="item">
                        <p className="item-block">
                            <span className="item-name">
                                {todo}
                            </span>
                            <button onClick={this.onDelete.bind(this, todo)} className={"Button delete"}>-</button>
                        </p>
                    </span>
                </div>
              )
            
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const newData = {
            username: this.state.username,
                      
            todolist: decoded.identity.todolist
        }
        get_data(newData).then(res => {
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        });

    }


    // renderTableData(){
    //     return this.state.tt.map((lectures,index  ) => {
    //         const {lecture, startMo, endMo, startTu, endTu, startWe, endWe, startTh, endTh, startFr, endFr} = lectures

    //         return(
    //             <tr key={lecture}>
    //                 <td>{lecture}</td>
    //                 <td>{startMo} - {endMo}</td>
    //                 <td>{startTu} - {endTu}</td>
    //                 <td>{startWe} - {endWe}</td>
    //                 <td>{startTh} - {endTh}</td>
    //                 <td>{startFr} - {endFr}</td>
    //             </tr>
    //         )
    //     })
    // }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row first-row"></div>
                    </div>
                </div>
                <div className="row header-row">
                    <div className="col-md-5">
                        <h1 className="heading text-center display-1">{this.state.username}'s Assignments</h1>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5"></div>

                </div>
                <div className="row second-row">
                    <div className="col-md-5 ">
                        <form onSubmit={this.handleSubmit} className="input">
                            <input
                                className="add-input"
                                type = "text"
                                value = {this.state.newtodo}
                                onChange={this.handleChange}
                                required="required"
                            >
                            </input>
                            <button type={"submit"} className={"Button"}>
                                Submit
                            </button>
                        </form>
                        <div>
                            {this.renderTodoList()}
                        </div>
                    </div>
                    <div className="col-md-2" ></div>
                    <div className="col-md-5 ">
                        
                                {/* </thead>
                                <tbody>
                                {this.renderTableData()}
                                </tbody>
                            </table> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 left papper"> 
                    </div>
                    <div className="col-md-2">
                    {/* <h2 style = {notestyle}>{this.state.favoriteNote}</h2> */}
                    </div>
                    <div className="col-md-5">
                        <img src={paper_plane} width="200" alt="Paper Plane" />

                    </div>
                    <button type="submit" className="btn btn-lg btn-primary" onClick = {this.onSubmit} >
                        Refresh
                    </button>
                </div>
                </div>
        )
    }
}

export default Assignments








// class Assignments extends React.Component {

    
//   constructor(props) {
//     super(props);
//     this.state = {

//         items: [],
//         newassignment: '',
//         submission: '',
//         username: '',
//         isCompleted: false

//     };
//     this.deleteItem = this.deleteItem.bind(this);
//     this.addItem = this.addItem.bind(this);
//     this.editItem = this.editItem.bind(this);
//     this.compleateItem = this.compleateItem.bind(this);
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)

//     }


//     componentDidMount() {
//       const token = localStorage.usertoken
//         const decoded = jwt_decode(token)
//         this.setState({
//             items: decoded.identity.assignments,
//             username: decoded.identity.username

//         })
//     }

//     handleChange(e) {
//       this.setState({[e.target.name]: e.target.value})
//     }

//     handleSubmit(e) {
//         e.preventDefault()

//         const newAss = {
//             newassignment: this.state.newassignment,
//             username: this.state.username,
//             submission: this.state.submission,
//             isCompleted: this.state.isCompleted
//         }
//         add_assignments(newAss).then(res =>{
//             window.location.reload()
//         }).catch(err =>{
//             console.log(err)
//         })
//     }

//     renderAssignmentsData(){
//       return this.state.assignments.map((ass, )=>{
//           const {assignment, submission} = ass
//           return(
//               <div>
//                   {assignment} on {submission}
//               </div>
//           )
//       })
//     }

//     deleteItem=(id)=>{

//     const {items} = this.state;
//     const isNotId = item => item.id !== id;
//     const updateList = items.filter(isNotId);
//     this.setState({
//       items: updateList
//     });

//   }
//   addItem = (item) =>{
//     const {items} = this.state;
//      item.id = items.length+1;
//      item.edit = false;
//      item.compleateItem = false;
//      let updateList = [...items, item];
//      this.setState({
//         items: updateList
//       }
//      )
//       const newAss = {
//           newassignment: this.state.newassignment,
//           username: this.state.username,
//           submission: this.state.submission,
//           isCompleted: this.state.isCompleted
//       }
//       add_assignments(newAss).then(res =>{
//           // window.location.reload()
//           console.log("add new item")
//       }).catch(err =>{
//           console.log(err)
//       })
//   }

//   editItem = (id, item, e) =>{
//    const {items} = this.state;
//       item.id = items.length+1;
//       item.edit = true;
//       item.compleateItem = false;
//       let updateList = [...items, item];
//      this.setState({
//         items: updateList
//       }
//      )
//   }

// //   editItem = itemId => {
// //     let tasks = this.map(item => {
// //       if (item.id == itemId) {
// //         item.edit = !item.edit;
// //       }
// //       return item;
// //     });
// //     this.setState({tasks});
// //   }
// // onEdit = (item, itemid, e) => {
// //     e.preventDefault()
// //     this.setState({
// //         id: itemid,
// //         term: item
// //     })
// //     console.log(itemid)
// // }


//   compleateItem = (item) =>{
//     const {items} = this.state;
    
//     item.isCompleted 
//       ? item.isCompleted = false
//       : item.isCompleted = true

//     this.setState({
//       items
//     });
    
//   }
//     render() {
//         return (
//             // <div className="container">
//             //     <div className="row">
//             //         <div className="col-sm-8 mx-auto">
//             //             <h1 className="text-center">Assignments</h1>
//             //         </div>
//             //     </div>
//             // </div>
//             <div className="container">
//                 <div className="row">
//                      <div className="col-sm-5 left">
//                          <h1 className="text-center">  </h1>
//                      </div>
//                 </div>
//                     <div className="row">
//                         <div className="col-xs-7 left header-row">
//                             <h1 className="heading text-left display-3">MyBook Assignments</h1>
//                         </div>
//                         {/* <div className="col">
//                         </div> */}
//                         <div className="col-sm-5 right header-row">
//                             <h1 className="heading text-center display-3">Add Assignments</h1>
                        
//                         </div>
//                     </div>


//                 {/* <div className="row">
//                     <div className="col">
//                      <h1>MyBook Assignments</h1>
//                     </div>
//                     <div className="col">
//                     </div>
//                     <div className="col">
//                      <h1>Add Assignments</h1>
//                     </div>
//                 </div> */}
                
                    
//                     <Input addItem={this.addItem} super={this.setState}/>
//                     <div>
//                     <Items items = {this.state.items} deleteItem={this.deleteItem} compleateItem={this.compleateItem} editItem={this.editItem} super={this.setState} className="items"/>
//                     </div>
//             </div>
            
//         );
//     }
// }



// const Items = ({items, deleteItem, editItem, compleateItem}) => {
//     const itemList = items.length ? (
//         items.map(item=>
//             <div key={item.id}>
//                 <span className="item" >
//                     <p className="item-block">
//                     <span className="item-name" style={{ textDecoration: item.isCompleted ? "line-through" : "" }}>{item.text}</span>
//                     <Button onClick={()=>{compleateItem(item)}} className={"Button"}>&#10004;</Button>
//                     <Button onClick={()=>{editItem(item)}} className={"Button edit"}>Edit</Button>
//                     <Button onClick={()=>{deleteItem(item.id)}} className={"Button delete"}>-</Button>
//                     </p>
//                 </span>
//             </div>
//         )
//     ) 

    
//     : (
//         <p><h1>You have no Assignments to do</h1> </p>
        
//     );

    
//     return(
        
//         <div className="row">
//             <div className="col">{itemList}</div>
                    
//                 <div className="col">
//                     {/* <Form>
//                     <Form.Group widths='equal'>
//                         <Form.TextArea width='auto' label='' placeholder='Enter the detail description of Task...' />
//                     </Form.Group>
//                     </Form>
//                  */}
//                 </div>
                    
//         </div>

   

//     );
    
// }
// class Input extends React.Component {
//     state = {
//         text: '',
//     }

//     handleChange = (e) => {
//         this.setState(
//             {
//                 text: e.target.value

//             }
//         ) 
//     }
//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.addItem(this.state);
//         this.setState(
//             {
//                 text: ''
//             }
//         )
        
//     }
//     handleEdit = (e) => {
//         e.preventDefault();
//         this.props.editItem(this.state);
//         this.setState(
//             {
//                 text: ''
//             }
//         )
        
//     }


    
//     render(){
//         return(
//             <div className="container">
//             <div className="row">
//             <div className="col"></div>
//             <div className="col"></div>
//             <div className="col-xs-5">
            
//             <form onSubmit={this.handleSubmit} className="input">
//                 <input
//                     className="add-input"
//                     type = "text"
//                     value = {this.state.text}
//                     onChange={this.handleChange}
//                     required="required"
//                     placeholder="Enter your Assignment"
//                 >
//                 </input> 
                
            
//                 <Button type={"submit"} className={"Button"}>
//                     Submit
//                 </Button>
//             </form>
//             </div>   
//             </div>
             
            
//             </div>


//         );
//     }
// }

// const Button =({
//     onClick,
//     className,
//     type,
//     children,
// })=>
//     <button
//         onClick ={onClick}
//         className={className}
//         type={type}
//     >
//         {children}
//     </button>





// //ReactDOM.render(<App />, document.getElementById('root'));








// export default Assignments

