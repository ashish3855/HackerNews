import React from "react";

export default class search extends React.Component {
  render() {
    const { onSearchChange, value, children, onSubmit } = this.props;
    return (
      <div>
        {/* const Search = ({(value, onSearchChange, onSubmit, children)}) => */}
        <form onSubmit={onSubmit}>
          {children}
          {": "}
          <input type="text" onChange={onSearchChange} value={value} />
          <button type="submit"> {children} </button>
        </form>
      </div>
    );
  }
}
