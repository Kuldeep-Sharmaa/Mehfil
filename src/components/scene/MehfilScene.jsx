import "./MehfilScene.css";

/**
 * MehfilScene - Renders the Mehfil artwork as the primary visual element.
 *
 * Two source images are used:
 * - Desktop/tablet/landscape: wide composition (all 5 friends spread horizontally)
 * - Mobile portrait: dedicated recomposed crop (see DESIGN.md — CSS-only
 *   cropping of the landscape asset loses characters on narrow viewports)
 *
 * Future phases will introduce layered/animated assets without changing this boundary.
 */
export function MehfilScene() {
  return (
    <div className="scene-container">
      <picture>
        <source
          media="(max-width: 1024px) and (orientation: portrait)"
          srcSet="/images/mehfil/mehfil-main-mobile.png"
        />
        <img
          src="/images/mehfil/mehfil-main.png"
          alt="A group of friends on a rooftop at night, Mehfil scene"
          className="scene-artwork"
        />
      </picture>
    </div>
  );
}
