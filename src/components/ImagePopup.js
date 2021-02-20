function ImagePopup({card, isSelected, onClose}) {

  return (
    <section className={`popup ${isSelected && "popup_active"}`}>
      <div className="popup__image-box">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <figure className="popup__caption">
          <img src={card && card.pic} alt="Изображение карточки" className="popup__figure"/>
          <figcaption className="popup__caption">
            <h2 className="popup__caption-title">{card && card.name}</h2>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;