import React from "react";
import Lists from "./components/lists";
import Search from "./components/search";
import "./App.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: null, searchTerm: DEFAULT_QUERY };
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  setSearchTopstories(result) {
    this.setState({ result });
  }
  fetchSearchTopstories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  onDismiss(id) {
    const updatedHits = this.state.result.hist.filter(
      item => item.objectID !== id
    );
    this.setState({ result: { ...this.state.result, hits: updatedHits } });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state;
    if (!result) {
      return null;
    }

    return (
      <div className="App">
        <h1>Hacker News</h1>
        <Search
          onSearchChange={this.onSearchChange}
          value={searchTerm}
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        {result && (
          <Lists
            list={result.hits}
            // searchTerm={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }
}
