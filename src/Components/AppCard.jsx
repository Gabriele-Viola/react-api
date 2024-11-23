import { useState } from "react";

export default function AppCard({ ricetta, server, handleDeleteClick }) {

    return (
        <div className='card'>
            <h3>{ricetta.title}</h3>
            <div className="imagcont">
                <img src={`${server}/imgs/${ricetta.image}`} alt="" />
            </div>
            <div className='description'>{ricetta.content}</div>
            <div className='tags'>

                {ricetta.tags.map((tag, index) => <div key={index} className='tag' >{tag}</div>)}
            </div>
            <button slug={ricetta.slug} onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}