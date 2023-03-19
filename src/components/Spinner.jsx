import React, { Component } from 'react'
import loading from '../loading-gif.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} className="my-3" alt="loading" />
      </div>
    )
  }
}
