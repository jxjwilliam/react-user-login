import React from 'react';
import debounce from 'lodash.debounce';

//https://reactjs.org/docs/faq-functions.html#debounce
class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    // React pools events, so we read the value before debounce.
    // Alternately we could call `event.persist()` and pass the entire event.
    // For more info see reactjs.org/docs/events.html#event-pooling
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}

const UserSearch = ({handleSearch}) => (
  <div className="input-group">
    <input
      type="search"
      className="form-control"
      placeholder="Search"
      name="global_search"
      title="search all data source"
      onChange={handleSearch}
    />
    <div className="input-group-btn">
      <button className="btn btn-warning" type="button">
        <i className="fa fa-search-plus"></i>
      </button>
    </div>
  </div>
)

export default Searchbox;