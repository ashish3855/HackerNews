import React from "react";

// function isSearched(searchTerm) {
//   return function(item) {
//     return (
//       !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };
// } ES5

const isSearched = searchTerm => item =>
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()); //ES6

export default class Lists extends React.Component {
  render() {
    const { list, searchTerm, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(searchTerm)).map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>{" "}
            </span>
            <span>Author: {item.author}</span>{" "}
            <span>Comments: {item.num_comments}</span>,{" "}
            <span>Points: {item.points}</span>
            <span>
              {" "}
              <button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
