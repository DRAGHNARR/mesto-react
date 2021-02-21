import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="who">
        <figure className="who__box">
          <img src={currentUser && currentUser.pic} alt="Аватар" className="who__figure"/>
          <button className="who__figure-eddit" type="button" onClick={onEditAvatar}></button>
          <figcaption className="who__caption">
            <div className="who__life-hacks">
              <h1 className="who__title">{currentUser && currentUser.name}</h1>
              <button className="who__button-eddit" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="who__subtitle">{currentUser && currentUser.desc}</p>
          </figcaption>
        </figure>
        <button className="who__button-add" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="posts page__posts">
        <ul className="posts__box">
          {
            cards && cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike}/>)
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
