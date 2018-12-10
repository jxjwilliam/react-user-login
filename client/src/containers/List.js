import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getUsers, updateUser, saveUser, deleteUser, prevAction, nextAction, sortAction, searchUser } from '../actions/listAction'
//import EditModal from '../components/ModalForm'


class UserSearch extends Component {

  handleClick = e => {
    const {dispatch} = this.props;
    let username = e.target.value.trim();
    if (username) {
      dispatch(this.props.searchUser(username));
    }
    else {
      this.props.getUsers()
    }
  }

  render() {
    return (
      <div className="input-group">
        <input type="search" className="form-control" placeholder="Search" name="search"
               onChange={this.handleClick}/>

        <div className="input-group-btn">
          <button className="btn btn-default" type="button">
            <i className="glyphicon glyphicon-search"></i>
          </button>
        </div>
      </div>
    )
  }
}

UserSearch = connect()(UserSearch);

const Header = ({sort, seq}) => (
  <thead>
  <tr>
    <th>#</th>
    <th>First Name &nbsp;
      <SortingAsc sort={sort} name="firstName"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="firstName"/>
    </th>
    <th>Last Name &nbsp;
      <SortingAsc sort={sort} name="lastName"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="lastName"/>
    </th>
    <th>Email&nbsp;
      <SortingAsc sort={sort} name="email"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="email"/>
    </th>
    <th>Phone&nbsp;
      <SortingAsc sort={sort} name="phone"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="phone"/>
    </th>
    <th>DOB&nbsp;
      <SortingAsc sort={sort} name="dob"/> &nbsp;&nbsp;
      <SortingDesc sort={sort} name="dob"/>
    </th>
    <th>Operation</th>
  </tr>
  </thead>
)

const Detail = ({idx, user, onEdit, onDelete}) => {
  return (
    <tr>
      <td scope="row">{idx + 1}</td>
      <td><a href="#" onClick={()=>onEdit(user._id)}>{user.firstName}</a></td>
      <td><a href="#" onClick={()=>onEdit(user._id)}>{user.lastName}</a></td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.dob}</td>
      <td>
        <button className="btn btn-warning"
                onClick={()=>onEdit(user._id)}
                title={'eidt ' + user.firstName + ' ' + user.lastName}>
          <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
        </button>
        <button className="btn btn-danger"
                onClick={()=>onDelete(user._id)}
                title={'remove ' + user.firstName + ' ' + user.lastName}>
          <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </td>
    </tr>
  )
}

