-- Insert statements for the initial 8 achievements and their hints.
-- Copia y pega esto en tu phpMyAdmin o cliente SQL.

INSERT INTO `achievements` (`id`, `title`, `description`, `icon`, `hints`, `created_at`, `updated_at`) VALUES
('curious_click', 'Curioso', 'Has entrado a ver la lista de logros por primera vez.', 'search-outline', 
'["¿Has explorado todos los rincones de la app?", "Hay un botón nuevo en la pestaña Más.", "Dicen que la curiosidad mató al gato, pero aquí da premios.", "Ve a la pestaña ''Más''.", "Toca el botón ''Logros y Secretos'' en la pestaña Más."]', 
NOW(), NOW()),

('explorer_poke', 'Explorador', 'Has mandado un zumbido intenso a tu pareja (10 toques).', 'heart-circle-outline', 
'["A veces un solo toque no es suficiente para llamar la atención.", "¿Sabes que puedes interactuar con la foto de inicio?", "Prueba a ser insistente en la pantalla principal.", "Toca el botón de zumbido varias veces seguidas.", "Toca el corazón flotante de la pantalla de inicio 10 veces."]', 
NOW(), NOW()),

('first_drawing', 'Artista', 'Has jugado al reto de dibujo por primera vez.', 'color-palette-outline', 
'["Saca a pasear tu lado más creativo.", "A veces una imagen vale más que mil palabras.", "Ve a la sección de juegos.", "Prueba el juego del lienzo en blanco.", "Completa tu primer dibujo en el reto de arte."]', 
NOW(), NOW()),

('cupid_swipe', 'Cupido', 'Has completado 50 preguntas en el Tinder de pareja.', 'flame-outline', 
'["Hay mucho que descubrir sobre el otro si haces las preguntas correctas.", "Desliza a la derecha o a la izquierda para conectar.", "Sigue jugando al juego de preguntas rápidas.", "Necesitas responder muchas preguntas para ganar afinidad.", "Responde 50 tarjetas en el Tinder de pareja."]', 
NOW(), NOW()),

('photographer', 'Fotógrafo', 'Has subido 5 fotos al álbum de recuerdos.', 'camera-outline', 
'["Captura los mejores momentos para no olvidarlos.", "El álbum principal se ve muy vacío.", "Añade recuerdos visuales.", "Sube varias fotos a la galería.", "Sube 5 fotos al álbum principal."]', 
NOW(), NOW()),

('night_owl', 'Búho Nocturno', 'Has interactuado con la app pasada la medianoche.', 'moon-outline', 
'["Algunos secretos solo se revelan bajo la luz de la luna.", "¿A qué hora te acuestas normalmente?", "La app sabe cuándo no estás durmiendo.", "Abre la aplicación muy tarde por la noche.", "Abre o interactúa con la app entre las 00:00 y las 04:00 am."]', 
NOW(), NOW()),

('foodie_lover', 'Tragón', 'Has guardado un restaurante en la lista para futuras citas.', 'restaurant-outline', 
'["El amor también entra por el estómago.", "En la pestaña Más hay un lugar para planes sabrosos.", "Planifica vuestra próxima cena.", "Añade un lugar para comer.", "Añade un restaurante a la lista de Lugares para Comer."]', 
NOW(), NOW()),

('cinema_date', 'Cinéfilo', 'Has añadido 3 películas a la lista de ver juntos.', 'film-outline', 
'["Palomitas, manta y una buena pantalla.", "¿Ya sabes qué vais a ver el fin de semana?", "Ve a la sección de pelis.", "Añade varias películas a la lista.", "Añade al menos 3 películas a la lista de Pelis por Ver."]', 
NOW(), NOW());
