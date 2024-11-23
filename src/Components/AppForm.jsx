export default function AppForm({ handleFormSubmit, formData, handleFormfield, allTags }) {

    return (
        <form className='formstyle' onSubmit={handleFormSubmit}>
            <div className="inputstyle">
                <label htmlFor="title">Nome ricetta</label>
                <input
                    type="text"
                    name='title'
                    id='title'
                    value={formData.title}
                    onChange={handleFormfield} />
            </div>

            <div className="inputstyle">
                <label htmlFor="image">Immagine</label>
                <input
                    type="text"
                    name='image'
                    id='image'
                    value={formData.image}
                    onChange={handleFormfield} />
            </div>

            <div className="inputstyle">

                <label htmlFor="content">Descrizione</label>
                <textarea
                    type="textarea"
                    rows="5"
                    cols="50"
                    name='content'
                    id='content'
                    value={formData.content}
                    onChange={handleFormfield} />
            </div>
            <div className="checktags">

                {allTags.map((tag, index) =>

                    <div key={index} className="inputstyle">
                        <input type="checkbox" name={tag} id={tag} checked={formData.tags.includes(tag)} value={formData.name} onChange={handleFormfield} />
                        <label htmlFor={tag}>{tag}</label>
                    </div>
                )}


            </div>
            <button type='submit'>Aggiungi ricetta</button>
        </form>
    )
}