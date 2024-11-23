import { useState } from "react";

export default function AppCard({ ricetta, server, handleDeleteClick }) {
    const [id, setId] = useState(ricetta.slug)
    // function onDelete(e) {
    //     e.preventDefault()

    //     console.log('click', id);
    //     console.log(url + '/' + id);

    //     // fetch(url + '/' + id, {
    //     //     method: 'DELETE',
    //     //     headers: {
    //     //         'ContentType': 'application/json'
    //     //     }
    //     // }).then(res => res.json())
    //     //     .then(data => {
    //     //         console.log(data);

    //     //     })
    // }

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