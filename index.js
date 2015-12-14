import React from 'react';
import Dom from 'react-dom';
import elementResizeEvent from 'element-resize-event';

export default React.createClass({

  getInitialState: function() {
    if (this.props.initialComponentWidth !== undefined && this.props.initialComponentWidth !== null) {
      return {
        componentWidth: this.props.initialComponentWidth,
        componentHeight: this.props.initialComponentHeight
      };
    } else {
      return {};
    }
  },
  // Add our resize sensor.
  componentDidMount: function() {
    this.setState({
      componentWidth: Dom.findDOMNode(this).getBoundingClientRect().width,
      componentHeight: Dom.findDOMNode(this).getBoundingClientRect().height

    });
    elementResizeEvent(Dom.findDOMNode(this), this.onResize);

    this.props.handleResize(Dom.findDOMNode(this).getBoundingClientRect());
  },
  // When the DOM updates, check that our resize sensor is still there.
  componentDidUpdate: function() {
    if (0 === Dom.findDOMNode(this).getElementsByClassName('resize-sensor').length) {
      elementResizeEvent(Dom.findDOMNode(this), this.onResize);
    }
  },
  onResize: function() {

    this.setState({
      componentWidth: Dom.findDOMNode(this).getBoundingClientRect().width,
      componentHeight: Dom.findDOMNode(this).getBoundingClientRect().height
    });

    this.props.handleResize(Dom.findDOMNode(this).getBoundingClientRect());
  },


  render: function() {

    return (
        <div>{this.props.children}</div>
    )
  }
});
