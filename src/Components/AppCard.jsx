import { useState } from "react";

export default function AppCard({ ricetta, server, handleDeleteClick }) {

    return (
        <div className='card'>
            <h3>{ricetta.title}</h3>
            <img src={`${server}/imgs/${ricetta.image}`} alt="" />
            <p className='description'>{ricetta.content}</p>
            <div className='tags'>

                {ricetta.tags.map((tag, index) => <div key={index} className='tag' >{tag}</div>)}
            </div>
            <button slug={ricetta.slug} onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}