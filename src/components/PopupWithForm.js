function PopupWithForm({name, title, children, isOpen, buttonTitle, onClose, onSubmit}) {
  return (
    <section className={`popup ${isOpen && "popup_active"}`}>
      <div className="popup__box">
        <button className="popup__button-close" type="button" onClick={onClose}></button>
          <form className="popup__form" method="get" action="index.js" name={name} onSubmit={onSubmit}>
            <h2 className="popup__title">{title}</h2>
            {children}
            <button className="popup__button-save" type="submit">{buttonTitle}</button>
          </form>
      </div>
    </section>
  );
}

export default PopupWithForm;