import * as React from 'react';
import { Component } from 'react';

class Fileupload extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  handleFileinputChange = (event: any) => {
    const file = event.target.files[0];

    const formData = new FormData();

    formData.append('file', file);

    fetch('http://localhost:8081/api/v1/secured/file_upload', {
      method: 'POST',
      body: formData
    })
      .then(jsonResponse => jsonResponse.json())
      .then(response => console.log(response));
  };

  render() {
    return (
      <div className="fileupload">
        <input
          type="file"
          name=""
          id=""
          onChange={this.handleFileinputChange}
        />
      </div>
    );
  }
}

export default Fileupload;
