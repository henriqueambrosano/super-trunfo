import React from 'react';
import PropTypes from 'prop-types';
import card from './card.css';

class Card extends React.Component {
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
      cardButton,
      deleteCard,
    } = this.props;
    return (
      <div className="card">
        <div className="white-border" />
        <div className="green-border" />
        <div className="card-content">
          <p
            className="card-name"
            data-testid="name-card"
          >
            {cardName || 'Pokemon name' }
          </p>
          <img
            className="card-image"
            src={ cardImage || 'https://www.ebrink.com.br/media/catalog/category/super-trunfo-logo.jpg' }
            alt={ cardName }
            data-testid="image-card"
          />
          <p
            className="card-description"
            data-testid="description-card"
          >
            { cardDescription || 'Descrição da carta' }
          </p>
          <div className="attr">
            <span>Attr01...........................................................</span>
            <p data-testid="attr1-card">
              {cardAttr1}
            </p>
          </div>
          <div className="attr">
            <span>Attr02...........................................................</span>
            <p data-testid="attr2-card">
              {cardAttr2}
            </p>
          </div>
          <div className="attr">
            <span>Attr03...........................................................</span>
            <p data-testid="attr3-card">
              {cardAttr3}
            </p>
          </div>
          <p data-testid="rare-card">
            {`Raridade: ${cardRare}`}
          </p>
          {cardTrunfo && <p className="trunfo" data-testid="trunfo-card">Super Trunfo</p>}
        </div>
        {cardButton && (
          <button
            className="btn-delete"
            onClick={ deleteCard }
            id={ cardName }
            type="button"
            data-testid="delete-button"
          >
            Excluir
          </button>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  cardButton: PropTypes.bool.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Card;
