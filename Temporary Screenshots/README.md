# Temporary Screenshots

Capturas de revisión del sitio, subidas para poder comentarlas desde GitHub.

**Carpeta temporal:** no forma parte del sitio web. Astro solo compila `src/` y `public/`,
así que estas imágenes **no se publican** ni afectan al build, al peso ni al SEO.
Se puede borrar entera cuando ya no haga falta:

```bash
git rm -r "Temporary Screenshots" && git commit -m "Remove temporary screenshots"
```

## Contenido

Estado del sitio: **17/07/2026**, sitio ES completo (M0–M2), antes de añadir los entornos
de Producción/Desarrollo — por eso no aparece el banner rojo de pruebas.

| Archivo | Qué muestra |
|---|---|
| `home-desktop.png` | Home completa en escritorio (1280 px): hero, doble camino, métricas, servicios, quién soy, testimonios, dónde, FAQ y CTA. |
| `home-mobile.png` | Home en móvil (390 px). |
| `services-desktop.png` | Hub de servicios en escritorio, con las dos ramas «Para tu peque» / «Para ti». |
| `service-mobile.png` | Detalle de servicio en móvil, con la barra inferior fija [WhatsApp][Llamar][Pedir cita]. |

Las zonas marcadas `[INPUT]` son placeholders a la espera de datos reales (fotos, reseñas,
número de WhatsApp definitivo). Ver la lista viva con `grep -rn "\[INPUT" src`.
