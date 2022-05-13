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
    nameFilter: '',
    rarityFilter: 'todas',
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

  resetTrunfo = () => {
    const { savedCards } = this.state;
    if (!savedCards.find((item) => item.hasTrunfo)) {
      this.setState({ hasTrunfo: false });
    }
  }

  deleteCard = ({ target }) => {
    const { id } = target;
    this.setState((prev) => ({
      savedCards: prev.savedCards.filter((item) => item.name !== id),
    }), this.resetTrunfo);
  }

  onInputChange =({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    this.setState(() => ({ [name]: value }), this.validateForm);
  }

  filterByName = ({ target }) => {
    const { value } = target;
    this.setState({ nameFilter: value });
  }

  setRarityFilter = ({ target }) => {
    const { value } = target;
    this.setState({ rarityFilter: value });
  }

  filterByRarity = () => {
    const { rarityFilter, savedCards } = this.state;
    if (rarityFilter === 'todas') {
      return savedCards;
    }
    return savedCards.filter((card) => card.raridade === rarityFilter);
  }

  render() {
    const {
      name, descricao, attr1, attr2, attr3, imagem, raridade, cardTrunfo,
      isSaveButtonDisabled, hasTrunfo, nameFilter,
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
          cardButton={ false }
          deleteCard={ this.deleteCard }
        />
        <div>
          <h2>Todas as cartas</h2>
          <p>Filtros de busca</p>
          <input
            data-testid="name-filter"
            type="text"
            placeholder="Nome da carta"
            onChange={ this.filterByName }
          />
          <select data-testid="rare-filter" onChange={ this.setRarityFilter }>
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
          <div className="cards-container">
            {this.filterByRarity().filter((card) => card.name.includes(nameFilter))
              .map((card) => (
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
                  cardButton
                  deleteCard={ this.deleteCard }
                />))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
