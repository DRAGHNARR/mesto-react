function Card({card, onCardClick, onDeleteClick}) {
  
  function handleClick() {
    onCardClick(card);
  }  

  return (
    <li className="post">
      <figure className="post__box">
        <div className="post__frame">
          <img src={card.src} alt="Изображение карточки" className="post__figure" onClick={handleClick}/>
          <button className="post__button-remove" type="button" onClick={onDeleteClick  }></button>
        </div>
        <figcaption className="post__caption">
          <h2 className="post__title">{card.name}</h2>
          <div className="post__like-holder">
            <button className="post__button-like" type="button"></button>
            <p className="post__like-count">{card.likes}</p>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;