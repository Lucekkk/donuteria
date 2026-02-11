/* eslint-disable react/prop-types */
"use client";

import { useMemo, useState } from "react";
import classes from "@/app/profil/[id]/page.module.css";

export default function AdminUsersTable({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userRows = useMemo(
    () => users.filter((user) => user.rola === "user"),
    [users],
  );

  const closeModal = () => {
    setSelectedUser(null);
    setBanReason("");
    setError("");
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setBanReason("");
    setError("");
  };

  const handleConfirmBan = async () => {
    if (!banReason.trim()) {
      setError("Podaj powód bana");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/banUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          reason: banReason.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Nie udało się zbanować użytkownika");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                czyZbanowany: 1,
                powod_bana: banReason.trim(),
              }
            : user,
        ),
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
      <h2>Użytkownicy</h2>
      <div className={classes.tableWrap}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Email</th>
              <th>Data utworzenia</th>
              <th>Punkty</th>
              <th>Zbanowany</th>
              <th>Powód bana</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {userRows.map((user) => (
              <tr key={user.id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Login">{user.login}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Data utworzenia">
                  {user.data_utworzenia
                    ? new Date(user.data_utworzenia).toLocaleDateString("pl-PL")
                    : "-"}
                </td>
                <td data-label="Punkty">{user.punkty}</td>
                <td data-label="Zbanowany">
                  {user.czyZbanowany === 1 ? "Tak" : "Nie"}
                </td>
                <td data-label="Powód bana">{user.powod_bana || "-"}</td>
                <td data-label="Akcje">
                  <button
                    type="button"
                    className={classes.banButton}
                    onClick={() => openModal(user)}
                    disabled={user.czyZbanowany === 1}
                  >
                    {user.czyZbanowany === 1 ? "Zbanowany" : "Zbanuj"}
                  </button>
                </td>
              </tr>
            ))}
            {userRows.length === 0 && (
              <tr>
                <td colSpan={8}>Brak użytkowników</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className={classes.modalBackdrop}>
          <div className={classes.modalBox}>
            <h3>
              Ban dla: {selectedUser.login} (ID: {selectedUser.id})
            </h3>
            <label className={classes.modalLabel} htmlFor="banReason">
              Powód bana
            </label>
            <textarea
              id="banReason"
              className={classes.banReasonInput}
              rows={4}
              value={banReason}
              onChange={(event) => setBanReason(event.target.value)}
              placeholder="Wpisz powód bana"
            />
            {error && <p className={classes.modalError}>{error}</p>}
            <div className={classes.modalActions}>
              <button type="button" onClick={closeModal}>
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleConfirmBan}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Zapisywanie" : "Potwierdź"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
