import React from 'react'
import './Card.css'

export default function Card({title, body}) {
  return (
    <div className="card-container">
      <div className="image-container">
      </div>
     <div className="card-content">
     <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{body}</p>
      </div>
     </div>
      <div className="btn">
        <button>
          <a>
            View more
          </a>
        </button>
      </div>
    </div>
  )
}
