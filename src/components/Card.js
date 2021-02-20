function Card({card, onCardClick, onCardDelete, onCardLike}) {
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
          <img src={card.pic} alt="Изображение карточки" className="post__figure" onClick={handleClick}/>
          <button className={`post__button-remove ${!card.deletable && "post__button-remove_disable"}`} type="button" onClick={handleDelete}></button>
        </div>
        <figcaption className="post__caption">
          <h2 className="post__title">{card.name}</h2>
          <div className="post__like-holder">
            <button className={`post__button-like ${card.liked && "post__button-like_active"}`} type="button" onClick={handleLike}></button>
            <p className="post__like-count">{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;