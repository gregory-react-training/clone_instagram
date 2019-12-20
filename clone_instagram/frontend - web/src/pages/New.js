import React, { Component } from "react";
import api from "../services/api";

import "./New.css";

class New extends Component {
  //OBRIGATÓRIO ao escrever componentes em forma de classe

  state = {
    imagePreviewUrl: null,
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    // previne ação padrão do formulário -> redirecionar ao executar submit ->
    // não necessário aqui, pois trabalharemos com atualização em tempo real!
    e.preventDefault();

    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.history.push("/");
  };

  handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
    // this.setState({image: e.target.files[0]});
  };

  // Com essa função, sempre que um input acionar o evento onChange, essa função será chamada e
  // setará o estado acima de acordo com o name do evento (pegando seu value)
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="" />;
    }

    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <div className="imgPreview">{$imagePreview}</div>

        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleChange}
          value={this.state.place}
        />

        <input
          type="text"
          name="description"
          placeholder="Descrição do post"
          onChange={this.handleChange}
          value={this.state.description}
        />

        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;
