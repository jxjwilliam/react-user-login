import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {isEmpty} from '../utils'
import {
  getUsers,
  updateUser,
  saveUser,
  deleteUser,
  prevAction,
  nextAction,
  sortAction,
  searchUser
} from '../actions/listAction'

class UserSearch extends Component {

  handleSearch = e => {
    const {dispatch, getUsers} = this.props;
    let username = e.target.value.trim();
    if (username) {
      dispatch(searchUser(username));
    }
    else {
      getUsers()
    }
  }

  render() {
    return (
      <div className="input-group">
        <input type="search" className="form-control" placeholder="Search" name="search" onChange={this.handleSearch}/>

        <div className="input-group-btn">
          <button className="btn btn-warning" type="button">
            <i className="fa fa-search-plus"></i>
          </button>
        </div>
      </div>
    )
  }
}
UserSearch = connect(null, (dispatch) => bindActionCreators({getUsers, dispatch}, dispatch))(UserSearch);

const Header = ({sort, seq}) => (
  <thead>
  <tr>
    <th>#</th>
    <th>First Name
      <SortAsc sort={sort} name="firstName"/>
      <SortDesc sort={sort} name="firstName"/>
    </th>
    <th>Last Name
      <SortAsc sort={sort} name="lastName"/>
      <SortDesc sort={sort} name="lastName"/>
    </th>
    <th>Email
      <SortAsc sort={sort} name="email"/>
      <SortDesc sort={sort} name="email"/>
    </th>
    <th>Team
      <SortAsc sort={sort} name="team"/>
      <SortDesc sort={sort} name="team"/>
    </th>
    <th>Role
      <SortAsc sort={sort} name="role"/>
      <SortDesc sort={sort} name="role"/>
    </th>
    <th>Location
      <SortAsc sort={sort} name="location"/>
      <SortDesc sort={sort} name="location"/>
    </th>
    <th>Comment
      <SortAsc sort={sort} name="comment"/>
      <SortDesc sort={sort} name="comment"/>
    </th>
    <th>TS
      <SortAsc sort={sort} name="timestamp"/>
      <SortDesc sort={sort} name="timestamp"/>
    </th>
    <th>Operation</th>
  </tr>
  </thead>
)

const Detail = ({idx, user, onEdit, onDelete}) => {
  return (
    <tr>
      <td scope="row">{idx + 1}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <button onClick={() => onEdit(user._id)}>{user.email}</button>
      </td>
      <td>{user.team.join(', ')}</td>
      <td>{user.role}</td>
      <td>{user.location}</td>
      <td>{user.comment}</td>
      <td>{user.timestamp.slice(0, 10).replace(/-/g, '/')}</td>
      <td>
        <button className="btn btn-warning"
                onClick={() => onEdit(user._id)}
                title={'eidt ' + user.firstName + ' ' + user.lastName}>
          <i className="fa fa-edit"></i>
        </button>
        <button className="btn btn-danger"
                onClick={() => onDelete(user._id)}
                title={'remove ' + user.firstName + ' ' + user.lastName}>
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  )
}

const SortAsc = ({sort, name}) => (
  <a href="#" title={'sort by ' + name} onClick={() => sort(name, 'asc')}>
    <i className="fa fa-sort-up fa-lg"></i>
  </a>
)
const SortDesc = ({sort, name}) => (
  <a href="#" title={'sort by ' + name + ' desc'} onClick={() => sort(name, 'desc')}>
    <i className="fa fa-sort-down fa-lg"></i>
  </a>
)

class List extends Component {
  state = {
    showModal: false,
    user: {},
    curr_page: 1,
    total_page: 1,
    total_users: 0
  };

  prev = () => {
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

  next = () => {
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

  open = () => {
    this.setState({showModal: true});
  }

  close = () => {
    this.setState({showModal: false, user: {}});
  }

  editModal = id => {
    let theUser = this.props.userList.find(user => user._id === id);
    this.setState({user: theUser, showModal: true});
  }

  deleteModal = id => {
    let theUser = this.props.userList.find(user => user._id === id);
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

  doUser = values => {
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

  componentDidMount() {
    this.props.getUsers(); // store.dispatch({type: 'FETCH_USERS'});

    fetch('/api/list/total')
      .then(res => res.json())
      .then(data => this.setState({total_users: data.total, total_page: Math.ceil(data.total / 10)}))
  }

  render() {
    const {userList} = this.props;

    return (
      isEmpty(userList)
        ? <div className="loader"/> : (
          <div className="container" style={{paddingTop: 48}}>
            <div className="row">
              <div className="col-md-2">
                <button className="btn btn-success" onClick={this.open}>
                  <i className="fa fa-user-plus"></i>Add User
                </button>
              </div>
              <div className="col-md-3">
                <UserSearch />
              </div>
              <div className="col-md-2">
                <a href="#" aria-label="Previous" onClick={this.prev}>
                  <i className="fa fa-backward">Prev</i>
                </a>
              </div>
              <div className="col-md-2">
                <a href="#" aria-label="Next" onClick={this.next}>
                  <i className="fa fa-forward">Next</i>
                </a>
              </div>
              <div>
                <span>Page <strong>{this.state.curr_page}</strong> of <strong>{this.state.total_page}</strong>, totoal <strong>{this.state.total_users}</strong> users</span>
              </div>
            </div>
            <div className="row" style={{paddingTop: 10}}>
              <table className="table table-bordered">
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
          </div>
        ))
  }
}

const mapStateToProps = (state, {params}) => ({
  userList: state.userList,
});

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({
    getUsers,
    updateUser,
    saveUser,
    deleteUser,
    prevAction,
    nextAction,
    sortAction
  }, dispatch);
  return {...actions, dispatch};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);