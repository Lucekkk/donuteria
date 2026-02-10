/* eslint-disable react/prop-types */
"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import classes from "./UserOrders.module.css";
import Image from "next/image";
import downloadImg from "@/assets/userPanel/download.png";

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

  const generateInvoicePDF = async (order) => {
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
    doc.text(`Nr faktury: ${order.invoice_number}`, 14, 30);
    doc.text(`Data wystawienia: ${formatDate(order.order_date)}`, 14, 36);
    doc.text(`Data sprzedaży: ${formatDate(order.order_date)}`, 14, 42);
    doc.text(`Termin płatności: ${formatDate(order.payment_date)}`, 14, 48);

    // Sprzedawca / Nabywca
    doc.setFontSize(12);
    doc.text("Sprzedawca:", 14, 60);
    doc.setFontSize(10);
    doc.text(
      [
        order.producer_name,
        order.producer_address,
        `NIP: ${order.producer_nip}`,
      ],
      14,
      66,
    );

    doc.setFontSize(12);
    doc.text("Nabywca:", 110, 60);
    doc.setFontSize(10);
    doc.text(
      [
        `${order.client_first_name} ${order.client_last_name}`,
        `${order.client_street}, ${order.client_postal_code} ${order.client_city}`,
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
          "Cena netto za sztukę",
          "VAT %",
          "Kwota VAT",
          "Wartość brutto za sztukę",
        ],
      ],
      styles: { font: LATIN_EXT_FONT_NAME, fontStyle: "normal" },
      headStyles: { font: LATIN_EXT_FONT_NAME, fontStyle: "normal" },
      body: order.items.map((p, index) => {
        return [
          index + 1,
          p.product_name,
          p.product_quantity,
          `${p.product_net_price} zł`,
          `${p.product_vat_rate}%`,
          `${p.product_vat_amount} zł`,
          `${p.product_gross_price} zł`,
        ];
      }),
    });

    const endY = doc.lastAutoTable.finalY + 10;

    // Podsumowanie
    doc.setFontSize(11);
    doc.text(`Sposób płatności: ${order.payment_method}`, 14, endY);
    doc.text(`Sposób dostawy: ${order.delivery_method}`, 14, endY + 6);
    doc.text(`Koszt dostawy: ${order.delivery_cost} zł`, 14, endY + 12);

    doc.setFontSize(14);
    doc.text(`Do zapłaty: ${order.total_price} zł`, 14, endY + 20);

    // doc.setFontSize(10);
    // doc.text("Kwota słownie: dwadzieścia sześć zł 98/100", 14, endY + 28);

    // Stopka
    doc.setFontSize(9);
    doc.text(
      "Faktura wygenerowana elektronicznie, nie wymaga podpisu.",
      14,
      285,
    );

    doc.save(`faktura_${order.invoice_number}.pdf`);
  };

  // console.log(faktura);

  return (
    <main className={classes.main}>
      <div className={classes.userOrders}>
        <h2>Moje zamówienia:</h2>
        <div className={classes.tableWrap}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th>Numer zamówienia</th>
                <th>Data zamówienia</th>
                <th>Cena</th>
                <th>Status</th>
                <th>Punkty</th>
                <th>Pobierz</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td data-label="Numer zamówienia">{order.id}</td>
                  <td data-label="Data zamówienia">
                    {new Date(order.order_date).toLocaleDateString("pl-PL")}
                  </td>
                  <td data-label="Cena">{order.total_price} zł</td>
                  <td data-label="Status">{order.status}</td>
                  <td data-label="Punkty">{order.points}</td>
                  <td data-label="Pobierz">
                    <button
                      className={classes.downloadIcon}
                      onClick={() => generateInvoicePDF(order)}
                    >
                      <Image src={downloadImg} alt="download icon" fill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
