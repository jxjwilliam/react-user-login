import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {areEqualShallow, isEmpty} from '../utils'
import {
  getUsers,
  getTotal,
  updateUser,
  saveUser,
  deleteUser,
  prevAction,
  nextAction,
  sortAction
} from '../actions/listAction'
import {searchFields} from '../reducers/listReducer'


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

const AddUser = ({onOpen}) => (
  <button className="btn btn-success" onClick={onOpen}>
    <i className="fa fa-user-plus"></i>Add User
  </button>

)
const UserSearch = ({handleSearch}) => (
  <div className="input-group">
    <input
      type="search"
      className="form-control"
      placeholder="Search"
      name="search"
      onChange={handleSearch}
    />
    <div className="input-group-btn">
      <button className="btn btn-warning" type="button">
        <i className="fa fa-search-plus"></i>
      </button>
    </div>
  </div>
)

let FieldSearch = ({name, onSearch}) => (
  <div className="input-group">
    <input
      type="search"
      className="form-control"
      placeholder={name}
      name="field_search"
      onChange={e => onSearch(e, name)}
    />
  </div>
)
FieldSearch = connect(
  state => ({userList: state.userList}),
  {getUsers}
)(FieldSearch)

const Header = ({sort, onSearch}) => (
  <thead>
  <tr>
    <th scope="row">#</th>
    <th><label>First Name</label>
      <SortAsc sort={sort} name="firstName"/>
      <SortDesc sort={sort} name="firstName"/>
      <FieldSearch onSearch={onSearch} name="firstName"/>
    </th>
    <th><label>Last Name</label>
      <SortAsc sort={sort} name="lastName"/>
      <SortDesc sort={sort} name="lastName"/>
      <FieldSearch onSearch={onSearch} name="lastName"/>
    </th>
    <th><label>Email</label>
      <SortAsc sort={sort} name="email"/>
      <SortDesc sort={sort} name="email"/>
      <FieldSearch onSearch={onSearch} name="email"/>
    </th>
    <th><label>Team</label>
      <SortAsc sort={sort} name="team"/>
      <SortDesc sort={sort} name="team"/>
      <FieldSearch onSearch={onSearch} name="team"/>
    </th>
    <th><label>Role</label>
      <SortAsc sort={sort} name="role"/>
      <SortDesc sort={sort} name="role"/>
      <FieldSearch onSearch={onSearch} name="role"/>
    </th>
    <th><label>Location</label>
      <SortAsc sort={sort} name="location"/>
      <SortDesc sort={sort} name="location"/>
      <FieldSearch onSearch={onSearch} name="location"/>
    </th>
    <th><label>Comment</label>
      <SortAsc sort={sort} name="comment"/>
      <SortDesc sort={sort} name="comment"/>
      <FieldSearch onSearch={onSearch} name="comment"/>
    </th>
    <th><label>TS</label>
      <SortAsc sort={sort} name="timestamp"/>
      <SortDesc sort={sort} name="timestamp"/>
      <FieldSearch onSearch={onSearch} name="timestamp"/>
    </th>
    <th>Operation</th>
  </tr>
  </thead>
)

const Detail = ({idx, user, onEdit, onDelete}) => {
  return (
    <tr>
      <td>{idx + 1}</td>
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

class List extends Component {
  state = {
    showModal: false,
    user: {},
    curr_page: 1,
    total_page: 1,
    total_users: 0,
    search: '',
    field: ''
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

  doUser = values => {
    if (areEqualShallow(values, this.state.user)) {
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
    this.props.getUsers()

    this.props.getTotal()
      .then(() => {
        const {total} = this.props.total;
        this.setState({
          total_users: total,
          total_page: Math.ceil(total / 10)
        })
      })
  }

  searchKeyword = (keyword) => {
    // this.state.list.filter(ul => ul.email.indexOf(keyword) !== -1)
  }

  handleSearch = (e, field) => {
    let keyword = e.target.value;
    if (keyword) {
      this.setState({search: keyword.trim().toLowerCase(), field: field})
    }
    else {
      this.setState({search: '', field: ''})
    }
  }

  render() {
    const {userList, sortAction} = this.props;
    const {search, field} = this.state;
    let list;
    if (field && search) {
      list = searchFields(userList, field, search);
    }
    else {
      list = userList;
    }

    return (
      isEmpty(userList)
        ? <div className="loader"/> : (
          <div className="container" style={{paddingTop: 48}}>
            <div className="row">
              <div className="col-md-2">
                <AddUser onOpen={this.open}/>
              </div>
              <div className="col-md-3">
                <UserSearch handleSearch={this.handleSearch}/>
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
                <span>
                  Page <strong>{this.state.curr_page}</strong> of <strong>{this.state.total_page}</strong>,
                  total <strong>{this.state.total_users}</strong> users
                </span>
              </div>
            </div>
            <div className="row" style={{paddingTop: 10}}>
              <table className="table table-bordered">
                <Header sort={sortAction} onSearch={this.handleSearch}/>
                <tbody>
                {list.map((user, i) => (
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

const mapStateToProps = (state, ownProps) => {
  return {
    userList: state.userList,
    total: state.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({
    getUsers,
    getTotal,
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