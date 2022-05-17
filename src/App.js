import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import app from './app.css';

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
    trunfoFilter: false,
    disableFilters: false,
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

  setFilter = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    if (value === true) {
      this.setState({
        disableFilters: true,
        [name]: value,
      });
    } else {
      this.setState({
        disableFilters: false,
        [name]: value,
      });
    }
  }

  filterCards = () => {
    const { savedCards, rarityFilter, trunfoFilter, nameFilter } = this.state;
    if (trunfoFilter) return savedCards.filter((card) => card.cardTrunfo);
    if (rarityFilter === 'todas') {
      return savedCards.filter((card) => card.name.includes(nameFilter));
    }
    return savedCards.filter((card) => card.raridade === rarityFilter
      && card.name.includes(nameFilter));
  }

  render() {
    const {
      name, descricao, attr1, attr2, attr3, imagem, raridade, cardTrunfo,
      isSaveButtonDisabled, hasTrunfo, disableFilters,
    } = this.state;
    return (
      <div>
        <div className="create-card">
          <div className="form-container">
            <h1>Adicionar nova carta</h1>
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
          </div>
          <div className="card-preview">
            <h2>Pré-visualização</h2>
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
          </div>
        </div>
        <div className="all-cards">
          <div className="filters">
            <h2>Todas as cartas</h2>
            <p>Filtros de busca</p>
            <input
              disabled={ disableFilters }
              name="nameFilter"
              data-testid="name-filter"
              type="text"
              placeholder="Nome da carta"
              onChange={ this.setFilter }
            />
            <select
              disabled={ disableFilters }
              name="rarityFilter"
              data-testid="rare-filter"
              onChange={ this.setFilter }
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
            <label htmlFor="trunfoFilter">
              <input
                className="trunfo-filter"
                name="trunfoFilter"
                id="trunfoFilter"
                type="checkbox"
                data-testid="trunfo-filter"
                onChange={ this.setFilter }
              />
              Super Trunfo
            </label>
          </div>
          <div className="deck">
            <h2>Your Deck</h2>
            <div className="cards-container">
              {this.filterCards().map((card) => (
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
      </div>
    );
  }
}

export default App;
