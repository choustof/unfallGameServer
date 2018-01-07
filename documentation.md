**Consulter un utilisateur**
----
  Reourne les information d'un utilsateur sous forme de Json.

* **URL**

  /users/:pseudo

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `pseudo=[string]`

* **Data Params**


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    {
        "id": 141,
        "pseudo": "MichelMichel",
        "score": 25
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    "{ erreur : 'Cet utilisateur n existe pas' }"

