import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

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
            src={ cardImage || 'https://camo.githubusercontent.com/ec684c89c93b8761907b910919ca4caf5605c792e380ed2c0fdac5ed65b664b0/68747470733a2f2f626c6f672e756d626c65722e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031362f30392f706f73742d31362d30382d31352d7472756e666f2d686f7374696e672d6c6f676f2e706e67' }
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
