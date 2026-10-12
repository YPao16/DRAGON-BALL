# Dragon Ball Game

Juego local para dos jugadores con selección de personajes y combate.

## Jugar

Desde la carpeta del proyecto, ejecuta:

```powershell
python -m http.server 8080 --directory dist
```

Abre http://localhost:8080, escribe un nombre con letras y números, elige un personaje para cada jugador y pulsa **Aceptar**. Cuando ambos confirmen, aparecerá la pantalla del enfrentamiento con una animación y una frase de cada personaje. Pulsa **START** para ver la pantalla de carga y comenzar la batalla; el jugador 1 inicia.

## Acciones

- **Cargar ki:** recupera 10 de ki y 15 de energía, hasta 100.
- **Ataque básico:** causa 10 de daño y consume 10 de ki y 5 de energía.
- **Ataque especial:** causa 25 de daño y consume 20 de ki y 15 de energía. Cada jugador puede usarlo después de sus dos primeros turnos y, luego, una vez por cada dos turnos propios.
- **Semilla:** restaura vida, ki y energía; cada jugador tiene dos.

Los turnos alternan después de cada acción, así que cada jugador solo puede hacer un movimiento por turno. Las barras no superan el 100%; las semillas solo se pueden usar cuando alguna barra está por debajo de ese valor, y cada jugador tiene dos. Los ataques muestran una animación con la imagen y el diálogo del personaje. Al llegar una vida a cero, aparece el ganador y el juego vuelve al menú de selección.

## Desarrollo

El código fuente está en `src/` y los recursos estáticos en `dist/public/`. Para recompilar el juego:

```powershell
npm run build
```
