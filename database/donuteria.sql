-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2026 at 11:40 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `donuteria`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `adresy`
--

CREATE TABLE `adresy` (
  `id` bigint(30) NOT NULL,
  `id_klient` bigint(30) NOT NULL,
  `ulica_i_numer_domu_lub_mieszkania` varchar(255) NOT NULL,
  `miejscowosc` varchar(100) NOT NULL,
  `kod_pocztowy` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adresy`
--

INSERT INTO `adresy` (`id`, `id_klient`, `ulica_i_numer_domu_lub_mieszkania`, `miejscowosc`, `kod_pocztowy`) VALUES
(1770411759447, 1770411759446, 'Polna 12/5', 'Raszyn', '12-777'),
(1770414075641, 1770414075640, 'fdsfs', 'Gdańsk', '00-222'),
(1770414506964, 1770414506963, 'Sienkiewicza 52/2', 'Kalisz', '02-495'),
(1770414638000, 1770414637999, 'fdsfs', 'Gdańsk', '02-495'),
(1770506664611, 1770506664610, 'Krajewskiego 13/2', 'Kraków', '21-323'),
(1770642497897, 1770642497896, 'Sezamkowa', 'Gdańsk', '02-495'),
(1770642638283, 1770642638282, 'Sezamkowa', 'Katowice', '22-034'),
(1770643901968, 1770643901967, 'Sezamkowa', 'Gdańsk', '00-222'),
(1770643957765, 1770643957764, 'Sezamkowa', 'Gdańsk', '02-495'),
(1770644224724, 1770644224723, 'Sezamkowa', 'Gdańsk', '12-000'),
(1770644413296, 1770644413295, 'Sezamkowa', 'Gdańsk', '02-495'),
(1770644542635, 1770644542634, 'Sezamkowa', 'Gdańsk', '02-495'),
(1770727501190, 1770727501189, 'sadas', 'Katowice', '02-495'),
(1770727627276, 1770727627275, 'Sezamkowa', 'Gdańsk', '00-222'),
(1770727640951, 1770727640950, 'sadas', 'Katowice', '00-222'),
(1770728981927, 1770728981926, 'sadas', 'Gdańsk', '00-222'),
(1770729035931, 1770729035930, 'Sezamkowa', 'Gdańsk', '02-495'),
(1770732437636, 1770732437635, 'Polna 12/5', 'Katowice', '00-222'),
(1770733207704, 1770733207703, 'Sezamkowa', 'Gdańsk', '02-495'),
(1770737105539, 1770737105538, 'Sezamkowa', 'Gdańsk', '02-495');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `klienci`
--

CREATE TABLE `klienci` (
  `id` bigint(30) NOT NULL,
  `id_uzytkownik` int(11) DEFAULT NULL,
  `imie` varchar(60) NOT NULL,
  `nazwisko` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefon` varchar(20) NOT NULL,
  `numer_konta` varchar(100) DEFAULT NULL,
  `bank` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klienci`
--

INSERT INTO `klienci` (`id`, `id_uzytkownik`, `imie`, `nazwisko`, `email`, `telefon`, `numer_konta`, `bank`) VALUES
(1770411759446, 3, 'Krystyna', 'Jędrzejczak', 'krys@jedrzejczak.com', '111222333', '53713893940457713060497595', 'Santander Bank Polska'),
(1770414075640, NULL, 'sd', 'Matczka', 'sebastiannowakowski1@onet.pl', '999333222', '67386711233860138948731036', 'BNP Paribas Bank Polska'),
(1770414506963, 3, 'Krystyna', 'Jędrzejczak', 'krys@jedrzejczak.com', '999333222', '23379753630219888412166873', 'PKO Bank Polski (PKO BP)'),
(1770414637999, 4, 'sdsad', 'Matczak', 'sebastiannowakowski1@onet.pl', '999 333 222', '56957333677632619316942311', 'Alior Bank'),
(1770506664610, 7, 'Sebastian', 'Nowakowski', 'nowakowski920@gmail.com', '222 333 445', NULL, NULL),
(1770642497896, 3, 'Krystyna', 'Jędrzejczak', 'krys@jedrzejczak.com', '999333222', '92946015178896524040671262', 'PKO Bank Polski (PKO BP)'),
(1770642638282, 3, 'Krystyna', 'Jędrzejczak', 'test@test.com', '999 333 222', '17679353699737552738792235', 'PKO Bank Polski (PKO BP)'),
(1770643901967, 3, 'test test', 'Jędrzejczak', 'krys@jedrzejczak.com', '999333222', '18186868246736503198372751', 'Bank Millennium'),
(1770643957764, 3, 'Krystyna', 'Jędrzejczak', 'test@test.com', '999333222', '92980737877951435198746127', 'Bank Millennium'),
(1770644224723, 3, 'Krystyna', 'Jędrzejczak', 'test3@test.com', '999333222', '95601830286224093318605215', 'Santander Bank Polska'),
(1770644413295, 3, 'Krystyna', 'Jedrzejczak', 'krys@jedrzejczak.com', '999333222', '92769594725223894645093948', 'PKO Bank Polski (PKO BP)'),
(1770644542634, 3, 'Krystyna', 'Matczka', 'krys@jedrzejczak.com', '999333222', '41622322162241588601938565', 'Bank Millennium'),
(1770727501189, 7, 'Lucek', 'Lucek', 'test@test.com', '999333222', '72425795997850151058566733', 'PKO Bank Polski (PKO BP)'),
(1770727627275, 7, 'Lucek', 'Lucek', 'test@test.com', '999333222', '75492489144606630528778136', 'BNP Paribas Bank Polska'),
(1770727640950, 7, 'Lucek', 'Matczak', 'test@test.com', '999 333 222', '17456628046014669851687472', 'BNP Paribas Bank Polska'),
(1770728981926, 7, 'Lucek', 'Lucek', 'test@test.com', '999 333 222', '54371549831660401639082292', 'PKO Bank Polski (PKO BP)'),
(1770729035930, 7, 'Lucek', 'Lucek', 'nowakowski920@gmail.com', '999 333 222', '11289029590769495484346214', 'PKO Bank Polski (PKO BP)'),
(1770732437635, 7, 'Lucek', 'Matczak', 'test@test.com', '999 333 222', '95768798466116452389926284', 'BNP Paribas Bank Polska'),
(1770733207703, 7, 'test test', 'Matczka', 'krys@jedrzejczak.com', '999333222', '11787384254930833335888449', 'VeloBank'),
(1770737105538, 3, 'Krystyna', 'Jędrzejczak', 'krys@jedrzejczak.com', '999333222', '33526451427826066408731733', 'Bank Pekao S.A.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `producenci`
--

CREATE TABLE `producenci` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(100) NOT NULL,
  `www` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `NIP` varchar(100) NOT NULL,
  `adres` varchar(500) NOT NULL,
  `numer_telefonu` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producenci`
--

INSERT INTO `producenci` (`id`, `nazwa`, `www`, `email`, `NIP`, `adres`, `numer_telefonu`) VALUES
(1, 'donutex', 'wwww.donutex.pl', 'donutex@gmail.com', '1234567890', 'Pokątna 2/5 Warszawa 02-592', '999888777');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkty`
--

CREATE TABLE `produkty` (
  `id` int(11) NOT NULL,
  `id_kategorie` int(11) NOT NULL,
  `id_producenta` int(11) NOT NULL,
  `nazwa` varchar(100) NOT NULL,
  `cena_netto` decimal(10,2) NOT NULL,
  `stawka_vat` int(11) NOT NULL,
  `kwota_vat` decimal(10,2) NOT NULL,
  `cena_brutto` decimal(10,2) NOT NULL,
  `opis` varchar(400) NOT NULL,
  `obrazek` varchar(500) NOT NULL,
  `opis_obrazka` varchar(100) NOT NULL,
  `liczba_sztuk` int(11) NOT NULL,
  `czy_dostepny` tinyint(1) DEFAULT NULL,
  `czas_oczekiwania_na_wykonanie` varchar(100) NOT NULL,
  `opakowanie_sup` varchar(100) NOT NULL,
  `ilosc_w_opakowaniu` int(11) NOT NULL,
  `waga` varchar(100) NOT NULL,
  `sklad` varchar(100) NOT NULL,
  `alergeny` varchar(100) NOT NULL,
  `dodatkowe_info` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkty`
--

INSERT INTO `produkty` (`id`, `id_kategorie`, `id_producenta`, `nazwa`, `cena_netto`, `stawka_vat`, `kwota_vat`, `cena_brutto`, `opis`, `obrazek`, `opis_obrazka`, `liczba_sztuk`, `czy_dostepny`, `czas_oczekiwania_na_wykonanie`, `opakowanie_sup`, `ilosc_w_opakowaniu`, `waga`, `sklad`, `alergeny`, `dodatkowe_info`) VALUES
(1, 1, 1, 'Donut Truskawkowy', 11.37, 23, 2.62, 13.99, 'Puszysty donut z delikatnego ciasta drożdżowego, wypełniony naturalnym nadzieniem truskawkowym i pokryty lekką, owocową glazurą, która podkreśla świeży, letni charakter smaku.', 'https://storage.googleapis.com/donuteria/donutStrawberry.png', 'StrawberryDonut', 200, 1, '48h', 'tak', 1, '50-60 g', 'mąka pszenna, mleko, jaja, masło, cukier, drożdże, nadzienie truskawkowe (truskawki, cukier, sok z c', 'gluten, mleko, jaja', 'Produkt może zawierać drobne ilości orzechów i soi'),
(3, 1, 1, 'Donut Jagodowy', 11.37, 23, 2.62, 13.99, 'Miękki donut z maślanym ciastem, nadziewany intensywnym kremem jagodowym z całych owoców, wykończony glazurą dla idealnej równowagi słodyczy i kwasowości.', 'https://storage.googleapis.com/donuteria/donutBlueberry.png', 'BlueberryDonut', 200, 1, '48h', 'tak', 1, '50-60 g', 'mąka pszenna, jaja, masło, cukier, drożdże nadzienie jagodowe(jagody, cukier, sok z cytryny), glazur', 'gluten, mleko, jaja', 'Produkt może zawierać drobne ilości orzechów i soi'),
(4, 1, 1, 'Czekoladowy Donut', 11.37, 23, 2.62, 13.99, 'Klasyczny donut z kakaowego ciasta, wypełniony aksamitnym kremem czekoladowym i oblany gładką polewą z wysokiej jakości białej czekolady o głębokim, słodkim smaku.', 'https://storage.googleapis.com/donuteria/donutChocolate.png', 'ChocolateDonut', 200, 1, '48h', 'tak', 1, '50-60 g', 'mąka pszenna, mleko, jaja, masło, cukier, drożdże, czekolada', 'gluten, mleko, jaja', 'Produkt może zawierać drobne ilości orzechów i soi');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkty_kategorie`
--

CREATE TABLE `produkty_kategorie` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkty_kategorie`
--

INSERT INTO `produkty_kategorie` (`id`, `nazwa`) VALUES
(1, 'donuty amerykańskie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkty_w_zamowieniu`
--

CREATE TABLE `produkty_w_zamowieniu` (
  `id` bigint(30) NOT NULL,
  `id_zamowienia` bigint(30) NOT NULL,
  `id_produktu` int(11) NOT NULL,
  `ilosc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produkty_w_zamowieniu`
--

INSERT INTO `produkty_w_zamowieniu` (`id`, `id_zamowienia`, `id_produktu`, `ilosc`) VALUES
(1770414506967, 1770414506965, 3, 3),
(1770414506968, 1770414506965, 1, 1),
(1770414638003, 1770414638001, 1, 1),
(1770642497900, 1770642497898, 3, 4),
(1770642638286, 1770642638284, 3, 6),
(1770643901971, 1770643901969, 1, 2),
(1770643901972, 1770643901969, 3, 2),
(1770643957768, 1770643957766, 1, 2),
(1770643957769, 1770643957766, 3, 14),
(1770644224727, 1770644224725, 1, 2),
(1770644224728, 1770644224725, 3, 13),
(1770644413299, 1770644413297, 1, 2),
(1770644413300, 1770644413297, 3, 13),
(1770644542638, 1770644542636, 1, 1),
(1770727501193, 1770727501191, 1, 2),
(1770727627279, 1770727627277, 3, 3),
(1770727640954, 1770727640952, 3, 3),
(1770728981930, 1770728981928, 3, 3),
(1770729035934, 1770729035932, 3, 3),
(1770732437639, 1770732437637, 1, 2),
(1770732437640, 1770732437637, 3, 1),
(1770733207707, 1770733207705, 1, 2),
(1770733207708, 1770733207705, 3, 1),
(1770737105542, 1770737105540, 1, 2),
(1770737105543, 1770737105540, 3, 2),
(1770737105544, 1770737105540, 4, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL,
  `login` varchar(60) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `data_utworzenia` date NOT NULL,
  `punkty` int(11) NOT NULL,
  `rola` varchar(20) NOT NULL,
  `czyZbanowany` tinyint(1) DEFAULT NULL,
  `powod_bana` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`id`, `login`, `email`, `password_hash`, `data_utworzenia`, `punkty`, `rola`, `czyZbanowany`, `powod_bana`) VALUES
(1, 'user3', 'test2@test.com', '$argon2id$v=19$m=65536,t=3,p=1$koP7Z6p94cIBHgu1M4gF2w$FTvgl1NqPD0AiOsrHHv+kGNXzgycllYLbavoRY7Z+Bo', '2026-01-23', 0, 'user', 0, NULL),
(2, 'user34', 'sebastiannowakowski1@onet.pl', '$argon2id$v=19$m=65536,t=3,p=1$mbt2aXu/m9UTpA85EFYS2A$bLQFCOnABY3wVSRa6hoHxJ40+6LVPFI94FD7Ek96kWk', '2026-01-25', 0, 'user', 0, NULL),
(3, 'Krystyna', 'krys@jedrzejczak.com', '$argon2id$v=19$m=65536,t=3,p=1$KKNMwinhGyZaj2nj6fSBDg$fbw90vn39u6zs8RzARPopU9pwcxhDDcP++iazdMJ0aI', '2026-02-05', 242, 'user', 0, NULL),
(4, 'user32', 'test3@test.com', '$argon2id$v=19$m=65536,t=3,p=1$EkwpamNmZUkrXt8ljQIhlA$fV5YRaa7yjiW3kE7+pPJfmho0oTwisAOAguHLg5H0S8', '2026-02-06', 7, 'user', 0, NULL),
(7, 'user100', 'nowakowski920@gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$ycrMrqNqyto8nY8fgJChzQ$MZkMSkZr5CnkGoQ2YTRBjkaXdc1qpXi9FhHBqrYaKmU', '2026-02-08', 76, 'user', 1, 'Fałszywe dane'),
(8, 'Admin', 'admin@admin.gmail.com', '$argon2id$v=19$m=65536,t=3,p=1$U+5rRfeZ1VkkXGPteDzm+g$KuxhQ5zlxqWAGGE1yJbqn9w8F6KqyQ+My4efMtX0Rpk', '2026-02-09', 0, 'admin', 0, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id` bigint(30) NOT NULL,
  `id_klient` bigint(30) NOT NULL,
  `id_adres` bigint(30) NOT NULL,
  `sposob_platnosci` varchar(50) NOT NULL,
  `sposob_dostawy` varchar(50) NOT NULL,
  `stan_zamowienia` varchar(50) NOT NULL,
  `punkty` int(11) NOT NULL,
  `data_wystawienia` datetime NOT NULL,
  `data_zakonczenia_dostawy_towarów` date DEFAULT NULL,
  `data_platnosci` date NOT NULL,
  `calkowita_cena_do_zaplaty` decimal(10,2) NOT NULL,
  `numer_faktury` varchar(50) NOT NULL,
  `koszt_dostarczenia` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zamowienia`
--

INSERT INTO `zamowienia` (`id`, `id_klient`, `id_adres`, `sposob_platnosci`, `sposob_dostawy`, `stan_zamowienia`, `punkty`, `data_wystawienia`, `data_zakonczenia_dostawy_towarów`, `data_platnosci`, `calkowita_cena_do_zaplaty`, `numer_faktury`, `koszt_dostarczenia`) VALUES
(1770411759448, 1770411759446, 1770411759447, 'card', 'FedEx', 'wysłane', 0, '2026-02-06 00:00:00', NULL, '2026-02-06', 47.97, '11759449', 0.00),
(1770414075642, 1770414075640, 1770414075641, 'card', 'FedEx', 'wysłane', 12, '2026-02-06 00:00:00', NULL, '2026-02-06', 61.96, '14075643', 0.00),
(1770414506965, 1770414506963, 1770414506964, 'card', 'DHL', 'wysłane', 16, '2026-02-06 00:00:00', NULL, '2026-02-06', 77.95, '14506966', 0.00),
(1770414638001, 1770414637999, 1770414638000, 'card', 'FedEx', 'wysłane', 7, '2026-02-06 00:00:00', NULL, '2026-02-06', 33.98, '14638002', 0.00),
(1770642497898, 1770642497896, 1770642497897, 'blik', 'DPD', 'wysłane', 14, '2026-02-09 00:00:00', NULL, '2026-02-09', 68.95, '42497899', 0.00),
(1770642638284, 1770642638282, 1770642638283, 'card', 'DHL', 'wysłane', 21, '2026-02-09 00:00:00', NULL, '2026-02-09', 105.93, '42638285', 0.00),
(1770643901969, 1770643901967, 1770643901968, 'card', 'DPD', 'wysłane', 14, '2026-02-09 00:00:00', NULL, '2026-02-09', 68.95, '43901970', 0.00),
(1770643957766, 1770643957764, 1770643957765, 'card', 'DPD', 'wysłane', 47, '2026-02-09 00:00:00', NULL, '2026-02-09', 236.83, '43957767', 0.00),
(1770644224725, 1770644224723, 1770644224724, 'Przelew bankowy', 'DPD', 'wysłane', 45, '2026-02-09 00:00:00', NULL, '2026-02-09', 222.84, '44224726', 0.00),
(1770644413297, 1770644413295, 1770644413296, 'card', 'DHL', 'wysłane', 46, '2026-02-09 14:40:13', NULL, '2026-02-09', 231.84, '44413298', 0.00),
(1770644542636, 1770644542634, 1770644542635, 'card', 'DPD', 'wysłane', 5, '2026-02-09 14:42:22', NULL, '2026-02-09', 26.98, '44542637', 0.00),
(1770727501191, 1770727501189, 1770727501190, 'card', 'DPD', 'wysłane', 8, '2026-02-10 13:45:01', NULL, '2026-02-10', 40.97, '27501192', 0.00),
(1770727627277, 1770727627275, 1770727627276, 'blik', 'Inpost', 'wysłane', 10, '2026-02-10 13:47:07', NULL, '2026-02-10', 51.97, '27627278', 0.00),
(1770727640952, 1770727640950, 1770727640951, 'blik', 'Inpost', 'wysłane', 10, '2026-02-10 13:47:21', NULL, '2026-02-10', 51.97, '27640953', 0.00),
(1770728981928, 1770728981926, 1770728981927, 'card', 'DHL', 'wysłane', 13, '2026-02-10 14:09:42', NULL, '2026-02-10', 63.96, '28981929', 22.00),
(1770729035932, 1770729035930, 1770729035931, 'card', 'FedEx', 'wysłane', 12, '2026-02-10 14:10:36', NULL, '2026-02-10', 61.96, '29035933', 19.99),
(1770732437637, 1770732437635, 1770732437636, 'Przelew bankowy', 'FedEx', 'wysłane', 12, '2026-02-10 15:07:17', NULL, '2026-02-10', 61.96, '32437638', 19.99),
(1770733207705, 1770733207703, 1770733207704, 'Przelew bankowy', 'DPD', 'wysłane', 11, '2026-02-10 15:20:07', NULL, '2026-02-10', 54.96, '33207706', 12.99),
(1770737105540, 1770737105538, 1770737105539, 'card', 'FedEx', 'wysłane', 29, '2026-02-10 16:25:05', NULL, '2026-02-10', 145.90, '37105541', 19.99);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `adresy`
--
ALTER TABLE `adresy`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `adresy_ibfk_1` (`id_klient`);

--
-- Indeksy dla tabeli `klienci`
--
ALTER TABLE `klienci`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_uzytkownik` (`id_uzytkownik`);

--
-- Indeksy dla tabeli `producenci`
--
ALTER TABLE `producenci`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeksy dla tabeli `produkty`
--
ALTER TABLE `produkty`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_kategorie` (`id_kategorie`),
  ADD KEY `id_producenta` (`id_producenta`);

--
-- Indeksy dla tabeli `produkty_kategorie`
--
ALTER TABLE `produkty_kategorie`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indeksy dla tabeli `produkty_w_zamowieniu`
--
ALTER TABLE `produkty_w_zamowieniu`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_zamowienia` (`id_zamowienia`),
  ADD KEY `id_produktu` (`id_produktu`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_hash` (`password_hash`);

--
-- Indeksy dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `zamowienia_ibfk_1` (`id_klient`),
  ADD KEY `zamowienia_ibfk_2` (`id_adres`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `producenci`
--
ALTER TABLE `producenci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `produkty`
--
ALTER TABLE `produkty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `produkty_kategorie`
--
ALTER TABLE `produkty_kategorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adresy`
--
ALTER TABLE `adresy`
  ADD CONSTRAINT `adresy_ibfk_1` FOREIGN KEY (`id_klient`) REFERENCES `klienci` (`id`);

--
-- Constraints for table `klienci`
--
ALTER TABLE `klienci`
  ADD CONSTRAINT `klienci_ibfk_1` FOREIGN KEY (`id_uzytkownik`) REFERENCES `uzytkownicy` (`id`);

--
-- Constraints for table `produkty`
--
ALTER TABLE `produkty`
  ADD CONSTRAINT `produkty_ibfk_1` FOREIGN KEY (`id_kategorie`) REFERENCES `produkty_kategorie` (`id`),
  ADD CONSTRAINT `produkty_ibfk_2` FOREIGN KEY (`id_producenta`) REFERENCES `producenci` (`id`);

--
-- Constraints for table `produkty_w_zamowieniu`
--
ALTER TABLE `produkty_w_zamowieniu`
  ADD CONSTRAINT `produkty_w_zamowieniu_ibfk_1` FOREIGN KEY (`id_zamowienia`) REFERENCES `zamowienia` (`id`),
  ADD CONSTRAINT `produkty_w_zamowieniu_ibfk_2` FOREIGN KEY (`id_produktu`) REFERENCES `produkty` (`id`);

--
-- Constraints for table `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD CONSTRAINT `zamowienia_ibfk_1` FOREIGN KEY (`id_klient`) REFERENCES `klienci` (`id`),
  ADD CONSTRAINT `zamowienia_ibfk_2` FOREIGN KEY (`id_adres`) REFERENCES `adresy` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
