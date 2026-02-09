/* eslint-disable react/prop-types */
"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const faktura = {
  numer_faktury: "FV/02/2026/123",
  data_wystawienia: "2026-02-09T13:42:22.000Z",
  data_platnosci: "2026-02-08T23:00:00.000Z",
  sposob_platnosci: "Karta",
  sposob_dostawy: "DPD",
  calkowita_cena_do_zaplaty: "26.98",
  punkty: 5,
  id: 1770644542636,

  sprzedawca: {
    nazwa: "Sklep Testowy Sp. z o.o.",
    adres: "ul. Przykładowa 1, 00-001 Warszawa",
    nip: "5251234567",
  },

  nabywca: {
    nazwa: "Jan Kowalski",
    adres: "ul. Klienta 5, 00-002 Kraków",
    nip: "6781234567",
  },

  pozycje: [
    {
      nazwa: "Produkt testowy",
      ilosc: 1,
      cena_netto: 21.93,
      vat: 23,
    },
  ],
};

const LATIN_EXT_FONT_URL = "/fonts/NotoSans-wdth-wght.ttf";
const LATIN_EXT_FONT_FILE = "NotoSans-wdth-wght.ttf";
const LATIN_EXT_FONT_NAME = "NotoSans";

const loadFontAsBase64 = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load font");
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
};

export default function UserOrders({ orders }) {
  //   const faktura = orders[0];

  const generateInvoicePDF = async (faktura) => {
    const doc = new jsPDF();

    const fontBase64 = await loadFontAsBase64(LATIN_EXT_FONT_URL);
    doc.addFileToVFS(LATIN_EXT_FONT_FILE, fontBase64);
    doc.addFont(LATIN_EXT_FONT_FILE, LATIN_EXT_FONT_NAME, "normal");
    doc.setFont(LATIN_EXT_FONT_NAME, "normal");

    const formatDate = (date) => new Date(date).toLocaleDateString("pl-PL");

    // Nagłówek
    doc.setFontSize(18);
    doc.text("FAKTURA VAT", 14, 20);

    doc.setFontSize(11);
    doc.text(`Nr faktury: ${faktura.numer_faktury}`, 14, 30);
    doc.text(
      `Data wystawienia: ${formatDate(faktura.data_wystawienia)}`,
      14,
      36,
    );
    doc.text(`Data sprzedaży: ${formatDate(faktura.data_wystawienia)}`, 14, 42);
    doc.text(`Termin płatności: ${formatDate(faktura.data_platnosci)}`, 14, 48);

    // Sprzedawca / Nabywca
    doc.setFontSize(12);
    doc.text("Sprzedawca:", 14, 60);
    doc.setFontSize(10);
    doc.text(
      [
        faktura.sprzedawca.nazwa,
        faktura.sprzedawca.adres,
        `NIP: ${faktura.sprzedawca.nip}`,
      ],
      14,
      66,
    );

    doc.setFontSize(12);
    doc.text("Nabywca:", 110, 60);
    doc.setFontSize(10);
    doc.text(
      [
        faktura.nabywca.nazwa,
        faktura.nabywca.adres,
        `NIP: ${faktura.nabywca.nip}`,
      ],
      110,
      66,
    );

    // Tabela pozycji
    autoTable(doc, {
      startY: 90,
      head: [
        [
          "Lp.",
          "Nazwa towaru/usługi",
          "Ilość",
          "Cena netto",
          "VAT %",
          "Kwota VAT",
          "Wartość brutto",
        ],
      ],
      styles: { font: LATIN_EXT_FONT_NAME, fontStyle: "normal" },
      headStyles: { font: LATIN_EXT_FONT_NAME, fontStyle: "normal" },
      body: faktura.pozycje.map((p, index) => {
        const vatValue = (p.cena_netto * p.ilosc * p.vat) / 100;
        const brutto = p.cena_netto * p.ilosc + vatValue;

        return [
          index + 1,
          p.nazwa,
          p.ilosc,
          `${p.cena_netto.toFixed(2)} zł`,
          `${p.vat}%`,
          `${vatValue.toFixed(2)} zł`,
          `${brutto.toFixed(2)} zł`,
        ];
      }),
    });

    const endY = doc.lastAutoTable.finalY + 10;

    // Podsumowanie
    doc.setFontSize(11);
    doc.text(`Sposób płatności: ${faktura.sposob_platnosci}`, 14, endY);
    doc.text(`Sposób dostawy: ${faktura.sposob_dostawy}`, 14, endY + 6);

    doc.setFontSize(14);
    doc.text(
      `Do zapłaty: ${faktura.calkowita_cena_do_zaplaty} zł`,
      14,
      endY + 20,
    );

    // doc.setFontSize(10);
    // doc.text("Kwota słownie: dwadzieścia sześć zł 98/100", 14, endY + 28);

    // Stopka
    doc.setFontSize(9);
    doc.text(
      "Faktura wygenerowana elektronicznie, nie wymaga podpisu.",
      14,
      285,
    );

    doc.save(`faktura_${faktura.numer_faktury}.pdf`);
  };

  console.log(faktura);

  return (
    <main>
      <button onClick={() => generateInvoicePDF(faktura)}>
        Pobierz fakturę PDF
      </button>
    </main>
  );
}
