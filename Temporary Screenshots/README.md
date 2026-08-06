# Temporary Screenshots

Capturas de referencia para el rediseño: el **sitio anterior** (el «antes») y el **sitio
nuevo** (el «después»), para poder compararlos y comentarlos desde GitHub.

**Carpeta temporal:** no forma parte del sitio web. Astro solo compila `src/` y `public/`,
así que estas imágenes **no se publican** ni afectan al build, al peso ni al SEO. Se puede
borrar entera cuando ya no haga falta:

```bash
git rm -r "Temporary Screenshots" && git commit -m "Remove temporary screenshots"
```

---

## `sitio-anterior/` — constanzaacevedo.es antes del rediseño

✅ **Capturas subidas por el owner (06/08/2026)** vía la web de GitHub y renombradas.

| Archivo | Qué muestra |
|---|---|
| `anterior-home.png` | Home completa: hero «HAGO FISIOTERAPIA INTEGRATIVA», «QUIÉN SOY…», métricas, 5 tarjetas de servicios, «DÓNDE ENCONTRARME», formulario «AÚN TIENES DUDAS?» y CTA final. |
| `anterior-quien-soy.png` | «Sobre mi…»: historia personal (celiaquía, APLV del hijo) + «Estudios y Certificaciones». |
| `anterior-servicios.png` | **Los 5 servicios encadenados en una sola página**: pediátrica, respiratoria, taller de masajes, acupuntura y domicilios. |
| `anterior-contacto.png` | Contacto: Centro Llevadonas, dirección, horario y CTA «AGENDA TU VISITA HOY». |
| `anterior-pedir-cita.png` | Pedir cita: botón de WhatsApp, teléfono, email y bloque de bio con métricas. |

### Hallazgos verificados en estas capturas (auditoría, PLAN §2)

Sirven como prueba visual de los problemas que justifican el rediseño:

- **§2.9 — Todos los servicios en una única URL `/servicios`.** La captura de Servicios
  muestra los cinco servicios seguidos en la misma página. Es el cambio SEO más importante
  del proyecto: en el sitio nuevo cada servicio tiene su propia URL indexable.
- **§2.10 — Error de copy-paste confirmado.** En «Taller de Masajes Infantil» **y** en
  «Domicilios» el texto que aparece es el de **acupuntura para la mujer**, no el del
  servicio correspondiente. Por eso ambos se han reescrito desde cero en el sitio nuevo.
- **§2.12 — Métricas incoherentes confirmadas.** La home muestra «+15 / +5.000» y la página
  de pedir cita «+15 / +2.500», ambas con las etiquetas «Años de experiencia / Horas
  clínicas». Falta decidir la cifra real (`[INPUT]` en `src/config/site.ts`).
- **§2.11 — Erratas visibles:** botón «WhatsApp **Fistioterapia**»; "**AÚN TIENES DUDAS?**"
  sin la «¿» de apertura; «Toma la iniciativa ya con **la salud de tu salud** y la de tu
  peque»; título «Sobre **mi**…» sin tilde.
- **§2.8 — Banner de cookies en inglés** («We use cookies» / «Accept all» / «Reject all» /
  «Manage preferences») en un sitio en español, presente en todas las páginas.
- **Footer con el encabezado «NAVEGACIÓ»** (catalán) en un sitio por lo demás en español.
- **Redes en el footer:** iconos de Facebook, Instagram, TikTok y X — útil para resolver el
  `[INPUT]` de redes (§14.2) y el `sameAs` del JSON-LD. Verificar a dónde apuntan: según la
  auditoría (§2.7) algunos enlazan a la raíz de la red, no al perfil.
- **Mapa vacío en Contacto:** el recuadro del mapa aparece en gris sin cargar. En el sitio
  nuevo se sustituye por un mapa con *facade* (clic para cargar) que no penaliza el LCP.
- **Sin selector de idioma:** el sitio anterior es solo ES (el nuevo prepara ES/CA/EN).

### Datos del sitio anterior (referencia para el NAP)

Centro Llevadonas · C./ de la Independència 371, Baixos — 08026 Barcelona · Lunes de 16:00
a 20:30 y Viernes de 10:00 a 13:00 · +34 647 137 693 · contacto@constanzaacevedo.es ·
centro +34 93 450 79 31 · info@llevadonas.es. Los domicilios aparecen en la home como
**«En Bones Mans» — atención a domicilios particulares en Barcelona**.

---

## `sitio-nuevo/` — el sitio nuevo en Astro (el «después»)

Estado: **17/07/2026**, sitio ES completo (M0–M2), antes de añadir los entornos de
Producción/Desarrollo — por eso no aparece el banner rojo de pruebas.

| Archivo | Qué muestra |
|---|---|
| `home-desktop.png` | Home completa en escritorio (1280 px): hero, doble camino, métricas, servicios, quién soy, testimonios, dónde, FAQ y CTA. |
| `home-mobile.png` | Home en móvil (390 px). |
| `services-desktop.png` | Hub de servicios con las dos ramas «Para tu peque» / «Para ti». |
| `service-mobile.png` | Detalle de servicio en móvil, con la barra inferior fija [WhatsApp][Llamar][Pedir cita]. |

Las zonas marcadas `[INPUT]` son placeholders a la espera de datos reales (fotos, reseñas,
número de WhatsApp definitivo). Ver la lista viva con `grep -rn "\[INPUT" src`.
