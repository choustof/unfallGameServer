**Consulter un utilisateur**
----
  Retourne les informations d'un utilsateur sous forme de Json.

* **URL**

  /user/:pseudo

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `pseudo=[varchar]`

* **Data Params**


* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
    {
        "id": 141,
        "pseudo": "MichelMichel",
        "score": 25
    }
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** 
    { 
      "erreur" : "Cet utilisateur n existe pas" 
    }

**Consulter tous les utilisateurs**
----
  Retourne les informations de tous les utilsateurs triés par ordre décroissant des scores sous forme de Json.

* **URL**

  /user

* **Method:**

  `GET`
  
*  **URL Params**
-

* **Data Params**

-

* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
     {
        "id": 61,
        "pseudo": "Jean",
        "score": 100
    },
    {
        "id": 111,
        "pseudo": "Michel",
        "score": 98
    },
    {
        "id": 81,
        "pseudo": "Robert",
        "score": 90
    }

    OU

    * **Code:** 200 Ok<br />
    **Content:** 
     {
        "warning": "Aucun utilisateur connecté"
    }


**Consulter le top 10**
----
  Retourne les 10 meilleur joueurs triés par ordre décroissant des scores.

* **URL**

  /user/classement/top10

* **Method:**

  `GET`
  
*  **URL Params**
-

* **Data Params**

-

* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
     {
        "id": 61,
        "pseudo": "Jean",
        "score": 100
    },
    {
        "id": 111,
        "pseudo": "Michel",
        "score": 98
    },
    {
        "id": 81,
        "pseudo": "Robert",
        "score": 90
    }

    OU

    * **Code:** 200 Ok<br />
    **Content:** 
     {
        "warning": "Aucun utilisateur connecté"
    }


**Consulter le score d'un utilisateur**
----
  Retourne le score d'un utilsateur sous forme de Json.

* **URL**

  /user/:pseudo/score

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `pseudo=[varchar]`

* **Data Params**


* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
    {
        "score": 25
    }
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** 
    { 
      "erreur" : "Cet utilisateur n existe pas" 
    }


**Ajouter un utilisateur**
----
  Ajoute un nouvel utilisateur

* **URL**

  /user

* **Method:**

  `POST`
  
*  **URL Params**

-

* **Data Params**

 **Required:**
 
   `pseudo=[varchar]`

* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
    {
        "pseudo": Michel
        "score": 20
    }
 
* **Error Response:**

  * **Code:** 409 Conflict <br />
    **Content:** 
    false

**Modifier un utilisateur**
----
  Modifier les informations d'un utilisateur
* **URL**

  /user/:pseudo

* **Method:**

  `PUT`
  
*  **URL Params**

  **Required:**
  `pseudo=[varchar]`

* **Data Params**

 **Required:**
 
   `pseudo=[varchar]`
   `score=[integer]`


* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
    {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 34,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41": true,
    "changedRows": 1
}
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** 
    { 
      "erreur" : "Cet utilisateur n existe pas" 
    }

**Modifier le score d'un utilisateur**
----
  Modifier le score d'un utilisateur
* **URL**

  /user/:pseudo/score

* **Method:**

  `PUT`
  
*  **URL Params**

  **Required:**
  `pseudo=[varchar]`

* **Data Params**

 **Not Required:**
 
   `score=[integer]`
   Si le score n'est pas renseigné, on le met à 0 par défaut.


* **Success Response:**

  * **Code:** 200 Ok<br />
    **Content:** 
    {
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 34,
    "warningCount": 0,
    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
    "protocol41": true,
    "changedRows": 1
}
 
* **Error Response:**

  * **Code:** 404 Not Found <br />
    **Content:** 
    { 
      "erreur" : "Cet utilisateur n existe pas" 
    }