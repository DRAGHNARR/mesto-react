import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, ...props}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");

  React.useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setDesc(currentUser ? currentUser.desc : "");
  }, [currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  
  function handleDescChange(event) {
    setDesc(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateUser({
      name,
      desc
    });
  }

  return (
    <PopupWithForm 
      name="who_form" 
      title="Редактировать профиль" 
      isOpen={isOpen}
      buttonTitle="Сохранить"
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input value={name} onChange={handleNameChange} id="who-title" className="popup__input" type="text" name="who_title" minLength="2" maxLength="40" required placeholder="Ваше имя"/>
      <span id="who-title-error" className="popup__input-error"></span>
      <input value={desc} onChange={handleDescChange} id="who-subtitle" className="popup__input" type="text" name="who_subtitle" minLength="2" maxLength="200" required placeholder="Ваше призвание"/>
      <span id="who-subtitle-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}