import {apiConfig} from "./consts";

class Api {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.header = headers;
    this.userUrl = baseUrl + "/users/me";
    this.cardUrl = baseUrl + "/cards";
    this.likeUrl = baseUrl + "/cards/likes";
    this.userPicUrl = baseUrl + "/users/me/avatar";
  }

  getUserInfo() {
    return fetch(this.userUrl, {headers: this.header})
    .then(answer => {
      if (answer.ok) {
        return answer.json();
      }
      return Promise.reject(`Ошибка: ${answer.status}`);
    });
  }

  setUserInfo({name, desc}) {
    return fetch(this.userUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        name,
        about: desc
      })
    })
    .then(answer => {
      if (answer.ok) {
        return answer.json();
      }
      return Promise.reject(`Ошибка: ${answer.status}`);
    });
  }

  setUserPic(pic) {
    return fetch(this.userPicUrl, {
      method: 'PATCH',
      headers: this.header,
      body: JSON.stringify({
        avatar: pic
      })
    })
    .then(answer => {
      if (answer.ok) {
        return answer.json();
      }
      return Promise.reject(`Ошибка: ${answer.status}`);
    });
  }

  getCards() {
    return fetch(this.cardUrl, {headers: this.header})
      .then(answer => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка: ${answer.status}`);
      });
  }

  setCard(name, pic) {
    return fetch(this.cardUrl, {
      method: 'POST',
      headers: this.header,
      body: JSON.stringify({
        name: name,
        link: pic
      })
    })
    .then(answer => {
      if (answer.ok) {
        return answer.json();
      }
      return Promise.reject(`Ошибка: ${answer.status}`);
    });
  }

  deleteCard(id) {
    return fetch(this.cardUrl + "/" + id, {
      method: 'DELETE',
      headers: this.header
    })
    .then(answer => {
      if (answer.ok) {
        return answer.json();
      }
      return Promise.reject(`Ошибка: ${answer.status}`);
    });
  }

  likeCard(id, isLiked) {
    return fetch(this.likeUrl + "/" + id, {
      method: !isLiked ? 'PUT' : 'DELETE',
      headers: this.header
    })
    .then(answer => {
      if (answer.ok) {
        return answer.json();
      }
      return Promise.reject(`Ошибка: ${answer.status}`);
    });
  }
}

const api = new Api(apiConfig);

export default api;