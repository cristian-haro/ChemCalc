# ChemCalc Pro

Calculadora de concentración de productos químicos en agua.  
Calcula **% p/p** a partir de conductividad medida.

**Fórmula:** `% p/p = (medida − cond. agua − Col.C) ÷ Col.B`

---

## 🚀 Despliegue en GitHub Pages (gratis)

### Paso 1 — Crear repositorio en GitHub

1. Ve a [github.com/new](https://github.com/new)
2. Nombre del repo: `calculadora-quimicos`
3. Visibilidad: **Public**
4. Pulsa **Create repository**

### Paso 2 — Subir los archivos

```bash
# En la carpeta del proyecto:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/calculadora-quimicos.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages

1. Settings del repo → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Guardar

✅ En ~1 minuto la app estará disponible en:  
`https://TU_USUARIO.github.io/calculadora-quimicos/`

---

## 📱 PWA — Instalar en móvil

### Android (Chrome)
1. Abre la URL en Chrome
2. Menú (⋮) → **"Añadir a pantalla de inicio"**
3. Se instala como app nativa

### iOS (Safari)
1. Abre la URL en Safari
2. Compartir (⬆️) → **"Añadir a pantalla de inicio"**
3. Se instala como app nativa

La app funciona **offline** después de la primera carga.

---

## 📁 Archivos del proyecto

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Estructura de la app |
| `styles.css` | Estilos responsive (mobile-first) |
| `app.js` | Lógica de cálculo + 75 productos |
| `manifest.json` | Configuración PWA |
| `sw.js` | Service Worker (offline) |
| `icon-192.png` | Icono Android (192×192) |
| `icon-512.png` | Icono Android/iOS (512×512) |
| `Quimicos.csv` | Datos de origen (no se sirve) |
