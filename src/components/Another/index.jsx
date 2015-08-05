import React from 'react';

export default class Another extends React.Component {
  constructor() {
    super();
    this.name = 'Another';
  }

  render() {
    return (
      <div className="Another">
        this is Another component
      </div>
    );
  }
}
