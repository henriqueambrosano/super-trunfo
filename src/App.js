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
    isSaveButtonDisabled: true,
  }

  validateForm = () => {
    const { name, descricao, imagem, raridade, attr1, attr2, attr3 } = this.state;
    let flag = 0;

    if (name && descricao && imagem && raridade)flag += 1;
    if (+attr1 + +attr2 + +attr3 <= +'210') flag += 1;
    if ([+attr1, +attr2, +attr3]
      .filter((num) => num >= 0 && num < +'91').length === +'3') flag += 1;
    this.setState({ isSaveButtonDisabled: flag !== +'3' });
  }

  onInputChange =({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState(() => ({ [name]: value }), this.validateForm);
  }

  render() {
    const {
      name, descricao, attr1, attr2, attr3, imagem, raridade, superTrunfo,
      isSaveButtonDisabled,
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
          isSaveButtonDisabled={ isSaveButtonDisabled }
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
