# Sklep internetowy

**Autor**: Michał Marciniak  
**Data**: Czerwiec 2025

---

## Założenia i zakres projektu

### Cel projektu

Celem projektu było stworzenie funkcjonalnej aplikacji webowej - sklepu internetowego, umożliwiającej użytkownikom przeglądanie i zakup elektroniki, a administratorowi - dodawanie produktów.

### Zakres funkcjonalny

- Rejestracja i logowanie użytkowników (JWT)  
- Przeglądanie produktów  
- Dodawanie produktów do koszyka  
- Składanie zamówień  
- Zarządzanie produktami  
- Responsywny interfejs  

---

## Oprogramowanie i narzędzia wspomagające

### Backend

- Java 21 + Spring Boot 3
  - Spring Web, Spring Security + JWT, Spring Data JPA
- PostgreSQL - baza danych
- Docker - konteneryzacja bazy danych
- Stripe - obsługa płatności
- Maven - zarządzanie zależnościami

### Frontend

- Typescript + React 19  
- Vite - narzędzie do budowy projektu  

### Inne narzędzia

- Postman - testowanie API  
- Git + Github - wersjonowanie  

---

## Opis aplikacji

Aplikacja składa się z 2 głównych części:

### Frontend

- Strona główna z listą produktów  
- Widok szczegółów produktów  
- Koszyk i płatności (Stripe)  
- Logowanie i rejestracja  
- Panel administratora - dodawanie i edycja produktów  

### Backend

- REST API z podziałem na role użytkownika i właściciela  
- JWT - logowanie i autoryzacja  
- Obsługa operacji CRUD na produktach  
- Walidacja danych  
- Komunikacja z bazą danych  

---

## Co udało się zrobić, a co zostało do zrobienia

### Ukończone funkcje:

- Logowanie i rejestracja z wykorzystaniem JWT  
- Obsługa koszyka i płatności  
- Interfejs użytkownika  
- Dodawanie produktów z interfejsu  
- REST API do historii zamówień i obsługi produktów  

### Do zrobienia:

- Pełny interfejs panelu administratora i historii zamówień
- Widok opisu produktu  

---

## Zrzuty ekranu

![Strona główna gościa](img/gosc.png)  
*Rysunek 1: Strona główna gościa*

![Okno rejestracji](img/rejestracja.png)  
*Rysunek 2: Okno rejestracji*

![Strona główna zalogowanego użytkownika](img/zalogowany.png)  
*Rysunek 3: Strona główna zalogowanego użytkownika*

![Strona główna właściciela](img/wlasciciel.png)  
*Rysunek 4: Strona główna właściciela (opcja dodania produktu)*

![Koszyk z produktami](img/koszyk.png)  
*Rysunek 5: Koszyk z produktami*

![Okno płatności](img/płatność.png)  
*Rysunek 6: Okno płatności*


