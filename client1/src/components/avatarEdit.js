import React from "react";
import ReactDOM from "react-dom";
import Avatar from "react-avatar-edit";
import Classnames from 'classnames'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const src = props.src;
    this.state = {
      preview: null,
      src,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  onClose(preview) {
    this.setState({ preview: preview });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <Avatar
        name={this.props.name}
          width={390}
          height={295}
          onCrop={this.props.onCrop}
          onClose={this.props.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
        />
        <p  class="text-danger">
          {this.props.errors}
        </p>
      </div>
    );
  }
}
