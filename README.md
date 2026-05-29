![image](https://github.com/user-attachments/assets/6565a05a-9d1f-40fa-839a-f1a3e19e6279)
![image](https://github.com/user-attachments/assets/ac0e0244-d51a-4106-bb5e-dc75fe85bdbb)
![image](https://github.com/user-attachments/assets/7e9340d3-1bb5-4337-8439-50035b8a996c)
![image](https://github.com/user-attachments/assets/b52741ec-c9c8-4137-9c1d-f25938b7d6fd)

## Testy i uruchamianie

Instrukcja uruchamiania testów lokalnie:

1. Zainstaluj zależności:

```bash
npm install
npx playwright install
```

2. Testy jednostkowe:

```bash
npm run test:unit
```

3. Testy integracyjne (Playwright): uruchom serwer deweloperski w innym terminalu:

```bash
npm run dev
npm run test:integration
```

4. Testy użyteczności (pa11y): wymagany działający serwer na `http://localhost:3000`:

```bash
npm run test:usability
```

Uwaga: Playwright i pa11y wymagają zainstalowanych przeglądarek; `npx playwright install` pobierze potrzebne binaria.
