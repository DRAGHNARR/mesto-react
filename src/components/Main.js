import React from "react";
import Card from "./Card";
import whoFigure from "../images/who/__figure/who__figure.jpg";
import api from "../utils/Api";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = React.useState("default");
  const [userDescription, setUserDescription] = React.useState("default");
  const [userAvatar, setUserAvatar] = React.useState(whoFigure);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() =>{
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(res => {
        setUserName(res[0].name);
        setUserDescription(res[0].about);
        setUserAvatar(res[0].avatar);
        setCards(res[1].map((item) => {
          return ({
            key: item._id,
            name: item.name,
            src: item.link,
            likes: item.likes.length,
            selected: false
          });
        }));
      })
      .catch(err => {
        setUserName("Big badaboom, friend");
        setUserDescription("Call us and we will try to fix it.");
        setUserAvatar(whoFigure);
        setCards([]);
        console.log(err);
      });
  }, []);

  return (
    <main className="main page__main">
      <section className="who">
        <figure className="who__box">
          <img src={userAvatar} alt="Аватар" className="who__figure"/>
          <button className="who__figure-eddit" type="button" onClick={onEditAvatar}></button>
          <figcaption className="who__caption">
            <div className="who__life-hacks">
              <h1 className="who__title">{userName}</h1>
              <button className="who__button-eddit" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="who__subtitle">{userDescription}</p>
          </figcaption>
        </figure>
        <button className="who__button-add" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="posts page__posts">
        <ul className="posts__box">
          {
            cards.map(card => <Card key={card.key} card={card} onCardClick={onCardClick}/>)
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
