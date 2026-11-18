// Animated Months site: scales the live preview, copies the wallpaper link
// and builds the two-colour footer.

// The preview renders the wallpaper at 1600 x 900 and scales it to the frame,
// so it looks like a real desktop at any width.
const screen = document.querySelector('.preview__screen');
const frame = document.querySelector('.preview__frame');
if (screen && frame) {
  const fit = () => {
    frame.style.transform = `scale(${screen.clientWidth / 1600})`;
  };
  fit();
  new ResizeObserver(fit).observe(screen);
}

// Footer: copy the content once more for the blue half. Each layer is clipped
// to its own triangle with ink that reads well on its colour. Screen readers
// and keyboards only meet the real content; the copy's links still work for
// a mouse or a tap on the blue side.
const layer = document.querySelector('.foot__layer');
if (layer) {
  const blue = layer.cloneNode(true);
  blue.classList.add('foot__layer--blue');
  blue.setAttribute('aria-hidden', 'true');
  blue.querySelectorAll('a, button, [tabindex]').forEach((el) => el.setAttribute('tabindex', '-1'));
  blue.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  layer.after(blue);
}

// "Copy link" buttons: copy the text of the element they point at.
document.querySelectorAll('[data-copy]').forEach((btn) => {
  const source = document.getElementById(btn.dataset.copy);
  if (!source || !navigator.clipboard) return;
  const label = btn.textContent;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
      btn.textContent = 'Copied';
    } catch (e) {
      btn.textContent = 'Press Cmd or Ctrl + C';
      getSelection().selectAllChildren(source);
    }
    setTimeout(() => { btn.textContent = label; }, 2000);
  });
});
