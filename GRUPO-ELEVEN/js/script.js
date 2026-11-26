/* GRUPO ELEVEN | Funciones de navegación, equipo, filtros y modal */
document.addEventListener("DOMContentLoaded", () => {
  // Menú para dispositivos móviles
  const menuButton = document.getElementById("menu-toggle");
  const mainMenu = document.getElementById("main-menu");

  if (menuButton && mainMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = mainMenu.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      menuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    mainMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainMenu.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Integrantes: nombres, cargos, áreas y rutas procedentes de index.html.
  // Si un integrante no tiene fotografía en el ZIP, se muestran sus iniciales.
  const integrantes = [
    { nombre: "Génesis Guadalupe Vela Romero", cargo: "Diseñadora Gráfica", area: "Diseño GIMP", iniciales: "GV", foto: "fotos/Genesis.jpeg" },
    { nombre: "Christian Uriel Hernández Rivas", cargo: "Desarrollador Web", area: "Desarrollo Web", iniciales: "CH", foto: "" },
    { nombre: "René Antonio Avilés Araujo", cargo: "Programador", area: "Programación", iniciales: "RA", foto: "fotos/Rene.jpeg" },
    { nombre: "Samuel Alexander Arce Ayala", cargo: "Encargado de Documentación", area: "Documentación", iniciales: "SA", foto: "fotos/Samuel.jpg" },
    { nombre: "Josué Daniel Vásquez Maravilla", cargo: "Investigador", area: "Investigación", iniciales: "JV", foto: "" },
    { nombre: "Nelson Salvador Salgado Alvarenga", cargo: "Editor Multimedia", area: "Edición Multimedia", iniciales: "NS", foto: "fotos/Nelson.jpeg" },
    { nombre: "Juan Lisandro Emanuel Tiu Gonzalez", cargo: "Diseñador Web", area: "Diseño Web", iniciales: "JT", foto: "fotos/Lisandro.jpeg" },
    { nombre: "Gloria del Carmen Treminio Ortiz", cargo: "Encargada de Contenido", area: "Contenido", iniciales: "GT", foto: "fotos/Gloria.jpeg" },
    { nombre: "Jefferson Josué Mejía López", cargo: "Subcoordinador", area: "Supervisión", iniciales: "JM", foto: "fotos/Josue.jpeg" },
    { nombre: "Esmeralda Guadalupe García Escobar", cargo: "Coordinadora General", area: "Coordinación", iniciales: "EG", foto: "fotos/Esmeralda.jpg" },
    { nombre: "Oscar Eduardo Cruz Guzmán", cargo: "Control de Calidad", area: "Revisión y Calidad", iniciales: "OC", foto: "fotos/Oscar.jpg" }
  ];

  const teamList = document.getElementById("lista-equipo");
  if (teamList) {
    integrantes.forEach(persona => {
      const card = document.createElement("article");
      card.className = "team-card";

      const photo = document.createElement("div");
      photo.className = "team-photo";

      if (persona.foto) {
        const image = document.createElement("img");
        image.src = persona.foto;
        image.alt = `Fotografía de ${persona.nombre}`;
        image.loading = "lazy";
        image.onerror = () => {
          photo.textContent = persona.iniciales;
        };
        photo.appendChild(image);
      } else {
        photo.textContent = persona.iniciales;
      }

      const name = document.createElement("h3");
      name.textContent = persona.nombre;
      const role = document.createElement("p");
      role.className = "team-role";
      role.textContent = persona.cargo;
      const area = document.createElement("span");
      area.className = "team-area";
      area.textContent = persona.area;

      card.append(photo, name, role, area);
      teamList.appendChild(card);
    });
  }

  // Filtros del portafolio: se conservan las cinco categorías del PDF.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const projectCount = document.getElementById("project-count");
  const noResults = document.getElementById("no-results");

  function filterProjects(category) {
    let visible = 0;

    projectCards.forEach(card => {
      const matches = category === "all" || card.dataset.category === category;
      card.hidden = !matches;
      if (matches) visible++;
    });

    filterButtons.forEach(button => {
      const selected = button.dataset.filter === category;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (projectCount) {
      projectCount.textContent = `${visible} ${visible === 1 ? "proyecto" : "proyectos"}`;
    }
    if (noResults) noResults.hidden = visible !== 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => filterProjects(button.dataset.filter));
  });

  // Información de los seis trabajos reales incluidos en el ZIP.
  // Las descripciones se limitan a lo que puede observarse en los archivos entregados.
  const proyectos = {
    "gimp-gatito": {
      titulo: "Composición digital: gatito", herramienta: "GIMP",
      problematica: "La imagen de un personaje y el fondo ilustrado son elementos separados que necesitan integrarse en una sola composición visual.",
      solucion: "Se observa un gatito recortado e incorporado sobre un paisaje ilustrado con cielo, montañas y elementos decorativos.",
      objetivo: "Practicar la composición de imágenes mediante la integración de un elemento principal con un fondo y recursos gráficos.",
      aprendizaje: "La práctica permite reconocer cómo el recorte, la ubicación y la combinación de elementos ayudan a construir una composición digital.",
      descripcion: "Vista previa y archivo original entregados por el equipo.",
      archivo: "archivos/Practica gato GIMP.png"
    },
    "gimp-personajes": {
      titulo: "Composición digital: personajes", herramienta: "GIMP",
      problematica: "Los personajes y el paisaje deben organizarse visualmente para formar una escena única y coherente.",
      solucion: "Se presenta una composición con un oso azul y un conejo ubicados sobre un paisaje de campo.",
      objetivo: "Practicar la integración de imágenes y la organización de varios elementos dentro de una composición.",
      aprendizaje: "Se refuerza el uso de capas, ubicación de elementos y relación entre figura y fondo en una imagen editada.",
      descripcion: "Vista previa y archivo original entregados por el equipo.",
      archivo: "archivos/practica.Gimp.png"
    },
    "inkscape-generaciones": {
      titulo: "Las nuevas generaciones", herramienta: "Inkscape",
      problematica: "Se requiere comunicar una idea mediante un cartel ilustrado que combine personajes, formas y texto de manera visual.",
      solucion: "El PDF presenta una ilustración de varias personas mirando hacia un sol, con formas geométricas y el título «Las nuevas generaciones».",
      objetivo: "Desarrollar una composición gráfica vectorial utilizando formas, color, ilustración y texto.",
      aprendizaje: "La pieza permite observar la organización de figuras geométricas, el contraste de colores y la jerarquía del texto.",
      descripcion: "Se conserva el PDF original proporcionado. El contenido no incluye una explicación escrita de la consigna.",
      archivo: "archivos/inskape.pdf"
    },
    "inkscape-talleres": {
      titulo: "En tus talleres", herramienta: "Inkscape",
      problematica: "Se necesita presentar visualmente objetos y elementos artesanales en una composición gráfica con un título identificable.",
      solucion: "El PDF muestra una ilustración vectorial de una cesta, vasijas y objetos artesanales acompañados del texto «En tus talleres».",
      objetivo: "Practicar la creación de ilustraciones vectoriales mediante formas geométricas, color y composición.",
      aprendizaje: "Se aprecia el uso de formas poligonales, combinación cromática y distribución de objetos para construir una ilustración.",
      descripcion: "Se conserva el PDF original proporcionado. El contenido no incluye una explicación escrita de la consigna.",
      archivo: "archivos/inskipe.pdf"
    },
    "audacity-focusmind": {
      titulo: "Locución FocusMind", herramienta: "Audacity",
      problematica: "El material entregado corresponde a una grabación de locución que requiere presentarse en un formato reproducible dentro del portafolio.",
      solucion: "Se incorpora el archivo WAV original para escucharlo directamente desde la página o descargarlo.",
      objetivo: "Presentar el ejercicio de locución en formato digital y permitir la reproducción del audio entregado.",
      aprendizaje: "El archivo permite revisar el resultado de la grabación. No se puede confirmar qué efectos o procesos de edición se aplicaron únicamente con el nombre del archivo.",
      descripcion: "Duración aproximada: 29 segundos. No se atribuyen efectos de audio específicos que no puedan verificarse en el archivo.",
      archivo: "archivos/Practica_Locucion_FocusMind audacity.wav"
    },
    "openshot-navidad": {
      titulo: "Video: escena navideña", herramienta: "OpenShot",
      problematica: "El material audiovisual necesita organizarse y presentarse como un video final que pueda reproducirse desde el portafolio.",
      solucion: "Se incluye el video MP4 entregado, cuyo fotograma muestra una escena navideña en una pista de hielo.",
      objetivo: "Presentar el resultado de una práctica de edición de video y facilitar su visualización.",
      aprendizaje: "El archivo permite observar el producto audiovisual exportado. No se detallan transiciones ni efectos porque no se cuenta con la guía del ejercicio.",
      descripcion: "Duración aproximada: 1 minuto y 11 segundos. Resolución: 1280 × 720.",
      archivo: "archivos/video openshot.mp4"
    }
  };

  // Ventana modal de detalles.
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalTool = document.getElementById("modal-tool");
  const modalProblem = document.getElementById("modal-problem");
  const modalSolution = document.getElementById("modal-solution");
  const modalObjective = document.getElementById("modal-objective");
  const modalLearning = document.getElementById("modal-learning");
  const modalDescription = document.getElementById("modal-description");
  const modalFileLink = document.getElementById("modal-file-link");
  const closeModalButton = document.getElementById("close-modal");
  const closeBottomButton = document.getElementById("modal-close-bottom");
  let previousFocus = null;

  function openProjectModal(button) {
    const data = proyectos[button.dataset.project];
    if (!modal || !data) return;
    previousFocus = document.activeElement;
    modalTitle.textContent = data.titulo;
    modalTool.textContent = `Herramienta: ${data.herramienta}`;
    modalProblem.textContent = data.problematica;
    modalSolution.textContent = data.solucion;
    modalObjective.textContent = data.objetivo;
    modalLearning.textContent = data.aprendizaje;
    modalDescription.textContent = data.descripcion;
    modalFileLink.href = data.archivo;
    modalFileLink.download = data.archivo.split("/").pop();
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeModalButton?.focus();
  }

  function closeProjectModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (previousFocus) previousFocus.focus();
  }

  document.querySelectorAll(".project-details").forEach(button => {
    button.addEventListener("click", () => openProjectModal(button));
  });
  closeModalButton?.addEventListener("click", closeProjectModal);
  closeBottomButton?.addEventListener("click", closeProjectModal);
  modal?.addEventListener("click", event => {
    if (event.target === modal) closeProjectModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeProjectModal();
  });
});