const SortingAsc = ({sort, name}) => (
  <a href="#"
     title={'sort by ' + name}
     onClick={() => { sort(name, 'asc') }}>
    <span className="glyphicon glyphicon-sort-by-alphabet"></span>
  </a>
)
const SortingDesc = ({sort, name}) => (
  <a href="#"
     title={'sort by ' + name + ' desc'}
     onClick={() => { sort(name, 'desc') }}>
    <span className="glyphicon glyphicon-sort-by-alphabet-alt"></span>
  </a>
)

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      user: {},
      curr_page: 1,
      total_page: 1,
      total_users: 0
    };
    this.editModal = this.editModal.bind(this);
    this.doUser = this.doUser.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.deleteModal = this.deleteModal.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false, user: {}});
  }

  editModal(id) {
    let theUser = this.props.userList.find(user=> user._id === id);
    this.setState({user: theUser, showModal: true});
  }

  deleteModal(id) {
    let theUser = this.props.userList.find(user=> user._id === id);
    if (window.confirm('Are you sure to delete ' + theUser.firstName + ' ' + theUser.lastName + '?')) {
      this.props.deleteUser(theUser);
    }
  }

  areEqualShallow(a, b) {
    for (let key in a) {
      if (!(key in b) || a[key] !== b[key]) {
        return false;
      }
    }
    for (let key in b) {
      if (!(key in a)) {
        return false;
      }
    }
    return true;
  }

  //process add/edit Modal dialog.
  doUser(values) {
    if (this.areEqualShallow(values, this.state.user)) {
      console.log('doUser - nothing change: values === this.state.user');
      this.setState({showModal: false, user: {}});
      return false;
    }

    if (Object.keys(this.state.user).length === 0) {
      this.props.saveUser(values);
    }
    else {
      //var newUser = Object.assign(this.state.user, values); //this.props.modelform
      this.props.updateUser(values);
    }
    this.setState({showModal: false, user: {}})
    // what need to dispatch? return this.props.dispatch();
  }


  /**
   *  If you need to load data from a remote endpoint, this is a good place to instantiate
   *  the network request. Setting state in this method will trigger a re-rendering.
   * for local state, it works properly:
   * superagent.get('/api/todos').set('Accept', 'application/json').end((err, res) => {
	 * 	this.setState({userList: res.body});})
   */
  componentDidMount() {
    this.props.getUsers(); // store.dispatch({type: 'FETCH_USERS'});

    // how many pages: {"total":96}: 10 items per page.
    fetch('/api/list/total')
      .then(res => res.json())
      .then(data => this.setState({total_users: data.total, total_page: Math.ceil(data.total / 10)}))
  }

  prev() {
    let page = this.state.curr_page;
    if (page > 1) {
      page = page - 1;
      this.setState({curr_page: page});
      this.props.prevAction(page)
    }
    else {
      console.log('current page: ' + page + ', cannot prev');
    }
  }

  next() {
    let page = this.state.curr_page;
    if (page < this.state.total_page) {
      page = page + 1;
      this.setState({curr_page: page});
      this.props.nextAction(page);
    }
    else {
      console.log('current page: ' + page + ', cannot next');
    }
  }

  /**
   * userDetail = {
   *   dob: "16/07/2017", email:"risus.In.mi@estNunclaoreet.edu"
   *   firstName:"Yardley", lastName:"Ashley", phone:"(729) 330-8038"
   * }
   */
  render() {
    const {userList} = this.props;

    if (userList === null || typeof userList === 'undefined' || userList.length === 0) {
      return <p className="well">Loading...</p>
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <button className="btn btn-success" onClick={this.open}><span
              className="glyphicon glyphicon-plus"></span>Add User
            </button>
          </div>
          <div className="col-md-3">
            <UserSearch />
          </div>
          <div className="col-md-1">
            <a href="#" aria-label="Previous"
               onClick={this.prev}>
              <span aria-hidden="true"> &laquo;</span>Prev<span aria-hidden="true"> &laquo;</span>
            </a>
          </div>
          <div className="col-md-1">
            <a href="#" aria-label="Next"
               onClick={this.next}>
              <span aria-hidden="true">&raquo; </span>Next<span aria-hidden="true"> &raquo;</span>
            </a>
          </div>
          <div>
            <span>page <strong>{this.state.curr_page}</strong> of <strong>{this.state.total_page}</strong>, totoal <strong>{this.state.total_users}</strong> users</span>
          </div>
        </div>
        <div className="row" style={{paddingTop:10}}>
          <table className="table table-bordered">
            <colgroup>
              <col/>
              <col className="col-md-2"/>
              <col className="col-md-2"/>
              <col className="col-md-2"/>
              <col className="col-md-2"/>
              <col className="col-md-2"/>
              <col className="col-md-2"/>
            </colgroup>
            <Header sort={this.props.sortAction}/>
            <tbody>
            {this.props.userList.map((user, i) => (
              <Detail
                key={i}
                onEdit={this.editModal}
                onDelete={this.deleteModal}
                user={user}
                idx={i}
              />
            ))}
            </tbody>
          </table>
        </div>
        {/*<div className="modal">*/}
          {/*<EditModal show={this.state.showModal} close={this.close} onUpdate={this.doUser}*/}
                     {/*user={this.state.user}/>*/}
        {/*</div>*/}
      </div>
    )
  }
}

const mapStateToProps = (state, {params}) => ({
  userList: state.userList,
});

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({
    getUsers, updateUser, saveUser, deleteUser,
    prevAction, nextAction, sortAction
  }, dispatch);
  return {...actions, dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);