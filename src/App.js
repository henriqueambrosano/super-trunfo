import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    name: '',
    descricao: '',
    attr1: '',
    attr2: '',
    attr3: '',
    imagem: '',
    raridade: 'normal',
    superTrunfo: false,
  }

  onInputChange =({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      name, descricao, attr1, attr2, attr3, imagem, raridade, superTrunfo,
    } = this.state;
    return (
      <div>
        <Form
          cardName={ name }
          cardDescription={ descricao }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ imagem }
          cardRare={ raridade }
          cardTrunfo={ superTrunfo }
          onInputChange={ this.onInputChange }
        />
        <Card
          cardName={ name }
          cardDescription={ descricao }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ imagem }
          cardRare={ raridade }
          cardTrunfo={ superTrunfo }
          onInputChange={ this.onInputChange }
        />
      </div>
    );
  }
}

export default App;
