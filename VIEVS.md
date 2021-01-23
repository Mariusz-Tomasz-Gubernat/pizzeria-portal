# DASHBOARD

`/`
- statystyki dzisiejszych zamówień (zdalne i lokalne)

# LOGOWANIE

`/login`
- pola na login i hasło
- guzik do zalogowania (link do dashboardu)

# WIDOK DOSTĘPNOŚCI STOLIKÓW

`/tables`

- wybór daty i godziny
- tabela z listą rezerwacji oraz wydarzeń
  - każda kolumna = 1 stolik
  - każdy wiersz = 30 minut
  - ma przypominać widok tygodnia w kalendarzu Google, gdzie w kolumnach zamiast dni są różne stoliki
  - po kliknięciu rezerwacji lub eventu przechodzimy na stronę szczegółów
`/tables/booking/:id`
- zawiera wszystkie informacje dotyczące rezerwacji
- umożliwia edycję i zapisanie zmian
`/tables.booking/new`
- analogicznie do powyższej, dla eventów
`/tables/events/:id`
- analogicznie do powyższej, dla eventów
`/tables/events/new`
-analogicznie do powyższej, dla eventów bez początkowej informacji

# WIDOK KELNERA

`/waiter`
- tabela
  - w wierszach stoliki
  - w kolumnach różne rodzaje informacji (status, czas od ostaniej aktywności)
  - w ostaniej kolumnie dostępne akcje dla danego stolika
`/waiter/order/new`
- numer stolika (edytowany)
- menu produktów
- opcje wybranego produktu
- zamówienie (zamówione produkty z opcjami i ceną)
- kwotę zamówienia
`/waiter/order/:id`
-jak powyższa

# WIDOK KUCHNI

`/kitchen`
- wyświetla listę zamówień w kolejności ich złożenia
- lista musi zawierać numer stolika (lub zamówienia zdalnego) 
- pełne informacje dot. zamówionych dań
- na liście musi być możliwość oznaczenia zamówienia jako zrealizowane