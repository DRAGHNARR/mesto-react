import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext); 

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <li className="post">
      <figure className="post__box">
        <div className="post__frame">
          <img src={card.link} alt="Изображение карточки" className="post__figure" onClick={handleClick}/>
          <button className={`post__button-remove ${!(currentUser.key === card.owner._id) && "post__button-remove_disable"}`} type="button" onClick={handleDelete}></button>
        </div>
        <figcaption className="post__caption">
          <h2 className="post__title">{card.name}</h2>
          <div className="post__like-holder">
            <button className={`post__button-like ${card.likes.some(item => currentUser.key === item._id) && "post__button-like_active"}`} type="button" onClick={handleLike}></button>
            <p className="post__like-count">{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;