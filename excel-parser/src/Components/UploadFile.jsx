import * as XLSX from "xlsx";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

class UploadFile extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    unfilteredData: null,
    errorsInData: [],
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the parse button)
  onFileParse = () => {
    console.log(this.state);
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array to JSON */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(data);
      //Start checking the file
      data.forEach((row) => {
        console.log(row);
      });
    };
    reader.readAsBinaryString(this.state.selectedFile);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h4>File Details:</h4>

          <p>File Name: {this.state.selectedFile.name}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose Your excel file</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <div>
            <h3>How to use the excel parser:</h3>
            <p>1. Download our spreadsheet</p>
            <p>2. Fill the spreadsheet with data</p>
            <p>3. Upload it!</p>
          </div>
          <div className>
            <input type="file" onChange={this.onFileChange} />
            {this.state.selectedFile ? (
              <Button
                onClick={this.onFileParse}
                style={{
                  display: "block",
                  marginTop: "5%",
                  marginBottom: "5%",
                }}
              >
                Parse!
              </Button>
            ) : null}
          </div>
          {this.fileData()}
        </Jumbotron>
      </div>
    );
  }
}

export default UploadFile;
