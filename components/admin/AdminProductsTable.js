"use client";

/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import classes from "@/app/profil/[id]/page.module.css";

const emptyForm = {
  prodTitle: "",
  price: "",
  description: "",
  image: "",
  imageDescription: "",
  waitingTime: "",
  packaging: "",
  quantityPerPackage: "",
  weight: "",
  ingredients: "",
  allergens: "",
  additionalInfo: "",
};

const toNumberOrNull = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isNaN(numeric) ? null : numeric;
};

export default function AdminProductsTable({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [modalMode, setModalMode] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productRows = useMemo(() => products, [products]);

  const closeModal = () => {
    setModalMode(null);
    setActiveProduct(null);
    setFormData(emptyForm);
    setError("");
  };

  const openAddModal = () => {
    setModalMode("add");
    setActiveProduct(null);
    setFormData(emptyForm);
    setError("");
  };

  const openEditModal = (product) => {
    setModalMode("edit");
    setActiveProduct(product);
    setFormData({
      prodTitle: product.prodTitle || "",
      price: product.price ?? "",
      description: product.description || "",
      image: product.image || "",
      imageDescription: product.imageDescription || "",
      waitingTime: product.waitingTime || "",
      packaging: product.packaging || "",
      quantityPerPackage: product.quantityPerPackage ?? "",
      weight: product.weight || "",
      ingredients: product.ingredients || "",
      allergens: product.allergens || "",
      additionalInfo: product.additionalInfo || "",
    });
    setError("");
  };

  const openDeleteModal = (product) => {
    setModalMode("delete");
    setActiveProduct(product);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => ({
    prodTitle: formData.prodTitle.trim(),
    price: toNumberOrNull(formData.price),
    description: formData.description.trim(),
    image: formData.image.trim(),
    imageDescription: formData.imageDescription.trim(),
    waitingTime: formData.waitingTime.trim(),
    packaging: formData.packaging.trim(),
    quantityPerPackage: toNumberOrNull(formData.quantityPerPackage),
    weight: formData.weight.trim(),
    ingredients: formData.ingredients.trim(),
    allergens: formData.allergens.trim(),
    additionalInfo: formData.additionalInfo.trim(),
  });

  const handleSubmit = async () => {
    const payload = buildPayload();

    if (!payload.prodTitle || payload.price === null) {
      setError("Podaj nazwę produktu i cenę");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/allProducts", {
        method: modalMode === "add" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeProduct?.id,
          ...payload,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Nie udało się zapisać produktu");
      }

      if (modalMode === "add") {
        setProducts((prev) => [data.product, ...prev]);
      } else {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === data.product.id ? data.product : product,
          ),
        );
      }

      closeModal();
    } catch (err) {
      setError(err.message || "Wystąpił błąd");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!activeProduct) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/allProducts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeProduct.id }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Nie udało się usunąć produktu");
      }

      setProducts((prev) =>
        prev.filter((product) => product.id !== activeProduct.id),
      );
      closeModal();
    } catch (err) {
      setError(err.message || "Wystąpił błąd");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.adminPanel}>
      <div className={classes.adminPanelHeader}>
        <h2>Produkty</h2>
        <button
          type="button"
          className={classes.primaryButton}
          onClick={openAddModal}
        >
          Dodaj produkt
        </button>
      </div>
      <div className={classes.tableWrap}>
        <table className={`${classes.table} ${classes.productsTable}`}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Cena</th>
              <th>Opis</th>
              <th>Obrazek</th>
              <th>Opis obrazka</th>
              <th>Czas oczekiwania</th>
              <th>Opakowanie sup</th>
              <th>Ilość w opakowaniu</th>
              <th>Waga</th>
              <th>Skład</th>
              <th>Alergeny</th>
              <th>Dodatkowe info</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {productRows.map((product) => (
              <tr key={product.id}>
                <td data-label="ID">{product.id}</td>
                <td data-label="Nazwa">{product.prodTitle}</td>
                <td data-label="Cena">{product.price} zł</td>
                <td data-label="Opis">{product.description || "-"}</td>
                <td data-label="Obrazek">{product.image || "-"}</td>
                <td data-label="Opis obrazka">
                  {product.imageDescription || "-"}
                </td>
                <td data-label="Czas oczekiwania">
                  {product.waitingTime || "-"}
                </td>
                <td data-label="Opakowanie sup">{product.packaging || "-"}</td>
                <td data-label="Ilość w opakowaniu">
                  {product.quantityPerPackage ?? "-"}
                </td>
                <td data-label="Waga">{product.weight || "-"}</td>
                <td data-label="Skład">{product.ingredients || "-"}</td>
                <td data-label="Alergeny">{product.allergens || "-"}</td>
                <td data-label="Dodatkowe info">
                  {product.additionalInfo || "-"}
                </td>
                <td data-label="Akcje">
                  <div className={classes.adminActionButtons}>
                    <button
                      type="button"
                      className={classes.secondaryButton}
                      onClick={() => openEditModal(product)}
                    >
                      Edytuj
                    </button>
                    <button
                      type="button"
                      className={classes.dangerButton}
                      onClick={() => openDeleteModal(product)}
                    >
                      Usuń
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {productRows.length === 0 && (
              <tr>
                <td colSpan={14}>Brak produktów</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(modalMode === "add" || modalMode === "edit") && (
        <div className={classes.modalBackdrop}>
          <div className={classes.modalBox}>
            <h3>{modalMode === "add" ? "Dodaj produkt" : "Edytuj produkt"}</h3>
            <div className={classes.formGrid}>
              <label className={classes.modalLabel} htmlFor="prodTitle">
                Nazwa produktu
              </label>
              <input
                id="prodTitle"
                name="prodTitle"
                className={classes.formInput}
                value={formData.prodTitle}
                onChange={handleChange}
                placeholder="Nazwa produktu"
              />

              <label className={classes.modalLabel} htmlFor="price">
                Cena brutto
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className={classes.formInput}
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />

              <label className={classes.modalLabel} htmlFor="description">
                Opis
              </label>
              <textarea
                id="description"
                name="description"
                className={classes.formTextarea}
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Opis produktu"
              />

              <label className={classes.modalLabel} htmlFor="image">
                Obrazek (URL)
              </label>
              <input
                id="image"
                name="image"
                className={classes.formInput}
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/product.png"
              />

              <label className={classes.modalLabel} htmlFor="imageDescription">
                Opis obrazka
              </label>
              <input
                id="imageDescription"
                name="imageDescription"
                className={classes.formInput}
                value={formData.imageDescription}
                onChange={handleChange}
                placeholder="Opis obrazka"
              />

              <label className={classes.modalLabel} htmlFor="waitingTime">
                Czas oczekiwania
              </label>
              <input
                id="waitingTime"
                name="waitingTime"
                className={classes.formInput}
                value={formData.waitingTime}
                onChange={handleChange}
                placeholder="np. 2 dni"
              />

              <label className={classes.modalLabel} htmlFor="packaging">
                Opakowanie sup
              </label>
              <input
                id="packaging"
                name="packaging"
                className={classes.formInput}
                value={formData.packaging}
                onChange={handleChange}
                placeholder="np. pudełko"
              />

              <label
                className={classes.modalLabel}
                htmlFor="quantityPerPackage"
              >
                Ilość w opakowaniu
              </label>
              <input
                id="quantityPerPackage"
                name="quantityPerPackage"
                type="number"
                className={classes.formInput}
                value={formData.quantityPerPackage}
                onChange={handleChange}
                placeholder="np. 6"
              />

              <label className={classes.modalLabel} htmlFor="weight">
                Waga
              </label>
              <input
                id="weight"
                name="weight"
                className={classes.formInput}
                value={formData.weight}
                onChange={handleChange}
                placeholder="np. 300 g"
              />

              <label className={classes.modalLabel} htmlFor="ingredients">
                Skład
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                className={classes.formTextarea}
                rows={2}
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Skład produktu"
              />

              <label className={classes.modalLabel} htmlFor="allergens">
                Alergeny
              </label>
              <textarea
                id="allergens"
                name="allergens"
                className={classes.formTextarea}
                rows={2}
                value={formData.allergens}
                onChange={handleChange}
                placeholder="Alergeny"
              />

              <label className={classes.modalLabel} htmlFor="additionalInfo">
                Dodatkowe info
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                className={classes.formTextarea}
                rows={2}
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Dodatkowe informacje"
              />
            </div>
            {error && <p className={classes.modalError}>{error}</p>}
            <div className={classes.modalActions}>
              <button type="button" onClick={closeModal}>
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Zapisywanie"
                  : modalMode === "add"
                    ? "Dodaj"
                    : "Zapisz"}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalMode === "delete" && activeProduct && (
        <div className={classes.modalBackdrop}>
          <div className={classes.modalBox}>
            <h3>Usuń produkt</h3>
            <p>
              Czy na pewno chcesz usunąć produkt: {activeProduct.prodTitle}?
            </p>
            {error && <p className={classes.modalError}>{error}</p>}
            <div className={classes.modalActions}>
              <button type="button" onClick={closeModal}>
                Anuluj
              </button>
              <button
                type="button"
                className={classes.dangerButton}
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Usuwanie" : "Usuń"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
