# Dependencias del frontend — 2026-10-22

`web/package-lock.json` (avisos HIGH/CRITICAL de `npm audit --omit=dev`):

| Paquete | De | A | Aviso |
|---|---|---|---|
| next | 16.2.3 | **16.4.1** | crítico (GHSA-2464-fhr4-w9xw y otros: RCE en Image Optimization, DoS, SSRF) |
| dompurify | 3.4.0 | 3.4.17 | alto |
| postcss | 8.5.x | 8.5.23 | alto |
| nanoid | 3.3.11 | 3.3.20 | alto |
| sharp | 0.34.x | 0.35.5 | alto |
| source-map-js | 1.2.1 | 1.2.2 | alto |

Resultado: 0 avisos altos o críticos (quedan 5 bajos). `package.json` solo cambia el rango de `next`; el lockfile se
regeneró con `npm install --package-lock-only --legacy-peer-deps next@16.4.1` y
`npm audit fix --package-lock-only --omit=dev --legacy-peer-deps`.

**Imagen:** solo se reconstruyó el frontend. La etapa `frontend-builder` es idéntica a la del `Dockerfile`, y su
salida *standalone* se copió sobre la imagen que ya estaba en producción. Las dependencias de Python no se
reinstalaron: con la caché de construcción vacía, un `docker compose build` habría resuelto de nuevo todos los rangos
`>=` de `requirements.txt` y cambiado el backend entero. El contenedor se recreó con
`docker compose up -d --no-deps --no-build --force-recreate deeptutor`. Quedó `healthy` y sin `NET_RAW`
(`cap_drop` en el override local), y el frontend carga igual que antes.
