import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
  render() {
    let title = this.props.post.title
    return (
      <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
        <h2 className="f3 black-80 fw4 lh-solid">Title: {title}</h2>
        <img className="post image" src={`./${this.props.post.file}`}></img>
        <p className="black-80 fw3">Description: {this.props.post.text}</p>
      </Link>
    )
  }
}
