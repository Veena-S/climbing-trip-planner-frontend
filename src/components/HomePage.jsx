import React from 'react'
import Card from './Card'

export default function HomePage() {
  return (
    <>
    <div className="container">
      <div className="btn-div">
      <button> Create new Trip</button>
      </div>
      <div className="container">
        <h2>Upcoming Trips</h2>
        <div className="row">
        <div className="row">
        <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
        </div>
        </div>
      </div>
      <div className="container">
        <h2>Active Trips</h2>
        <div className="row">
        <div className="row">
          <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
        </div>
        </div>
      </div>
      <div className="container">
        <h2>Past Trips</h2>
        <div className="row">
        <div className="row">
          <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
          <Card
          title='title'
          body='body'
          />
        </div>
        </div>
      </div>
   
    </div>
    </>
  )
}
