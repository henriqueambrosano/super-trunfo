import React from 'react';
import PropTypes from 'prop-types';
import form from './form.css';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <section>
        <form id="my-form">
          <div className="left-label">
            <label htmlFor="name">
              Nome:
              <input
                value={ cardName }
                onChange={ onInputChange }
                id="name"
                name="name"
                type="text"
                data-testid="name-input"
              />
            </label>
          </div>
          <div className="left-label">
            <label htmlFor="descricao">
              Descrição:
              <textarea
                value={ cardDescription }
                onChange={ onInputChange }
                id="descricao"
                name="descricao"
                data-testid="description-input"
              />
            </label>
          </div>
          <div className="input-flex">
            <p>Attr1:</p>
            <input
              value={ cardAttr1 }
              onChange={ onInputChange }
              type="number"
              id="attr1"
              name="attr1"
              data-testid="attr1-input"
            />
          </div>
          <div className="input-flex">
            <p>Attr2:</p>
            <input
              value={ cardAttr2 }
              onChange={ onInputChange }
              type="number"
              id="attr2"
              name="attr2"
              data-testid="attr2-input"
            />
          </div>
          <div className="input-flex">
            <p>Attr3:</p>
            <input
              value={ cardAttr3 }
              onChange={ onInputChange }
              type="number"
              id="attr3"
              name="attr3"
              data-testid="attr3-input"
            />
          </div>
          <div className="input-flex">
            <p>Imagem(URL):</p>
            <input
              value={ cardImage }
              onChange={ onInputChange }
              type="text"
              name="imagem"
              id="imagem"
              data-testid="image-input"
            />
          </div>
          <div className="left-label">
            Raridade
            <select
              value={ cardRare }
              onChange={ onInputChange }
              name="raridade"
              data-testid="rare-input"
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </div>
          <div>
            { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho.</p>
              : (
                <div className="left-label">
                  <label htmlFor="superTrunfo">
                    <input
                      className="trunfo-input"
                      checked={ cardTrunfo }
                      onChange={ onInputChange }
                      id="superTrunfo"
                      type="checkbox"
                      name="cardTrunfo"
                      data-testid="trunfo-input"
                    />
                    Super Trunfo
                  </label>
                </div>
              )}
          </div>
          <button
            className="btn save"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            type="button"
            data-testid="save-button"
          >
            Salvar
          </button>
        </form>
      </section>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
