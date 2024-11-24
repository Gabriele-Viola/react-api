export default function AppForm({ handleFormSubmit, formData, handleFormfield, allTags }) {

    return (
        <form className='formstyle' onSubmit={handleFormSubmit}>
            <div className="titleFormStyle">
                <label htmlFor="title">Nome ricetta</label>
                <input
                    type="text"
                    name='title'
                    id='title'
                    value={formData.title}
                    onChange={handleFormfield} />

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
                    rows="4"
                    cols="80"
                    name='content'
                    id='content'
                    value={formData.content}
                    onChange={handleFormfield}
                    placeholder="Descrivi la tua ricetta..." />
            </div>
            <div className="checktags">

                {allTags.map((tag, index) =>

                    <div key={index} className="inputstyletags">
                        <label className='tagLabel' htmlFor={tag}>{tag}

                            <input className='tagcheck' type="checkbox" name={tag} id={tag} checked={formData.tags.includes(tag)} value={formData.name} onChange={handleFormfield} />
                        </label>
                    </div>
                )}


            </div>
            <div className="buttoncontain">

                <button type='submit'>Aggiungi ricetta</button>
            </div>
        </form>
    )
}