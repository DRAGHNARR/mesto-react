function ImagePopup({card, onClose}) {

  return (
    <section className={`popup ${card && "popup_active"}`}>
      <div className="popup__image-box">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
        <figure className="popup__caption">
          <img src={card && card.src} alt="Изображение карточки" className="popup__figure"/>
          <figcaption className="popup__caption">
            <h2 className="popup__caption-title">{card && card.name}</h2>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;