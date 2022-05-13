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
    hasTrunfo: false,
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    savedCards: [],
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

  saveCard = () => {
    const {
      name, descricao, imagem, raridade, attr1, attr2, attr3, cardTrunfo,
    } = this.state;

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

    this.setState((prev) => ({
      savedCards: [...prev.savedCards, {
        name,
        descricao,
        imagem,
        raridade,
        attr1,
        attr2,
        attr3,
        cardTrunfo,
      }],
    }), this.resetForm);
  }

  resetForm = () => {
    this.setState({
      name: '',
      descricao: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      imagem: '',
      raridade: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  onInputChange =({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState(() => ({ [name]: value }), this.validateForm);
  }

  render() {
    const {
      name, descricao, attr1, attr2, attr3, imagem, raridade, cardTrunfo,
      isSaveButtonDisabled, hasTrunfo, savedCards,
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
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.saveCard }
        />
        <Card
          cardName={ name }
          cardDescription={ descricao }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardImage={ imagem }
          cardRare={ raridade }
          cardTrunfo={ cardTrunfo }
        />
        <div>
          <h2>Todas as cartas</h2>
          <div className="cards-container">
            {savedCards.map((card) => (
              <Card
                key={ card.name }
                cardName={ card.name }
                cardDescription={ card.descricao }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardImage={ card.imagem }
                cardRare={ card.raridade }
                cardTrunfo={ card.cardTrunfo }
              />))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
