import { useState } from "react"

function App() {

  let protoPost = {
    id:"",
    titolo: "",
    immagine: "",
    contenuto: "",
    categoria: "",
    pubblicato: false
  }


  let postProva = {
    id:"",
    titolo: "Prova",
    immagine: "https://placehold.co/600x400",
    contenuto: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo impedit ullam recusandae necessitatibus sapiente dolorum.",
    categoria: "Categoria 1",
    pubblicato: true
  }

  let [listaPosts, setListaPosts] = useState([postProva, postProva, postProva, postProva])
  let [post, setPost] = useState(protoPost)

  const handleSubmit = (event) => {
    event.preventDefault()
    let newPost ={
      ...post,
      id: Date.now()
    }
    // console.log(newPost)

    let newListaPosts = [...listaPosts, newPost]
    setListaPosts(newListaPosts);
    setPost(protoPost)
    console.log(newListaPosts)
  }

  const removePost = (id) => {
    const newListaPosts = listaPosts.filter((curElem, index) => {
      return index != id
    })
    setListaPosts(newListaPosts)
  }

  const printPosts = listaPosts.map((curPost, i) => {
    return (curPost.pubblicato && <div key={i} id={curPost.id} className="d-flex align-items-start mt-5 gap-1">
      <div className="post-card col">
        <div><img className="imm" src={curPost.immagine} alt="" /></div>
        <div className="card-inside">
          <h4>{curPost.titolo}</h4>
          <p>{curPost.contenuto}</p>
          <p>{curPost.categoria}</p>
        </div>
        <div><button onClick={() => { removePost(i) }} className="btn btn-outline-danger del">🗑</button></div>
      </div>
    </div>)
  })


  const handleOnChange = (event) => {
    let newChiave = event.target.name;
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    } 

    let newPost = {
      ...post,
      [newChiave]: newValue,
    }
    setPost(newPost)
  }

  return (
    <>
      <div className="container mt-5">
        <h1>Il mio Blog</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="title" className="form-label mt-4">Inserisci Titolo</label>
            <input type="text" required maxLength={25} className="form-control" name="titolo" id="title" value={post.titolo} onChange={(event) => handleOnChange(event)} />

            <label htmlFor="content" className="form-label mt-4">Inserisci una breve descrizione</label>
            <input type="text" required maxLength={140} className="form-control" name="contenuto" id="content" value={post.contenuto} onChange={(event) => handleOnChange(event)} />

            <label htmlFor="img" className="form-label mt-4 mb-1">Inserisci il link all&apos;immagine</label>
            <input type="text" required className="form-control" name="immagine" id="img" value={post.immagine} onChange={(event) => handleOnChange(event)} />

            <label htmlFor="categoria" className="form-label mt-4 mb-1">Scegli la categoria</label>
            <select id="categoria" name="categoria" required className="form-select" value={post.categoria} onChange={(event) => handleOnChange(event)}>
            <option value="" disabled>Seleziona...</option>
              <option value="Categoria 1">Uno</option>
              <option value="Categoria 2">Due</option>
              <option value="Categoria 3">Tre</option>
            </select>

            <div className="d-flex align-items-center mt-5 mb-5 gap-1 col-2">
              <label htmlFor="published" className="form-label col">Pubblicato</label>
              <input type="checkbox" name="pubblicato" id="published" checked={post.pubblicato} onChange={(event) => handleOnChange(event)} />
            </div>

          </div>

          <button type="submit" className="btn btn-primary">Inserisci</button>
        </form>

        {/* TITOLO DEI POSTS */}
        <div>
          <div className="row row-cols-3">
            {printPosts}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
